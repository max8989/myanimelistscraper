import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'react-toastify';
import { useLocalStorage } from 'usehooks-ts';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

function ChatBubble({ name, description, currentUser }) {
  const isCurrentUser = name === currentUser;

  return (
    <div className={`chat ${isCurrentUser ? 'chat-end' : 'chat-start'}`}>
      <div className='chat-image avatar'></div>
      <div className='chat-header'>{name}</div>
      <div className='chat-bubble'>{description}</div>
      <div className='chat-footer opacity-50'>{isCurrentUser ? 'Sent' : 'Received'}</div>
    </div>
  );
}

export default function Post() {
  const [message, setMessage] = useState('');
  const [authSession, setAuthSession] = useLocalStorage('sb-danhdzqsjdgwuhsndizl-auth-token', null);
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    const handleReceivePost = (payload) => {
      setReceivedMessages([...receivedMessages, payload.new]);
    };

    async function fetchAllPosts() {
      const { data, error } = await supabase.from('posts').select('*');

      if (error) {
        console.error('Error fetching posts:', error);
      } else {
        setReceivedMessages(data);
      }
    }

    fetchAllPosts();

    const subscription = supabase
      .channel('posts')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'posts' },
        handleReceivePost,
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [receivedMessages]);

  async function handleSend() {
    if (!message) {
      toast.error('Enter a message', {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      return;
    }

    const newMessage = {
      name: authSession?.user?.email ?? 'Anonymous',
      description: message,
    };

    const { data, error } = await supabase.from('posts').insert(newMessage);
    setMessage('');
  }

  return (
    <div className='flex max-w-[500px] m-auto flex-col'>
      <div className='chat-container'>
        <div className='chat-scroll'>
          {receivedMessages.map((receivedMessage, index) => (
            <ChatBubble
              key={index}
              name={receivedMessage.name}
              description={receivedMessage.description}
              currentUser={authSession?.user?.email}
            />
          ))}
        </div>
      </div>
      <div className='flex mt-5 gap-5'>
        <input
          type='text'
          placeholder='Type here'
          className='input input-bordered input-info w-full max-w-xs'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <button className='btn btn-active btn-primary' onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

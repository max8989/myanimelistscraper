import { useState } from 'react';
import axios from 'axios';
import AnimeCard from './animeCard';

export default function Home() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [searchInput, setSearchInput] = useState('');
  const [result, setResult] = useState([]);

  const handleSearch = async () => {
    try {
      console.log(apiUrl);
      const response = await axios.post(apiUrl, { search: searchInput });
      if (response.data && Array.isArray(response.data)) {
        setResult(response.data);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='flex justify-center flex-col items-center'>
        <input
          type='text'
          placeholder='Type here'
          className='input input-bordered input-info w-full max-w-xs'
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            handleSearch();
          }}
        />
        <div className='flex justify-center flex-col max-w-xl'>
          {result.map((anime, index) => (
            <AnimeCard key={index} anime={anime} />
          ))}
        </div>
      </div>
    </div>
  );
}

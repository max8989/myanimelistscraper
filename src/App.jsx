import './App.css';
import Login from './components/Login';
import Home from './components/home';
import { Layout } from './components/layout';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import SignUp from './components/signup';
import Post from './components/post';

function App() {
  return (
    <>
      <Router>
        <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signUp' element={<SignUp />} />
            <Route path='/chat' element={<Post />} />
          </Routes>
        </Layout>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;

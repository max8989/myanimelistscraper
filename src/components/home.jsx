import { useState } from 'react';
import axios from 'axios';
import AnimeCard from './anime_card';
import { AnimeTable } from './anime_table';

const DEFAULT_USERNAME = 'centricmax';

const SearchTypes = {
  Anime: 'anime',
  //Manga: "manga",
  WatchList: 'watchlist',
};

export default function Home() {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [searchType, setSearchType] = useState(SearchTypes.Anime);
  const [searchInput, setSearchInput] = useState('');
  const [searchBtnLoading, setSearchBtnLoading] = useState(false);
  const [result, setResult] = useState([]);
  const [watchListResult, setWatchListResult] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSearch = async () => {
    try {
      if (searchType === SearchTypes.WatchList) return;

      if (searchInput.length <= 4) {
        setResult([]);
        return;
      }

      const response = await axios.post(`${apiUrl}/search/${searchType}`, { search: searchInput });
      if (response.data && Array.isArray(response.data)) {
        setResult(response.data);
      }
    } catch (error) {
      console.error('Error searching:', error);
    }
  };

  const handleSearchWatchList = async () => {
    try {
      if (searchInput.length <= 4) {
        setResult([]);
        return;
      }
      setSearchBtnLoading(true);

      const response = await axios.post(`${apiUrl}/search/${searchType}`, { search: searchInput });
      if (response.data && Array.isArray(response.data)) {
        setWatchListResult(response.data);
      }
    } catch (error) {
      console.error('Error searching:', error);
      setErrorMessage('No Account found!');
    } finally {
      setSearchBtnLoading(false);
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='flex justify-center flex-col items-center'>
        <div className='flex flex-row items-center mb-10 mt-3'>
          <input
            type='text'
            placeholder='Type here'
            className='input input-bordered input-info w-full max-w-xs'
            value={searchInput}
            onChange={(e) => {
              setErrorMessage('');
              setSearchInput(e.target.value);
              handleSearch();
            }}
          />

          <div className='dropdown dropdown-hover'>
            <label tabIndex={0} className='btn m-1'>
              {searchType}
            </label>
            <ul
              tabIndex={0}
              className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'
            >
              {Object.keys(SearchTypes).map((type) => (
                <li
                  key={type}
                  onClick={() => {
                    setSearchType(SearchTypes[type]);
                    setResult([]);
                    setSearchInput(
                      SearchTypes[type] === SearchTypes.WatchList ? DEFAULT_USERNAME : '',
                    );
                    setWatchListResult([]);
                  }}
                >
                  <a>{type}</a>
                </li>
              ))}
            </ul>
          </div>

          {searchType === SearchTypes.WatchList && !searchBtnLoading ? (
            <button className='btn btn-success' onClick={() => handleSearchWatchList()}>
              Search
            </button>
          ) : null}

          {searchType === SearchTypes.WatchList && searchBtnLoading ? (
            <button className='btn btn-success'>
              <span className='loading loading-spinner'></span>
              loading
            </button>
          ) : null}
        </div>

        {errorMessage ? (
          <div className='alert alert-error'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='stroke-current shrink-0 h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z'
              />
            </svg>
            <span>{errorMessage}</span>
          </div>
        ) : null}

        {searchType === SearchTypes.Anime ? (
          <div className='flex justify-center flex-col max-w-xl'>
            {result.map((anime, index) => (
              <AnimeCard key={index} anime={anime} />
            ))}
          </div>
        ) : null}

        {searchType === SearchTypes.WatchList ? (
          <div className='flex justify-center flex-col px-5'>
            <AnimeTable data={watchListResult} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

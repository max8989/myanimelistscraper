import { useState, useEffect } from 'react';
import { AnimeTableRow } from './anime_table_row';

export function AnimeTable({ data }) {
  const [currentRowIndex, setCurrentRowIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentRowIndex < data.length - 1) {
        setCurrentRowIndex((prevIndex) => prevIndex + 1);
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [currentRowIndex, data.length]);

  return (
    <div className='overflow-x-auto'>
      <table className='table table-pin-rows table-pin-cols'>
        <tbody>
          {data.slice(0, currentRowIndex + 1).map((anime, idx) => (
            <AnimeTableRow key={idx} anime={anime} idx={idx} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

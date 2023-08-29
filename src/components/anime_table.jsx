import { AnimeTableRow } from './anime_table_row';

export function AnimeTable({ data }) {
  return (
    <div className='overflow-x-auto animate-fade-in'>
      <table className='table table-pin-rows table-pin-cols'>
        <tbody>
          {data.map((anime, idx) => (
            <AnimeTableRow key={idx} anime={anime} idx={idx} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

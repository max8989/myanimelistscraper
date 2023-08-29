import { AnimeTableRow } from './animeTableRow';

export function AnimeTable({ data }) {
  return (
    <div className='overflow-x-auto'>
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

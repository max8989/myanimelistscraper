export function AnimeTableRow({ anime, idx }) {
  return (
    <tr>
      <th>{idx + 1}</th>
      <th>
        <div className='flex items-center space-x-3'>
          <div className='avatar'>
            <div className='mask mask-squircle w-12 h-12'>
              <img src={anime.animeImagePath} alt='Anime Image' />
            </div>
          </div>
          <div>
            <div className='font-bold'>{anime.animeTitle}</div>
            <div className='text-sm opacity-50'>
              {anime.animeStartDateString} - {anime.animeEndDateString}
            </div>
          </div>
        </div>
      </th>
      <th>
        {anime.animeStudios?.map((studio) => studio?.name)?.join(', ')}
        <br />
        <span className='badge badge-ghost badge-sm'>{anime.animeMediaTypeString}</span>
      </th>
      <th>{anime.genres?.map((genre) => genre?.name)?.join(', ')}</th>
      <th>
        <a
          href={`https://myanimelist.net${anime.animeUrl}`}
          className='btn btn-ghost btn-xs'
          target='_blank'
          rel='noopener noreferrer'
        >
          details
        </a>
      </th>
    </tr>
  );
}

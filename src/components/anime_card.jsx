const AnimeCard = ({ anime }) => {
  return (
    <div className='card lg:card-side bg-base-100 shadow-xl my-3 animate-fade-in'>
      <figure className='w-1/4'>
        <img src={anime.thumbnail} alt={anime.title} />
      </figure>
      <div className='card-body w-3/4'>
        <h2 className='card-title'>{anime.title}</h2>
        <p>{anime.shortDescription}</p>
        <div className='card-actions justify-end'>
          <a
            className='btn btn-primary'
            href={anime.video}
            target='_blank'
            rel='noopener noreferrer'
          >
            MyAnimeList
          </a>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;

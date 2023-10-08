import { apiKey } from 'API key';
import { useState, useEffect } from 'react';
import { Link, useParams, Outlet } from 'react-router-dom';
import css from './Movie.module.css';

const Movie = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState(null);

  const MOVIE_LINK = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovieDetails(data);
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  return (
    <div>
      <nav>
        <Link to="/">
          <button className={css.goBack}>Go back</button>
        </Link>
      </nav>
      {movieDetails && (
        <div className={css.wrapper}>
          <div>
            <img alt="" src={MOVIE_LINK + movieDetails.poster_path} />
          </div>
          <div>
            <h1>{movieDetails.title}</h1>
            <p>
              <span className={css.detailTitle}>Run Time:</span>{' '}
              {movieDetails.runtime} min
            </p>
            <h2>Overview</h2>
            <p>{movieDetails.overview}</p>
            <h2>Genres</h2>
            <p>
              {movieDetails.genres.map(genre => {
                return (
                  <span key={genre.id} className={css.genres}>
                    {genre.name}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
      )}
      <div className={css.moreInfo}>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default Movie;

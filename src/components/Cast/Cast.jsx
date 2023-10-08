import { apiKey } from 'API key';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import css from './Cast.module.css';

const Cast = () => {
  const { cast, movieId } = useParams();
  const [castDetails, setCastDetails] = useState(null);
  const MOVIE_LINK = 'https://image.tmdb.org/t/p/w500';

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await fetch(`
https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCastDetails(data.cast);
        console.log(data.cast);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchCast();
  }, [cast, movieId]);

  return (
    <div>
      <ul className={css.wrapper}>
        {castDetails ? (
          castDetails.map(actor => (
            <li className={css.actor} key={actor.id}>
              {actor.profile_path ? (
                <img
                  className={css.actorImg}
                  alt="actor"
                  src={MOVIE_LINK + actor.profile_path}
                />
              ) : (
                <img alt="actor" />
              )}
              <h3>{actor.name}</h3>
              <p>{actor.character}</p>
            </li>
          ))
        ) : (
          <p>Loading cast details...</p>
        )}
      </ul>
    </div>
  );
};

export default Cast;

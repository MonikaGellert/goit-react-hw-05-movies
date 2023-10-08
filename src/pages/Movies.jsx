import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { apiKey } from 'API key';
import css from './Movies.module.css';

const Movies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleInput = e => {
    const value = e.target.value;
    setQuery(value);
  };

  const handleButton = () => {
    const fetchSearchedMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setMovies(data.results);
        console.log(data.results);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchSearchedMovies();
  };

  useEffect(() => {
    console.log(query);
  }, [query]);

  return (
    <div>
      <input
        className={css.input}
        value={query}
        placeholder="Search movie"
        onChange={handleInput}
      ></input>
      <button onClick={handleButton}>Search</button>
      <ul className={css.wrapper}>
        {movies ? (
          movies.map(movie => {
            return (
              <li key={movie.id}>
                <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
              </li>
            );
          })
        ) : (
          <div>No results</div>
        )}
      </ul>
    </div>
  );
};

export default Movies;

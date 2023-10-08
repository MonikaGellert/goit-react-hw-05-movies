/*import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { searchMovies } from '../../services/api';
import styles from './Movies.module.css';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (!searchQuery) {
      setMovies([]);
      return;
    }

    const fetchMoviesData = async () => {
      try {
        const data = await searchMovies(searchQuery);
        setMovies(data.results);
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    };

    fetchMoviesData();
  }, [searchQuery]);

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className={styles.container}>
      <h1>Search Results</h1>
      <form>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
      <ul className={styles.movieList}>
        {movies.map(movie => (
          <li key={movie.id} className={styles.movieCard}>
            <Link to={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={styles.poster}
              />
              <h2>{movie.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;
*/

import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { searchMovies } from '../../services/api';
import styles from './Movies.module.css';

const Movies = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    const queryParam = params.get('query');

    if (queryParam) {
      setSearchQuery(queryParam);
    }
  }, [params]);

  useEffect(() => {
    if (!searchQuery) {
      setMovies([]);
      return;
    }

    const fetchMoviesData = async () => {
      try {
        const data = await searchMovies(searchQuery);
        setMovies(data.results);
      } catch (error) {
        console.error('Error searching movies:', error);
      }
    };

    fetchMoviesData();
  }, [searchQuery]);

  const handleSearchChange = e => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = e => {
    e.preventDefault();
    setParams({ query: searchQuery });
  };

  return (
    <div className={styles.container}>
      <h1>Search Results</h1>
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          className={styles.searchInput}
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="submit" className={styles.searchButton}>
          Search
        </button>
      </form>
      <ul className={styles.movieList}>
        {movies.map(movie => (
          <li key={movie.id} className={styles.movieCard}>
            <Link to={`/movies/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className={styles.poster}
              />
              <h2>{movie.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;

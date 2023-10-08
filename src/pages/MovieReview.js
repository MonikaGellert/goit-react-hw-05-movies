import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from '../../services/api';
import styles from './Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId)
      .then(data => {
        setReviews(data.results);
      })
      .catch(error => {
        console.error('Error fetching reviews:', error);
      });
  }, [movieId]);

  return (
    <div className={styles.reviews}>
      <h2 className={styles.title}>Reviews</h2>
      {reviews.length > 0 ? (
        <ul className={styles.list}>
          {reviews.map(review => (
            <li key={review.id} className={styles.item}>
              <h3 className={styles.author}>{review.author}</h3>
              <p className={styles.content}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noReviews}>
          We don't have any reviews for this movie.
        </p>
      )}
    </div>
  );
};

export default Reviews;

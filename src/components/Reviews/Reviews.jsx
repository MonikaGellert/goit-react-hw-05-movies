import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiKey } from 'API key';
import css from './Reviews.module.css';

const Reviews = () => {
  const { reviews, movieId } = useParams();
  const [reviewsDetails, setReviewsDetails] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}`
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setReviewsDetails(data.results);
        console.log(data.results);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchReviews();
  }, [reviews, movieId]);

  return (
    <div>
      {reviewsDetails ? (
        reviewsDetails.map(review => {
          return (
            <div key={review.id} className={css.wrapper}>
              <h2>{review.author}</h2>
              <p>{review.content}</p>
            </div>
          );
        })
      ) : (
        <p>Loading cast details...</p>
      )}
    </div>
  );
};

export default Reviews;

import React from 'react';
import './_MovieCard.scss'
import starIcon from '../Assets/star-regular.svg'
import ratedIcon from '../Assets/star-golden.svg'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MovieCard = ({ id, ratings, handleMovie, poster_path, average_rating }) => {
  let userRate;
  if (ratings) {
    const findMovieRating = ratings.find(film => film.movie_id === id)
    if (findMovieRating) {
      userRate = (
        <section className="user-rating">
          <img
            alt="rated-icon"
            src={ ratedIcon }
            className="rated-star-icon" />
          <section className="avg-rating-container">
            {findMovieRating.rating}
            <span className="rate-fraction">/10</span>
          </section>
        </section>
      )
    } else {
      userRate = (
        <section className="rate-me">
          <img
            alt="rated-icon"
            src={ ratedIcon }
            className="rated-star-icon" />
          <p className="rate-text">Rate</p>
        </section>
      ) 
    }
  }

  return (
    <Link to={`movies/${id}`} style={{ textDecoration: 'inherit', color: 'inherit' }}>
      <section 
        className="movie-card"
        tabIndex="0" 
        onClick={handleMovie}>
      <img 
        src={poster_path} 
        className="movie-poster" 
        alt="film-poster" 
        id={id} />
        <section className="rating-box">
          <section className="avg-container">
            <img 
              alt="star-icon"
              src={ starIcon }
              className="star-icon-poster"
            />
            <section className="avg-rating-container">
              {Math.floor(average_rating)}
              <span className="rate-fraction">/10</span>
            </section>
          </section>
          {userRate}
        </section>
      </section>
    </Link>
  )
}

export default MovieCard

MovieCard.propTypes = {
  id: PropTypes.number, 
  ratings: PropTypes.array, 
  handleMovie: PropTypes.func, 
  poster_path: PropTypes.string, 
  average_rating: PropTypes.number
}
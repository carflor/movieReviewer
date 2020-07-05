import React from 'react';
import './_MovieCard.scss'
import starIcon from '../Assets/star-regular.svg'
import ratedIcon from '../Assets/star-golden.svg'

const MovieCard = (props) => {
  let userRate;
  if (props.ratings) {
    const findMovieRating = props.ratings.find(film => film.movie_id === props.id)
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
      userRate = <section className="rate-me">RATE ME</section>
    }
  }

  return (
    <section 
      className="movie-card"
      tabIndex="0" 
      onClick={props.handleMovie}>
    <img 
      src={props.poster_path} 
      className="movie-poster" 
      alt="film-poster" 
      id={props.id} />
      <section className="rating-box">
        <section className="avg-container">
          <img 
            alt="star-icon"
            src={ starIcon }
            className="star-icon-poster" />
          <section className="avg-rating-container">
            {Math.floor(props.average_rating)}
            <span className="rate-fraction">/10</span>
          </section>
        </section>
        {userRate}
      </section>
    </section>
  )
}

export default MovieCard
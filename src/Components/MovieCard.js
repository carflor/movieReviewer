import React from 'react';

const MovieCard = (props) => {
  return (
    <section className="movie-card">
      <img src={props.poster_path} className="movie-poster" alt="film-poster" />
      <section className="rating-box">
        <section>AVG {props.average_rating}</section>
        <section>User rating</section>
      </section>
    </section>
  )
}

export default MovieCard
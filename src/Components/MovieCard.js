import React from 'react';

const MovieCard = (props) => {
  let userRate;
  if (props.ratings) {
    const findMovieRating = props.ratings.find(film => film.movie_id === props.id)
    if (findMovieRating) {
      userRate = <section>User: {findMovieRating.rating}</section>
    } else {
      userRate = <button>RATE ME</button>
    }
  }

  return (
    <section className="movie-card" onClick={props.handleMovie}>
    <img src={props.poster_path} className="movie-poster" alt="film-poster" id={props.id} />
      <section className="rating-box">
        <section>AVG: {Math.floor(props.average_rating)}</section>
        {userRate}
      </section>
    </section>
  )
}

export default MovieCard
import React from 'react';
import './_Body.scss'
import MovieCard from './MovieCard'

const Body = props => {
  if(props.movies) {
    const movieCards = props.movies.map(movie => (
      <MovieCard {...movie} 
        key={movie.id} 
        ratings={props.ratings} 
        handleMovie={props.handleMovie}
        isLoggedIn={props.isLoggedIn} />
    ))
    return (
      <section className="movie-container">
        { movieCards }
      </section>
    )
  } else {
    return <p className='loading-message'>Loading...</p>
  }
}

export default Body;
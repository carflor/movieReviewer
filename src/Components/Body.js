import React from 'react';
import './Body.css'
import MovieCard from './MovieCard'

const Body = props => {
  // create a variable to contain the mapping of the cards and interpolate in section
  console.log(props.movies, 'props')
  if(props.movies) {
    const movieCards = props.movies.map(movie => (
      <MovieCard {...movie} key={movie.id} />
    ))
    return (
      <section className="movie-container">
        { movieCards }
      </section>
    )
  } else {
    return <p>Loading...</p>
  }
}

export default Body;
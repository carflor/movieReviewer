import React from 'react';
import './_Body.scss'
import MovieCard from './MovieCard'

const Body = props => {
  if(props.movies && !props.showFavorites) {
    const movieCards = props.movies.map(movie => (
      <MovieCard {...movie} 
        key={movie.id} 
        ratings={props.ratings} 
        handleMovie={props.handleMovie}
        isLoggedIn={props.isLoggedIn} 
        favorites={props.favorites}
        user={props.user}
        getFavorites={props.getFavorites}/>
    ))
    return (
      <section className="movie-container">
        { movieCards }
      </section>
    )
  }

  if (props.movies && props.showFavorites) {
    const favoritedMovieCards = props.movies.reduce((favoriteMovies, movie) => {
        props.favorites.forEach(favorite => {
          if(favorite.movie_id === movie.id) {
            favoriteMovies.push(movie)
          }
        })
        return favoriteMovies
      }, [])
    const displayFavorites = favoritedMovieCards.map(movie => {
      return ( 
        <MovieCard {...movie} 
        key={movie.id} 
        ratings={props.ratings} 
        handleMovie={props.handleMovie}
        isLoggedIn={props.isLoggedIn} 
        favorites={props.favorites}
        user={props.user}
        getFavorites={props.getFavorites}/>
      )
    })
    if(displayFavorites.length === 0) {
      return (
        <section className="movie-container">
        <p className="empty-favorite-message">Click the heart icon on a movie to add it to your favorites!</p>
        </section>
      )
    }
    return (
      <section className="movie-container">
        { displayFavorites }
      </section>
    )
  } else {
    return <p className='loading-message'>Loading...</p>
  }
}

export default Body;
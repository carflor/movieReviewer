import React from 'react';
import './_MovieCard.scss'
import starIcon from '../Assets/star-regular.svg'
import ratedIcon from '../Assets/star-golden.svg'
import heartOutlineIcon from '../Assets/heart-outline.png'
import redHeartIcon from '../Assets/heart-red.png'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// const MovieCard = ({ id, ratings, handleMovie, poster_path, average_rating }) => {
class MovieCard extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isFavorite: false
    }
  }

  heartHandler = () => {
    debugger
    this.setState({isFavorite: false})
  }
  

  toggleFavorite = () => {
    return this.setState({isFavorite: !this.state.isFavorite})
  }

  faveIcon = (favorite) => {
    if (this.props.isLoggedIn && favorite) {
      console.log(favorite)
      return <img alt='fave-icon' src={redHeartIcon} onClick={()=> this.heartHandler()} className={'fave-icon-card'}/>
    }
    if (this.props.isLoggedIn) {
      return <img alt='fave-icon' src={this.state.isFavorite ? redHeartIcon : heartOutlineIcon} onClick={()=> this.toggleFavorite()} className={'fave-icon-card'}/>
    }
  } 

  render() {
    let userRate;
    if (this.props.ratings) {
      const seeIfFavorite = this.props.favorites.find(film => film.movie_id === this.props.id)
      const findMovieRating = this.props.ratings.find(film => film.movie_id === this.props.id)
      if (findMovieRating) {
        userRate = (
          <section className="user-rating">
          {this.faveIcon(seeIfFavorite)}
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
           {this.faveIcon(seeIfFavorite)}
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
      <section 
          className="movie-card"
          tabIndex="0" >
        <Link to={`movies/${this.props.id}`} style={{ textDecoration: 'inherit', color: 'inherit' }}>
          <img 
            onClick={this.props.handleMovie}
            src={this.props.poster_path} 
            className="movie-poster" 
            alt="film-poster" 
            id={this.props.id} />
        </Link>
          <section className="rating-box">
            <section className="avg-container">
              <img 
                alt="star-icon"
                src={ starIcon }
                className="star-icon-poster"
                />
              <section className="avg-rating-container">
                {Math.floor(this.props.average_rating)}
                <span className="rate-fraction">/10</span>
              </section>
            </section>
            {userRate}
          </section>
        </section>
    )
  }
}

export default MovieCard

MovieCard.propTypes = {
  id: PropTypes.number, 
  ratings: PropTypes.array, 
  handleMovie: PropTypes.func, 
  poster_path: PropTypes.string, 
  average_rating: PropTypes.number
}
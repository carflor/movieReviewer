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
    // this.isFavorite = null
    this.state = {
      isFavorite: false

    }
  }

  // setIfFavorite = (isFavorite) => {
  //   // if(this.props.isLoggedIn) {
  //   //   this.props.favorites.find(film => {
  //   //     if(film.movie_id === this.props.id) {
  //   //       // return this.isFavorite = true
  //   //       return this.setState({isFavorite: true})
  //   //     } else {
  //   //       // return this.isFavorite = false
  //   //       return this.setState({isFavorite: false})
  //   //     }
  //   //   })
  //   // }
  //   console.log(isFavorite)
  //   if (isFavorite) {
  //     this.setState({isFavorite: true})
  //   } 
  // }

  // setIfFavorite = () => {
  //   if (this.props.isLoggedIn) {
  //    const favorite = this.props.favorites.find(film => film.movie_id === parseInt(this.props.moviePageID))
  //   if (favorite) {
  //     return this.setState({isFavorite: true})
  //     } 
  //   }
  // }
  

  toggleFavorite = () => {
    return this.setState({isFavorite: !this.state.isFavorite})
  }

  faveIcon = () => {
    if (this.props.isLoggedIn) {
      return <img alt='fave-icon' src={this.state.isFavorite ? redHeartIcon : heartOutlineIcon} onClick={()=> this.toggleFavorite()} className={'fave-icon-card'}/>
    }
  } 
  
  componentDidMount() {
    this.setState({})
    this.setIfFavorite()
  }

  render() {
    let userRate;
    if (this.props.ratings) {
      // const seeIfFavorite = this.props.favorites.find(film => film.movie_id === this.props.id)
      const findMovieRating = this.props.ratings.find(film => film.movie_id === this.props.id)
      // console.log('seeIfFavorite', seeIfFavorite)
      // console.log('rating', findMovieRating)
      // this.setIfFavorite(seeIfFavorite)
      if (findMovieRating) {
        userRate = (
          <section className="user-rating">
          {this.faveIcon()}
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
           {this.faveIcon()}
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
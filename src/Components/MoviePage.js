import React, { Component } from 'react'
import './_MoviePage.scss'
import backIcon from '../Assets/angle-double-left-solid.svg'
import starIcon from '../Assets/star-regular.svg'
import ratedIcon from '../Assets/star-golden.svg'
import { Link } from 'react-router-dom';
import { getMovieData, deleteUserRating, submitRating } from '../apiCalls'


class MoviePage extends Component {
  constructor(props) {
    super(props); 
      this.state = {
        isLoading: false,
        value: '',
      }
  }

  handleChange = (event) => {
    this.setState({value: event.target.value})
  }

  findRatingId = () => {
      const rating = this.props.ratings.find(film => film.movie_id === parseInt(this.props.moviePageID))
      if(rating.id) { 
        return rating.id
    } 
  }

  removeRating = (event) => {
    event.preventDefault()
    const ratingsCopy  = [...this.props.ratings]
    const ratingId = this.findRatingId()
    const newRatings = ratingsCopy.reduce((ratings, film) => {
      if (film.movie_id !== parseInt(this.props.moviePageID)) {
        ratings.push(film)
      }
      return ratings
    }, [])
    this.setState({...this.state, userRating: null, ratings: newRatings})
    deleteUserRating(this.props.user.id, ratingId)
      .then(() => this.props.getUserRatings(this.props.user))
      .catch(error => console.log(error.message))
  }

  enterRating = (event) => {
    event.preventDefault()
    submitRating(this.props.user.id, this.props.moviePageID, this.state.value)
      .then(() => this.setState({...this.state, userRating: this.state.value, ratings: this.props.getUserRatings(this.props.user) }))
      .catch(error => console.log(error))
  }

  findMovieRating = () => {
    const rating = this.state.ratings.find(film => film.movie_id === parseInt(this.props.moviePageID))
    if (this.props.ratings && rating) {
      return rating.rating
    } 
  }

  displayUserRating = () => {
    if (this.props.ratings && this.state.userRating) {
      return (
        <section className='user-rating-box-selected'>
          <p className='user-rating-movie'>User 
          <img
            alt="rated-icon"
            src={ ratedIcon }
            className="rated-star-icon-moviePage" 
          /> 
            {this.state.userRating} 
          </p>
          <button 
            type='submit' 
            className='delete-button' 
            onClick={event => this.removeRating(event)}>
            Update
          </button>
        </section>
      )
    }
    if (this.state.ratings && this.findMovieRating() !== undefined) {
      return (
        <section className='user-rating-box-selected'>
          <p className='user-rating-movie'>User
          <img
            alt="rated-icon"
            src={ ratedIcon }
            className="rated-star-icon-moviePage" 
          /> 
            {this.findMovieRating()} 
          </p>
          <button 
          type='submit' 
          className='delete-button' 
          onClick={event => this.removeRating(event)}>Update</button>
        </section>
      )
    } 
    if (this.props.ratings && this.state.userRating === null) {
      return (
        <section className='user-rating-box-selected'>
        <form className='rating-system'>
          Rate Me: 
          <input type='number' 
            id='number-select' 
            min='0' max='10' 
            value={this.state.value} 
            onChange={this.handleChange}>
          </input>
          <button 
            type='submit' 
            form='rating-system' 
            name='number-select'
            className='submit-rating-btn' 
            onClick={event => this.enterRating(event)}>
              Submit
          </button>
        </form>
      </section>
      )
    }
  }

  componentDidMount() {
    getMovieData(this.props.moviePageID)
      .then(response => this.setState({ 
        title: response.movie.title,
        avgRating: response.movie.average_rating,
        backdrop: response.movie.backdrop_path,
        genre: response.movie.genres,
        overview: response.movie.overview,
        poster: response.movie.poster_path,
        releaseDate: response.movie.release_date,
        runtime: response.movie.runtime,
        tagline: response.movie.tagline,
        userRating: null,
        isLoading: true,
        isLoggedIn: false,
        ratings: this.props.ratings
      }))
      .catch(error => console.log(error.message))
  }

  render() {
    const backgroundImg = { backgroundImage: `url(${this.state.backdrop})`}
    if(this.state.isLoading) {
      return (
      <section 
        className='movie-page'
        style={ backgroundImg }>
        <section className="movie-nav">
          <Link to='/' style={{ textDecoration: 'none' }}>
            <img 
              alt='back-btn' 
              src={ backIcon } 
              className='back-btn'
              tabIndex='0'
              onClick={ this.props.handleBackBtn }
              />
          </Link>
          <h1 className='movie-title'>{this.state.title}</h1>
        </section>
        <section className='movie-content'>
          <img 
            src={this.state.poster} 
            alt='movie poster' className='movie-poster-selected'/>
          <section className='movie-data-box'> 
            <section className='rating-box-selected'>
             <p className='average-rating'>AVG
             <img 
              alt="star-icon"
              src={ starIcon }
              className="star-icon-poster-moviePage" 
            /> 
              {Math.floor(this.state.avgRating)}</p>
            </section>
              {this.displayUserRating()}
            <section className='movie-data'>
              <p>{this.state.overview}</p>
              <p className='movie-datum'>Release Date: {this.state.releaseDate}</p>
              <p className='movie-datum'>Duration: {this.state.runtime} minutes</p>
              <p className='movie-datum'>Genres: {this.state.genre.join(', ')}</p>
            </section>
          </section>
        </section>
       {this.state.tagline && <section className="movie-tagline">"{this.state.tagline}"</section>}
      </section>
      )
    } else {
      return <p className="loading-message">Loading...</p>
    }
  }
}

export default MoviePage;
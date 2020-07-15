import React, { Component } from 'react'
import './MoviePage.scss'
import CommentCard from './CommentCard'
import backIcon from '../Assets/angle-double-left-solid.svg'
import starIcon from '../Assets/star-regular.svg';
import ratedIcon from '../Assets/star-golden.svg'
import heartOutlineIcon from '../Assets/heart-outline.png'
import redHeartIcon from '../Assets/heart-red.png'
import { NavLink, Link } from 'react-router-dom';
import { getMovieData, deleteUserRating, submitRating, submitComment, getMovieComments, getTrailer, addOrRemoveAFavorite } from '../apiCalls'

class MoviePage extends Component {
  constructor(props) {
    super(props); 
      this.state = {
        isLoading: false,
        value: '',
        isFavorite: false,
        displayingSummary: true,
        displayingComments: false,
        displayingTrailer: false,
        userComment: '',
        allComments: [],
        youtubeKey: null,
      }
  }

  toggleFavorite = () => {
    addOrRemoveAFavorite(this.props.user.id, parseInt(this.props.moviePageID))
    .then(() => this.setState({isFavorite: !this.state.isFavorite}))
    .then(() => this.props.getFavorites(this.props.user))
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
          <input 
            type='number'
            placeholder='5' 
            id='number-select' 
            min='0' max='10' 
            className='rate-input'
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

  showComments = (event) => {
    event.preventDefault()
    this.setState({ displayingSummary: false,
      displayingComments: true,
      displayingTrailer: false })
  }

  createComments = () => {
    if(this.state.allComments.length > 0) {
      const comments = this.state.allComments.filter(comment => comment.movie_id === +this.props.moviePageID)
      const updatedComments = comments.map(comment => (
        <CommentCard 
          key={comment.id}
          author={comment.author}
          message={comment.comment}
        />
      ))
      return updatedComments
    } else {
      return this.props.isLoggedIn &&
        <h1 className="no-comments">Please comment below!</h1>
    }
  }

  handleComment = (event) => {
    this.setState({ userComment: event.target.value})
  }

  handleCommentSubmit = async (event) => {
    event.preventDefault()
    if (this.state.userComment !== '') {
      const commentPost = {
        author: this.props.user.name,
        movieId: +this.props.moviePageID,
        comment: this.state.userComment
      }
      await submitComment(commentPost)
        .catch(error => console.log(error))
      getMovieComments(parseInt(this.props.moviePageID))
        .then(response => this.setState({ allComments: response }))
        .catch(err => console.log(err))
      this.setState({ userComment: '' })
    }
  }

  showSummary = (event) => {
    event.preventDefault()
    this.setState({ 
      displayingSummary: true,
      displayingComments: false,
      displayingTrailer: false 
    })
  }

  showTrailer = (event) => {
    event.preventDefault()
    this.setState({ 
      displayingSummary: false,
      displayingComments: false,
      displayingTrailer: true 
    })
    getTrailer(this.props.moviePageID)
      .then(response => this.setState({ youtubeKey: response.videos[0].key }))
      .catch(err => console.log(err))
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
        ratings: this.props.ratings,
        favorites: this.props.favorites,
        isFavorite: this.setIfFavorite()
      }))
      .catch(error => console.log(error.message))
    getMovieComments(this.props.moviePageID)
      .then(response => this.setState({ allComments: response }))
      .catch(err => console.log(err))
  }

  setIfFavorite = () => {
    if (this.props.isLoggedIn) {
     const favorite = this.props.favorites.find(film => film.movie_id === parseInt(this.props.moviePageID))
    if (favorite) {
      return true
      } 
    }
  }

  faveIcon = () => {
    if (this.props.isLoggedIn) {
      return <img alt='fave-icon' src={this.state.isFavorite ? redHeartIcon : heartOutlineIcon}onClick={()=> this.toggleFavorite()} className={'fave-icon-movie-page'}/>
    }
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
          {this.faveIcon()}
        </section>
        <section className='movie-content'>
          <img 
            src={this.state.poster} 
            alt='movie poster' className='movie-poster-selected'/>
          <section>
            <section className='movie-nav-box'>
              <NavLink to='/'>
                <label htmlFor='summary-btn'></label>
                <button className='summary-btn' onClick={(event) => this.showSummary(event)}>Summary</button>
              </NavLink>
              <NavLink to='/comments'>
                <label htmlFor='comments-btn'></label>
                <button className='comments-btn' onClick={(event) => this.showComments(event)}>Comments</button>
              </NavLink>
              <NavLink to='/trailer'>
                <label htmlFor='trailer-btn'></label>
                <button className='trailer-btn' onClick={(event) => this.showTrailer(event)}>Trailer</button>
              </NavLink>
            </section>
            {this.state.displayingSummary && (
            <section className='movie-summary-box'> 
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
            </section>)}
            {this.state.displayingComments && (
            <section className='movie-comment-box'> 
              <section className='comment-container'>
              { this.createComments() }
              </section>
              {this.props.isLoggedIn ? <section className="comment-submit-container">
                <label htmlFor='comment-input'></label>
                <textarea 
                  className='comment-box-input' 
                  placeholder='Comment here...'
                  name="comment-input"
                  minLength='1' 
                  maxLength='250'
                  value={this.state.userComment}
                  onChange={(event) => this.handleComment(event)}>
                </textarea>
                <button 
                  className='submit-comment-btn' 
                  onClick={(event) => this.handleCommentSubmit(event)}
                >
                  Submit
                </button>
              </section> : <h1 className='sign-up-message'>Please sign up to comment!</h1>}
            </section>)}
            {this.state.displayingTrailer && (
            <section className='movie-trailer-box'>          
              {this.state.youtubeKey ? 
                <iframe 
                  title={this.state.youtubeKey} 
                  height="400" 
                  width="600" 
                  src={`https://www.youtube.com/embed/${this.state.youtubeKey}`}> 
              </iframe> : <h1>Loading...</h1>} 
            </section>)}
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
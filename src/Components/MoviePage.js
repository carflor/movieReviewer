import React, { Component } from 'react'
import './_MoviePage.scss'
import backIcon from '../Assets/angle-double-left-solid.svg'
import starIcon from '../Assets/star-regular.svg'
import ratedIcon from '../Assets/star-golden.svg'


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

  removeRating = () => {
    console.log('hey')
    const ratingsCopy  = [...this.state.ratings]
    const newRatings = ratingsCopy.reduce((ratings, film, i) => {
      if (film.movie_id !== parseInt(this.props.moviePageID)) {
        ratings.push(film)
      }
      return ratings
    }, [])
    console.log('newRatings', newRatings)
    this.setState({...this.state, userRating: null, ratings: newRatings})
    // this.deleteUserRating(event)
    // .then(() => this.state.ratings.find((film, i)=> {
    //   const ratingsCopy = this.state.ratings.map(film => film)
    //     console.log('copy', ratingsCopy)
    //     if(film.movie_id === parseInt(this.props.moviePageID)) {
    //       return ratingsCopy.splice(i, 1)
    //       // this.setState({...this.state, userRating: null, ratings: ratingsCopy})
    //     }
    //   }))
      // .then((response) => this.setState({...this.state, userRating: null, ratings: response }))
      // .then(data => console.log(data))
      // .catch(error => console.log('remove rating error', error.message))
  }
  
  
  deleteUserRating = (event) => {
    debugger
    event.preventDefault()
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${this.props.user.id}/ratings/${this.findRatingId()}`, {
      method: 'DELETE',
    })
    .then(response => console.log(response.json))
    // .then(this.props.getUserRatings(this.props.user))
    .catch(error => console.log(error.message))
    
    // .then(response => response.json())
    this.props.getUserRatings(this.props.user)
    this.removeRating()
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // } else {
    //   const data = await response.json()
    //   console.log(data)
    //   return data
    // }
  }

  enterRating = (event) => {
    debugger
    this.submitRating(event)
      .then(() => this.setState({...this.state, userRating: this.state.value, ratings: this.props.getUserRatings(this.props.user) }))
      .catch(error => console.log(error))
  }

  submitRating = async (event) => {
    event.preventDefault()
    const response = await fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${this.props.user.id}/ratings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          movie_id: parseInt(this.props.moviePageID),
          rating: parseInt(this.state.value)
      })
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      const data = await response.json()
      return data
    }
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
          <p className='user-rating'>User 
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
            onClick={event => this.deleteUserRating(event)}>
            Update
          </button>
        </section>
      )
    }
    if (this.state.ratings && this.findMovieRating() !== undefined) {
      return (
        <section className='user-rating-box-selected'>
          <p className='user-rating'>User
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
          onClick={event => this.deleteUserRating(event)}>Change</button>
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
    fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${this.props.moviePageID}`)
      .then(response => response.json())
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
          <img 
            alt='back-btn' 
            src={ backIcon } 
            className='back-btn'
            tabIndex='0'
            onClick={ this.props.handleBackBtn }
             />
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
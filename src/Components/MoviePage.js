import React, { Component } from 'react'
import './_MoviePage.scss'
import backIcon from '../Assets/angle-double-left-solid.svg'

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
      if(rating) {
      console.log('rating', rating.id)  
      return rating.id
    }
  }
  
  deleteUserRating = (event) => {
    event.preventDefault()
      fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${this.props.user.id}/ratings/${this.findRatingId()}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
      })
      // .then(response => response.json())
      .then(response => console.log(response))
      .then(this.setState({...this.state, userRating: undefined}))
      .catch(error => console.log(error.message))
  }

  submitRating = (event) => {
    event.preventDefault()
    return (
      fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${this.props.user.id}/ratings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              movie_id: parseInt(this.props.moviePageID),
              rating: parseInt(this.state.value)
          })
      })
      .then(response => response.json())
      .then(response => this.setState({...this.state, userRating: this.state.value}))
      .catch(error => console.log(error))
      
    )
  }

  findMovieRating = () => {
    const rating = this.props.ratings.find(film => film.movie_id === parseInt(this.props.moviePageID))
    if (this.props.ratings && rating) {
      return rating.rating
    } 
  }

  displayUserRating = () => {
    if (this.state.userRating) {
      return (
        <section className='user-rating-box-selected'>
          <p className='user-rating'>User Rating: {this.state.userRating} </p>
          <button type='submit' className='delete-button' onClick={event => this.deleteUserRating(event)}>Delete</button>
        </section>
      )
    }
    if (this.props.ratings && this.findMovieRating() !== undefined) {
      return (
        <section className='user-rating-box-selected'>
          <p className='user-rating'>User Rating: {this.findMovieRating()} </p>
          <button 
          type='submit' 
          className='delete-button' 
          onClick={event => this.deleteUserRating(event)}>Delete</button>
        </section>
      )
    } 
    if (this.props.ratings && !this.state.userRating) {
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
            onClick={event => this.submitRating(event)}>
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
      }))
      .catch(error => console.log(error.message))
  }



  render() {
    const backgroundImg = { backgroundImage: `url(${this.state.backdrop})`}
    
    if(this.state.isLoading) {
      return (
      <section 
        className='movie-page'
        style={ backgroundImg } 
        >
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
             <p className='average-rating'>AVG: {Math.floor(this.state.avgRating)}</p>
            </section>
              {this.displayUserRating()}
              {/* {this.state.userRating && <p>{this.state.userRating}</p>} */}
            <section className='movie-data'>
              <p>{this.state.overview}</p>
              <p>Release Date: {this.state.releaseDate}</p>
              <p>Duration: {this.state.runtime} minutes</p>
              <p>Genres: {this.state.genre.join(', ')}</p>
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

    //movie:
// average_rating: 3.6666666666666665
// backdrop_path: "https://image.tmdb.org/t/p/original//o0F8xAt8YuEm5mEZviX5pEFC12y.jpg"
// budget: 125000000
// genres: (4) ["Adventure", "Fantasy", "Science Fiction", "Family"]
// id: 475430
// overview: "Artemis Fowl is a 12-year-old genius and descendant of a long line of criminal masterminds. He soon finds himself in an epic battle against a race of powerful underground fairies who may be behind his father's disappearance."
// poster_path: "https://image.tmdb.org/t/p/original//tI8ocADh22GtQFV28vGHaBZVb0U.jpg"
// release_date: "2020-06-12"
// revenue: 0
// runtime: 95
// tagline: "Remember the name"
// title: "Artemis Fowl"
//  }

export default MoviePage
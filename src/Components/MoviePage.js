import React, { Component } from 'react'
import './MoviePage.css'

class MoviePage extends Component {
  constructor(props) {
    super(props); 
      this.state = {
        isLoading: false,
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
        isLoading: true,
      }))
      .catch(error => console.log(error.message))
  }

  render() {
    if(this.state.isLoading) {
      return (
      <section className='movie-page'>
        <h1>Content</h1>
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
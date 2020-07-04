import React, { Component } from 'react'
import './MoviePage.css'


class MoviePage extends Component {
    constructor(props) {
      super(props); 
        this.state = {}
    }

    componentDidMount() {
      fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${this.props.moviePageID}`)
        .then(response => response.json())
        .then(response => console.log(response))
        .then(response => this.setState({movieTitle: response.movie.title,}))
        .catch(error => console.log(error.message))
    }

    render() {
      return (
        <section className='movie-page'>
          
        </section>
      )
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
 }

export default MoviePage
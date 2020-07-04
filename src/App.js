import React from 'react';
import './App.css';
import Nav from './Components/Nav';
import Body from './Components/Body';
import LogInForm from './Components/LogInForm';
import MoviePage from './Components/MoviePage'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      isLoading: false,
      error: null,
      isLoggedIn: false,
      moviePage: false,
      logOutMethod: this.logOut,
      logInMethod: this.logIn,
      user: null,
      ratings: null
      // form: false,
    }
    this.url = 'https://rancid-tomatillos.herokuapp.com/api/v2'
  }

  logIn = () => {
    this.setState({ ...this.state, form: true })
  }

  logOut = () => {
    this.setState({...this.state, ratings: null, isLoggedIn: false})
  }

  handleMovie = (event) => {
    this.setState({...this.state, moviePage: true, moviePageID: event.target.id})
    console.log(event.target) 
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    fetch(`${this.url}/movies`)
      .then(response => {
        if(response.ok) {
          return response.json() 
        } else {
          throw new Error('Pardon the disturbance in the force...')
        }})
      .then(data => this.setState({ 
        movies: data.movies, 
        isLoading: false 
    })).catch(error => this.setState({ error, isLoading: false}))
  }
  
  getUserRatings = (data) => {
    console.log('data', data)
    this.setState({user: data.user, isLoggedIn: true})
    fetch(`${this.url}/users/${this.state.user.id}/ratings`) 
      .then(response => response.json())
      .then(data => this.setState({form: false, ratings: data.ratings}))
      .catch(error => console.log(error))
  }

  render() {
    const { movies, isLoading, error, form, isLoggedIn, ratings, moviePage } = this.state
    if(isLoading) {
      return <p className='loading-message'>Loading...</p>
    }

    if(error) {
    return <p>{error.message}</p>
    }

    if(form) {
      return (
         <LogInForm getUserRatings= {this.getUserRatings} />
        )
    }

    if(moviePage) {
      return (
        <MoviePage data={this.state.movies} moviePageID= {this.state.moviePageID} />
      )
    }

    if(isLoggedIn) {
      return (
        <main className="App">
          <Nav data={this.state}/>
          <Body movies={movies} ratings={ratings} />
        </main>
      )
    }
    
    return (
      <main className="App">
        <Nav data={this.state}/>
        <Body movies={movies} ratings={ratings} handleMovie={this.handleMovie}/>
      </main>
    );
  }
}

export default App;

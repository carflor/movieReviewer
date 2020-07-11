import React from 'react';
import './App.scss';
import Nav from './Components/Nav';
import Body from './Components/Body';
import LogInForm from './Components/LogInForm';
import MoviePage from './Components/MoviePage';
import { getMovies, getUserMovieRatings } from './apiCalls';
import { Route, Switch, Redirect } from 'react-router-dom';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      isLoading: false,
      error: null,
      isLoggedIn: false,
      logOutMethod: this.logOut,
      logInMethod: this.logIn,
      returnHomeBtn: this.returnHomeBtn,
      user: null,
      ratings: null,
    }
  }

  logIn = () => {
    this.setState({ ...this.state, form: true })
  }

  logOut = () => {
    this.setState({ ...this.state, ratings: null, isLoggedIn: false, user: null})
  }

  handleMovie = (event) => {
    this.setState({ ...this.state, moviePage: true, moviePageID: event.target.id})
  }

  handleBackBtn = () => {
    this.setState({ ...this.state, moviePage: false })
  }

  returnHomeBtn = () => {
    this.setState({ form: false })
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    getMovies()
      .then(data => this.setState({ 
        movies: data.movies, 
        isLoading: false 
    })).catch(error => this.setState({ error, isLoading: false}))
  }
  
  getUserRatings = (userData) => {
    if (!this.state.user) {
      this.setState({user: userData, isLoggedIn: true})
    }
    getUserMovieRatings(userData.id)
      .then(response => this.setState({ form: false, ratings: response.ratings }))
      .catch(error => console.log(error))
  }

  render() {
    const { movies, isLoading, error, isLoggedIn, ratings, returnHomeBtn } = this.state
    if(isLoading) {
      return <p className='loading-message'>Loading...</p>
    }
    if(error) {
      return <p>{ error.message }</p>
    }

    const app = (
      <main className="App">
        <Nav data={this.state}/>
        <Body
          isLoggedIn={isLoggedIn}
          movies={movies} 
          ratings={ratings}
          handleMovie={this.handleMovie}/>
      </main>
    )

    return (
      <Switch>
        <Route
          exact path="/movies/:id"
          render={({ match }) => {
            const { id } = match.params;
            return <MoviePage 
              movies={this.state.movies} 
              moviePageID={id}
              handleBackBtn={this.handleBackBtn} 
              user={this.state.user}
              ratings={ratings}
              getUserRatings={this.getUserRatings} />
          }}>  
        </Route>
        <Route 
          exact path='/dashboard'
          render={() => app}
          > 
          {/* { isLoggedIn && app } */}
          {/* { !isLoggedIn && <Redirect to='/'/> } */}
        </Route>
        <Route exact path='/login'>
          <LogInForm 
            getUserRatings={ this.getUserRatings } 
            returnHomeBtn={ returnHomeBtn } />
          { isLoggedIn && <Redirect to='/dashboard' />}
        </Route>
        <Route 
          exact path='/'
          render={() => app}  
          >
          {/* { isLoggedIn && <Redirect to='/dashboard' />} */}
          {/* { !isLoggedIn && app } */}
        </Route>
      </Switch>
    );
  }
}

export default App;

// fix back button route functionality


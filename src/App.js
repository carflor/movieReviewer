import React from 'react';
import Nav from './Components/Nav';
import Body from './Components/Body';
import LogInForm from './Components/LogInForm';
import MoviePage from './Components/MoviePage';
import { getMovies, getUserMovieRatings, getUserFavorites } from './apiCalls';
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
      showFavoritesBtn: this.showFavoritesBtn,
      user: null,
      ratings: null,
      favorite: null,
      showFavorites: false
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

  showFavoritesBtn = () => {
    this.setState({showFavorites: !this.state.showFavorites})
  }

  componentDidMount() {
    this.setState({ isLoading: true })
    getMovies()
      .then(data => this.setState({ 
        movies: data.movies, 
        isLoading: false 
    })).catch(error => this.setState({ error, isLoading: false}))
  }

  getFavorites = (userData) => {
    getUserFavorites(userData.id)
      .then(response => this.setState({favorites: response}))
      .catch(error => console.log(error.message))
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
    const { movies, isLoading, error, isLoggedIn, ratings, returnHomeBtn, favorites, user } = this.state
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
          handleMovie={this.handleMovie}
          favorites={favorites}
          user={user}
          getFavorites={this.getFavorites}
          showFavorites={this.state.showFavorites}/>
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
              isLoggedIn={this.state.isLoggedIn} 
              user={this.state.user}
              ratings={ratings}
              getUserRatings={this.getUserRatings}
              favorites={favorites} 
              getFavorites={this.getFavorites}
              showFavorites={this.state.showFavorites}/>
          }} 
        />  
        <Route 
          exact path='/dashboard'
          render={() => app} 
        > 
          {!isLoggedIn && <Redirect to='/' />}
        </Route> 
        <Route
          exact path='/favorites'
          render={() => app}
        />
        <Route exact path='/login'>
          <LogInForm 
            getUserRatings={ this.getUserRatings } 
            returnHomeBtn={ returnHomeBtn } 
            getFavorites={ this.getFavorites }/>
          { isLoggedIn && <Redirect to='/dashboard' />}
        </Route>
        <Route 
          exact path='/'
          render={() => app}  
        />
      </Switch>
    );
  }
}

export default App;
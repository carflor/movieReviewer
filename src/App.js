import React from 'react';
import './App.css';
import Nav from './Components/Nav';
import Body from './Components/Body';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      isLoading: false,
      error: null
    }
  }

  componentDidMount() {
    this.setState({ isLoading: true })

    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
      .then(response => {
        if(response.ok) {
          return response.json() 
        } else {
          throw new Error('Pardon the disturbance..')
        }})
      .then(data => this.setState({ 
        movies: data.movies, 
        isLoading: false 
    })).catch(error => this.setState({ error, isLoading: false}))
  } 

  render() {
    const { movies, isLoading, error } = this.state

    if(isLoading) {
      return <p>Loading...</p>
    }

    if(error) {
    return <p>{error.message}</p>
    }
    
    return (
      <main className="App">
        <Nav />
        <Body movies={movies} />
      </main>
    );
  }
}

export default App;

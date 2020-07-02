import React from 'react';
import './App.css';
import Nav from './Components/Nav';
import Body from './Components/Body';
import LogInForm from './Components/LogInForm';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      isLoading: false,
      error: null,
      // isLoggedIn: false,
      // form: false,
      logInMethod: this.logIn,
      user: null
    }
    this.url = 'https://rancid-tomatillos.herokuapp.com/api/v2'
  }

  logIn = () => {
    this.setState({ ...this.state, form: true })
  }

  componentDidMount() {
    this.setState({ isLoading: true })

    fetch(`${this.url}/movies`)
      .then(response => {
        if(response.ok) {
          return response.json() 
        } else {
          throw new Error('Pardon the disturbance...')
        }})
      .then(data => this.setState({ 
        movies: data.movies, 
        isLoading: false 
    })).catch(error => this.setState({ error, isLoading: false}))
  }
  
  getUserData = (data) => {
    console.log('data', data)
    this.setState({user: data.user, isLoggedIn: true})
    fetch(`${this.url}/users/${this.state.user.id}/ratings`) 
      .then(response => response.json())
      // .then(data => this.setState({userrating= data}))
      .catch(error => console.log(error))
  
  }

  render() {
    const { movies, isLoading, error, form, isLoggedIn } = this.state
    console.log('state', this.state)
    if(isLoading) {
      return <p>Loading...</p>
    }

    if(error) {
    return <p>{error.message}</p>
    }

    if(form) {
      return (
         <LogInForm form={this.state.form} getUserData= {this.getUserData}/>
        )
    }

    if(isLoggedIn) {
      this.getUserData()
      return (
        <main className="App">
          <Nav data={this.state}/>
          <Body movies={movies} />
        </main>
      )
    }
    
    return (
      <main className="App">
        <Nav data={this.state}/>
        <Body movies={movies} />
      </main>
    );
  }
}

export default App;

import React, { Component } from 'react';
import '../Components/Nav.css';
import LogInForm from './LogInForm'
// import { render } from '@testing-library/react';

class Nav extends Component {
  constructor(props) {
    super(props);
      this.state = props.data
    }

  logOut = () => {
    this.setState({ ...this.state, isLoggedIn: false })
  }

  render() {
    if(this.state.form) {
      return (
          <LogInForm form={this.state.form}/>
        )
    }

    if(this.state.isLoggedIn) {
      return (
        <nav className="nav">
          <h1 className="nav-title">DOPE NOPE</h1>
          {/* ICON IMAGE */}
          <label></label>
          <input 
            className='search-bar'
            type='search' 
            placeholder='Search Movies...'></input>
          <button 
          className="login-btn" 
          onClick={this.logOut}>LOG OUT</button>
          <p className="welcome-message">Welcome {this.state.user.name}</p>
        </nav>
      )
    }
  
    console.log(this.state, 'current state in nav')
    return (
      <nav className="nav">
        <h1 className="nav-title">DOPE NOPE</h1>
        {/* ICON IMAGE */}
        <label></label>
        <input 
          className='search-bar'
          type='search' 
          placeholder='Search Movies...'></input>
        <button 
        className="login-btn" 
        onClick={this.state.logInMethod}>LOG IN</button>
      </nav>
    )
  }
}

  export default Nav
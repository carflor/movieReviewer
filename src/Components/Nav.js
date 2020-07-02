import React, { Component } from 'react';
import '../Components/Nav.css';
import LogInForm from './LogInForm'
// import { render } from '@testing-library/react';

class Nav extends Component {
  constructor(props) {
    super(props);
      this.state = props.data
    }

  // logIn() {
  //   this.setState({ ...this.state, form: true })
  // }

  render() {
    if(this.state.form) {
      return (
          <LogInForm form={this.state.form}/>
        )
    }
    // const props = this.state
    return (
      <nav className="nav">
        <h1 className="nav-title">DOPE NOPE</h1>
        {/* ICON IMAGE */}
        <label></label>
        <input 
          className='search-bar'
          type='search' 
          placeholder='Search Movies...'></input>
        {/* input has click handler for search */}
        <button 
        className="login-btn" 
        onClick={this.state.logInMethod}>LOG IN</button>
        {/* button has to take the click handler */}
      </nav>
    )
  }
}

  export default Nav
import React, { Component } from 'react';
import '../Components/Nav.css';
import LogInForm from './LogInForm'

const Nav = (props) => {
  if (props.data.form) {
    return (
        <LogInForm form={props.data.form}/>
      )
  }

  if (props.data.isLoggedIn) {
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
        onClick={props.data.logOutMethod}>LOG OUT</button>
        <p className="welcome-message">Welcome {props.data.user.name}</p>
      </nav>
    )
  }

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
      onClick={props.data.logInMethod}>LOG IN</button>
    </nav>
  )
}


  export default Nav
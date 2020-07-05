import React from 'react';
import './_Nav.scss';
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
        <label htmlFor="search"></label>
        <input 
          className='search-bar'
          type='search'
          ariaLabel="search-input" 
          placeholder='Search Movies...'></input>
        <section className="nav-btn-box">
          <p className="welcome-message">Welcome {props.data.user.name}</p>
          <button 
            className="login-btn" 
            onClick={props.data.logOutMethod}>LOG OUT</button>
        </section>
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
        ariaLabel="search-input"
        placeholder='Search Movies...'></input>
      <section className="nav-btn-box">
        <button 
        className="login-btn" 
        onClick={props.data.logInMethod}>LOG IN</button>
      </section>
    </nav>
  )
}


  export default Nav
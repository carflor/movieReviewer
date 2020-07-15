import React from 'react';
import './_Nav.scss';
import LogInForm from './LogInForm'
import { Link } from 'react-router-dom'

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
          aria-label="search-input" 
          placeholder='Search Movies...'></input>
        <section className="nav-btn-box">
          <p className="welcome-message">Welcome {props.data.user.name}</p>
          <button 
            className="login-btn" 
            onClick={props.data.logOutMethod}>LOG OUT</button>
            <Link to={'/favorites'}>
              <button className={"dope-movie-btn"} onClick={props.data.showFavoritesBtn} style={{ textDecoration: 'inherit', color: 'inherit' }>{props.data.showFavorites ? 'All Movies' : 'Dope Movies'}</button>
            </Link>
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
        aria-label="search-input"
        placeholder='Search Movies...'></input>
      <section className="nav-btn-box">
        <Link to='/login' >
          <button 
            className="login-btn" 
            onClick={props.data.logInMethod}>
              LOG IN
          </button>
        </Link>
      </section>
    </nav>
  )
}


export default Nav
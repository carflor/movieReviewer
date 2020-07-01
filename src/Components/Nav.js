import React from 'react';
import '../Components/Nav.css'

function Nav() {
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
      <button className="login-btn">LOG IN</button>
      {/* button has to take the click handler */}
    </nav>
  )
}

export default Nav
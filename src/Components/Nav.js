import React from 'react';
import './Nav.scss';
import { Link } from 'react-router-dom';
import LogInForm from './LogInForm';

const Nav = (props) => {
  if (props.data.form) {
    return (
      <LogInForm form={ props.data.form } />
    );
  }

  if (props.data.isLoggedIn) {
    return (
      <nav className="nav">
        <h1 className="nav-title">
          DOPE
          <span className="title-span">
            | |
          </span>
          NOPE
        </h1>
        <p className="welcome-message">
          Welcome 
          {props.data.user.name}
        </p>
        <section className="nav-btn-box">
          <Link to={props.data.showFavorites ? "/": "/favorites" }>
            <button
              type="button"
              className={"dope-movie-btn"}
              onClick={props.data.showFavoritesBtn}
              style={{ textDecoration: 'none' }}
            >
              {props.data.showFavorites ? 'ALL MOVIES' : 'DOPE MOVIES'}
            </button>
          </Link>
          <button
            type="button"
            className={props.data.showFavorites ? 'hidden' : 'login-btn'}
            onClick={props.data.logOutMethod}
          >
            LOG OUT
          </button>
        </section>
      </nav>
    );
  }

  return (
    <nav className="nav">
      <h1 className="nav-title">
        DOPE
        <span className="title-span">
          | |
        </span>
        NOPE
      </h1>
      <section className="nav-btn-box">
        <Link to="/login">
          <button
            type="button"
            className="login-btn"
            onClick={props.data.logInMethod}>
            LOG IN
          </button>
        </Link>
      </section>
    </nav>
  );
};

export default Nav;

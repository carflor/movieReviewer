import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './LogInForm.scss'
import { submitUserLogIn } from '../apiCalls'
import { Link } from 'react-router-dom'

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loginError: false,
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value, loginError: false })
  }

  submitLogIn = event => {
    event.preventDefault()
    submitUserLogIn(this.state.email, this.state.password)
      .then(data => {
        if (!data.error) {
          this.props.getUserRatings(data.user)
          this.props.getFavorites(data.user)
        }
        this.setState({ email: '', password: '', loginError: true })
      })
      .catch(error => console.log(error))
  }
  
  render() {
    return (
      <section className='main-page'>
        <section className='log-in-form'>
          <h2>LOG IN</h2>
          {this.state.loginError && <h4 className="error-message">Incorrect Username or Password Submitted!</h4>}
          <form>
            <label htmlFor='email'></label>
            <input 
              type='text'
              className='email-input'
              placeholder= 'email'
              name='email'
              aria-label="email"
              value={this.state.email}
              onChange={event => this.handleChange(event)}
            />
            <label htmlFor='password'></label>
            <input 
              // type='password'
              type='text'
              placeholder= 'password'
              className='password-input'
              name='password'
              aria-label="password"
              value={this.state.password}
              onChange={event => this.handleChange(event)}
            />
            <Link to='/' style={{ textDecoration: 'none', margin: 'auto' }}>
              <button 
                className='back-button' 
                onClick={event => this.props.returnHomeBtn(event)}
              >Back
              </button>
            </Link>
            <Link to='/dashboard' style={{ textDecoration: 'none', margin: 'auto' }}>
              <button
                className='submit-log-in-button' 
                onClick={event => this.submitLogIn(event)}>Log In
              </button>
            </Link>
          </form>
        </section>
      </section>
    )
  }
}

export default LogInForm

LogInForm.propTypes = {
  email: PropTypes.string,
  password: PropTypes.number
}
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './_LogInForm.scss'
import { submitUserLogIn } from '../apiCalls'

class LogInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: ''
    }
  }

    handleChange = event => {
      this.setState({[event.target.name]: event.target.value})
    }

    submitLogIn = event => {
      event.preventDefault()
      submitUserLogIn(this.state.email, this.state.password)
          .then(data => this.props.getUserRatings(data.user))
          .catch(error => console.log(error))
    }
    
    render() {
        return (
            <section className='main-page'>
            <section className='log-in-form'>
                <h2>Log In:</h2>
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
                        type='text'
                        placeholder= 'password'
                        className='password-input'
                        name='password'
                        aria-label="password"
                        value={this.state.password}
                        onChange={event => this.handleChange(event)}
                    />
                    <button className='submit-log-in-button' onClick={event => this.submitLogIn(event)}>Log In</button>
                    <button className='back-button' onClick={event => this.props.returnHomeBtn(event)}>Back</button>
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
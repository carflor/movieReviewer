import React, { Component } from 'react';
import App from '../App'
import './LogInForm.css'

class LogInForm extends Component {
    constructor() {
        super();
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
        return (
            fetch('https://rancid-tomatillos.herokuapp.com/api/v2/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: this.state.email,
                    password: this.state.password
                })
            })
            .then(response => response.json())
            .then(data => this.props.getUserData(data))
            .catch(error => console.log(error))
        )
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
                        placeholder= 'email'
                        name='email'
                        value={this.state.email}
                        onChange={event => this.handleChange(event)}
                    />
                    <label htmlFor='password'></label>
                    <input 
                        type='text'
                        placeholder= 'password'
                        name='password'
                        value={this.state.password}
                        onChange={event => this.handleChange(event)}
                    />
                    <button onClick={event => this.submitLogIn(event)}>Log In</button>
                    <button onClick={event => this.returnHome(event)}>Back</button>
                </form>
            </section>
            </section>
        )
    }
}

export default LogInForm
import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App'
import LogInForm from './LogInForm'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
jest.mock('../apiCalls.js')
import { submitUserLogIn, getUserMovieRatings } from '../apiCalls'
import { createMemoryHistory } from 'history'
const getUserRatings = jest.fn(getUserMovieRatings())


describe('LogInForm', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <LogInForm getUserRatings={getUserRatings}/>
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('should render a log in form', () => {
    const { getByText, getByPlaceholderText } = render(
      <BrowserRouter>
        <LogInForm getUserRatings={getUserRatings}/>
      </BrowserRouter>)
    const title = getByText('LOG IN')
    const emailInput = getByPlaceholderText('email')
    const passwordInput = getByPlaceholderText('password')
    const submitBtn = screen.getByRole('button', { name: /Log In/})
    const backBtn = screen.getByRole('button', { name: /Back/})
    expect(title).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
    expect(submitBtn).toBeInTheDocument()
    expect(backBtn).toBeInTheDocument()
  })
})
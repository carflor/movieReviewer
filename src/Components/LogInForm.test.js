import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../App'
import LogInForm from './LogInForm'
import { submitUserLogIn, getUserMovieRatings } from '../apiCalls'
import { BrowserRouter } from 'react-router-dom'
jest.mock('../apiCalls.js')

describe('LogInForm', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <LogInForm />
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('should render a log in form', () => {
    const { getByText, getByPlaceholderText } = render(
      <BrowserRouter>
        <LogInForm />
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

  it.skip('should render the logged in app page on log in submit', async () => {
    submitUserLogIn.mockResolvedValueOnce({
      user: {
        id: 1, 
        name: "Alan", 
        email: "alan@turing.io"
      }
    })

    getUserMovieRatings.mockResolvedValueOnce(
      {
        ratings: [
            {
                id: 646,
                user_id: 59,
                movie_id: 451184,
                rating: 2,
                created_at: "2020-07-08T19:39:07.616Z",
                updated_at: "2020-07-08T19:39:07.616Z"
            },
            {
                id: 958,
                user_id: 59,
                movie_id: 508439,
                rating: 2,
                created_at: "2020-07-10T01:11:16.764Z",
                updated_at: "2020-07-10T01:11:16.764Z"
            }
        ]
      }
    )

    const { getByText, getByRole, getByPlaceholderText } = render(
      <BrowserRouter>
        <LogInForm />
      </BrowserRouter>)
    // const submitBtn = screen.getByRole('button', { name: /Log In/})

    const emailInput = getByPlaceholderText('email')
    const passwordInput = getByPlaceholderText('password')
    const submitBtn = getByRole('button', {name: 'Log In'})

    // fire event
    const rightClick = { button: 2 }
    fireEvent.change(emailInput, {target: {value: 'alan@turing.io'}})
    fireEvent.change(passwordInput, {target: {value: '654321'}})
    fireEvent.click(submitBtn)
    const pageTitle = await waitFor(() => getByText('DOPE NOPE'))
    const welcomeMessage = await waitFor(() => getByText('Welcome Alan'));
    // expect that it returns obj
    expect(pageTitle).toBeInTheDocument()
    expect(welcomeMessage).toBeInTheDocument()
    // expect it renders homepage welcome message
  })
})
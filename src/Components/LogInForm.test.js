import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import LogInForm from './LogInForm'
import { submitUserLogIn } from '../apiCalls'
jest.mock('../apiCalls.js')

describe('LogInForm', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<LogInForm />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('should render a log in form', () => {
    const { getByText, getByPlaceholderText } = render(<LogInForm />)
    const title = getByText('Log In:')
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

  // it('should render the logged in app page on log in submit', async () => {
  //   submitUserLogIn.mockResolvedValueOnce({
  //     user: {
  //       id: 1, 
  //       name: "Alan", 
  //       email: "alan@turing.io"
  //     }
  //   })
  //   const { getByText } = render(<LogInForm />)
  //   const submitBtn = screen.getByRole('button', { name: /Log In/})
  //   // fire event
  //   fireEvent.click(screen.getByText('Log In'))
  //   const pageTitle = await getByText('DOPE NOPE')
  //   const welcomeMessage = await waitFor(() => getByText('Welcome Alan'));
  //   // expect that it returns obj
  //   expect(pageTitle).toBeInTheDocument()
  //   expect(welcomeMessage).toBeInTheDocument()
  //   // expect it renders homepage welcome message
  // })
})
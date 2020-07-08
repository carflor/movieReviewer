import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LogInForm from './LogInForm'

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

    expect(title).toBeInTheDocument()
    expect(emailInput).toBeInTheDocument()
    expect(passwordInput).toBeInTheDocument()
  })
})
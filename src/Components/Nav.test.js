import React from 'react';
import { render, fireEvent, waitFor, mockClear, getByPlaceholderText } from '@testing-library/react';
import '@testing-library/jest-dom';
import Nav from './Nav';


describe('Nav', () => { 
    const state = {
      movies: null,
      isLoading: false,
      error: null,
      isLoggedIn: false,
      logOutMethod: jest.fn(),
      logInMethod: jest.fn(),
      user: null,
      ratings: null
    }

  it('should render a title, a search, and a button', () => {
   const { getByText, getByRole, getByPlaceholderText } = render(<Nav 
      data={state}
    />)
    const navTitle = getByText('DOPE NOPE')
    const searchInput = getByPlaceholderText('Search Movies...')
    const logInButton = getByRole('button', {name: 'LOG IN'})
    expect(navTitle).toBeInTheDocument()
    expect(searchInput).toBeInTheDocument()
    expect(logInButton).toBeInTheDocument()
  });

  it('Should bring up the log in form when clicked', () => {
    const { getByText, getByRole} = render (<Nav
        data={state}
      />)

      const logInButton = getByRole('button')
      
      fireEvent.click(logInButton)

      expect(state.logInMethod).toBeCalledTimes(1)
    })
  })


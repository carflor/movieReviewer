import React from 'react';
import ReactDOM from 'react-dom';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import MoviePage from './MoviePage'
import { BrowserRouter } from 'react-router-dom'

describe('Body', () => {
  it('should render and display all the movie cards', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <MoviePage />
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  
  it('renders loading message', () => {
    const { getByText } = render(
      <BrowserRouter>
        <MoviePage /> 
      </BrowserRouter>);
    const linkElement = getByText(/Loading.../);
    expect(linkElement).toBeInTheDocument();
  });
})
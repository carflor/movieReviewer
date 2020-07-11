import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieCard from './MovieCard';
import { BrowserRouter } from 'react-router-dom';

describe('MovieCard', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
        <MovieCard/>
      </BrowserRouter>, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('should render a movie card', () => {
    const { getByText } = render(
      <BrowserRouter>
        <MovieCard
          id={1}
          average_rating={2}
        />
    </BrowserRouter>)
    const averageRating = getByText('2')
    const imageAltText = screen.getByAltText('film-poster')
    expect(averageRating).toBeInTheDocument()
    expect(imageAltText).toBeInTheDocument()
  })
})
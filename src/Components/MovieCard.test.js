import React from 'react';
import ReactDOM from 'react-dom';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieCard from './MovieCard'

describe('MovieCard', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MovieCard />, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('should render a movie card', () => {
    const { getByText } = render(<MovieCard 
      id={1}
      average_rating={2}
    />)

    const averageRating = getByText('2')
    const imageAltText = screen.getByAltText('film-poster')


    expect(averageRating).toBeInTheDocument()
    expect(imageAltText).toBeInTheDocument()
  })
})
import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, waitFor, getByAltText, mockClear, getByPlaceholderText, GetByRole, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import MovieCard from './MovieCard'

describe('MovieCard', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<MovieCard />, div);
    ReactDOM.unmountComponentAtNode(div);
  })


  it('should render a movie card', () => {
    const { getByText, getByRole, getByAltText } = render(<MovieCard 
        id={1}
        average_rating={2}
      />)

      const averageRating = getByText('AVG: 2')
      const imageAltText = screen.getByAltText('film-poster')


      expect(averageRating).toBeInTheDocument()
      expect(imageAltText).toBeInTheDocument()
  })

  it('should render a movie card', () => {
    const { getByText, getByRole, getByAltText } = render(<MovieCard 
        id={1}
        average_rating={2}
      />)

      const averageRating = getByText('AVG: 2')
      const imageAltText = screen.getByAltText('film-poster')


      expect(averageRating).toBeInTheDocument()
      expect(imageAltText).toBeInTheDocument()
  })
  
  // it('renders loading message', () => {
  //   const { getByText } = render(<MovieCard />);
  //   const linkElement = getByText(/Loading.../);
  //   expect(linkElement).toBeInTheDocument();
  //   });



})
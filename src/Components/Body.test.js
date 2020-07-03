import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, waitFor, getByAltText, mockClear, getByPlaceholderText, GetByRole, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Body from './Body'

describe('Body', () => {
  it('should render and display all the movie cards', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Body />, div);
    ReactDOM.unmountComponentAtNode(div);
  })
  
  it('renders loading message', () => {
    const { getByText } = render(<Body />);
    const linkElement = getByText(/Loading.../);
    expect(linkElement).toBeInTheDocument();
  });
})
import React from 'react';
import ReactDOM from 'react-dom';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import { getMovies } from '../apiCalls'
// jest.mock('../apiCalls.js')

describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <BrowserRouter>
          <App />
      </BrowserRouter> , div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders loading message', () => {
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>);
  const linkElement = getByText(/Loading.../);
  expect(linkElement).toBeInTheDocument();
  });

  it('Should be able to render the nav items', async () => {
    const { getByText, getByRole } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>) 
    const title = await waitFor(() => getByText('DOPE NOPE'))
    const logInButton = await waitFor(() => getByRole('button', {name: 'LOG IN'}))
    expect(title).toBeInTheDocument()
    expect(logInButton).toBeInTheDocument()
  })

  it('renders error message', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.reject('API is down'),
    })
  );
    const { getByText } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>);
    const linkElement = await waitFor(() => getByText(/Pardon the disturbance in the force.../));
    expect(linkElement).toBeInTheDocument();
  })
});
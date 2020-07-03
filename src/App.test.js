import React from 'react';
import ReactDOM from 'react-dom';
import { render, fireEvent, waitFor, mockClear } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import Nav from './Components/Nav'



describe('App', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('renders loading message', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Loading.../);
  expect(linkElement).toBeInTheDocument();
  });

  it('Should be able to bring up a log in form', async () => {
    //Set up
    const { getByText, getByRole} = render(<App />) 
    // Execute
    
    const title = await waitFor(() => getByText('DOPE NOPE'))
    const logInButton = await waitFor(() => getByRole('button', {name: 'LOG IN'}))
    //Assert
    expect(title).toBeInTheDocument()
    expect(logInButton).toBeInTheDocument()
  })

  it('renders error message', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
          json: () => Promise.reject('API is down'),
    })
  );
    const { getByText } = render(<App />);
    const linkElement = await waitFor(() => getByText(/Pardon the disturbance.../));
    expect(linkElement).toBeInTheDocument();
  })
});
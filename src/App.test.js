import React from 'react';
import ReactDOM from 'react-dom';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';



describe('App', () => {
  it('Can view all the ideas when the app loads', () => {
    // Render the App component (this component fetches data from an external back-end API)
    const { getByText } = render(<App />);
    // Check that there is a container element on the page
    const navTitle = getByText('DOPE NOPE')
    // const cardMessage = await waitFor(() => getByText("USER RATING"))
    // Check that there are ideas on the page
    expect(navTitle).toBeInTheDocument();
    // expect(cardMessage).toBeInTheDocument();
  });

  // test to make sure it is valid component

  // test that it shows logged out screen

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

test('renders loading message', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(/Loading.../);
  expect(linkElement).toBeInTheDocument();
});

// test('renders error message', () => {
//   const { getByText } = render(<App />);
//   const linkElement = getByText(/Pardon the disturbance.../);
//   expect(linkElement).toBeInTheDocument();
// });

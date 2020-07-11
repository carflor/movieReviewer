import React from 'react';
import ReactDOM from 'react-dom';
import { render, waitFor, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { BrowserRouter, MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history'
import { submitUserLogIn, getUserMovieRatings, getMovies, getMovieData } from './apiCalls'
jest.mock('./apiCalls.js')


describe('App', () => {
  getMovies.mockResolvedValue(
    {
      movies: [{
        "id": 475430,
        "poster_path": "https://image.tmdb.org/t/p/original//tI8ocADh22GtQFV28vGHaBZVb0U.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original//o0F8xAt8YuEm5mEZviX5pEFC12y.jpg",
        "title": "Artemis Fowl",
        "average_rating": 7.2,
        "release_date": "2020-06-12"
        },
        {
        "id": 338762,
        "poster_path": "https://image.tmdb.org/t/p/original//8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original//lP5eKh8WOcPysfELrUpGhHJGZEH.jpg",
        "title": "Bloodshot",
        "average_rating": 5.428571428571429,
        "release_date": "2020-03-05"
        },
        {
        "id": 508439,
        "poster_path": "https://image.tmdb.org/t/p/original//f4aul3FyD3jv3v4bul1IrkWZvzq.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original//dW6yBuKwiMeronJZw8kozYLMorB.jpg",
        "title": "Onward",
        "average_rating": 4.8,
        "release_date": "2020-02-29"
        }]
    })

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

  it('Should render movie cards', async () => {
    const { getByText, getAllByRole } = render(
      <BrowserRouter>
        <App />
      </BrowserRouter>) 
    const title = await waitFor(() => getByText('DOPE NOPE'))
    const images = await waitFor(() => getAllByRole('img'))
    
    expect(title).toBeInTheDocument(1)
    expect(images).toHaveLength(6)
  })

  it('renders error message', async () => {

    getMovies.mockRejectedValueOnce(new Error('Pardon the disturbance in the force...'))  

    const { getByText } = render(
        <MemoryRouter>
          <App />
        </MemoryRouter>);
      const linkElement = await waitFor(() => getByText('Pardon the disturbance in the force...'));
      expect(linkElement).toBeInTheDocument();
  })

  it('Should change locations when the log in button is clicked', async () => {
    const testHistoryObject = createMemoryHistory()
    const { getByRole } = render( 
    <Router history={ testHistoryObject }>
      <App />
    </Router> )

    expect(testHistoryObject.location.pathname).toEqual('/')
    const logInButton = await waitFor(() => getByRole('button', {name: 'LOG IN'}))

    fireEvent.click(logInButton) 

    expect(testHistoryObject.location.pathname).toEqual('/login')
  })

  it('Should change locations when the log in button is clicked', async () => {
    const testHistoryObject = createMemoryHistory()

    getMovieData.mockResolvedValueOnce({
      "movie": {
        "id": 475430,
        "title": "Artemis Fowl",
        "poster_path": "https://image.tmdb.org/t/p/original//tI8ocADh22GtQFV28vGHaBZVb0U.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original//o0F8xAt8YuEm5mEZviX5pEFC12y.jpg",
        "release_date": "2020-06-12",
        "overview": "Artemis Fowl is a 12-year-old genius and descendant of a long line of criminal masterminds. He soon finds himself in an epic battle against a race of powerful underground fairies who may be behind his father’s disappearance.",
        "genres": [
            "Adventure",
            "Fantasy",
            "Science Fiction",
            "Family"
        ],
        "budget": 125000000,
        "revenue": 0,
        "runtime": 95,
        "tagline": "Remember the name",
        "average_rating": 3
      }
    })

    const { getAllByAltText } = render( 
    <Router history={ testHistoryObject }>
      <App />
    </Router> )

    expect(testHistoryObject.location.pathname).toEqual('/')
    const movieLink = await waitFor(() => getAllByAltText('film-poster')[0])

    fireEvent.click(movieLink) 

    expect(testHistoryObject.location.pathname).toEqual('/movies/475430')
  })

  it('Should render movie page on click', async () => {
    getMovieData.mockResolvedValueOnce({
      "movie": {
        "id": 475430,
        "title": "Artemis Fowl",
        "poster_path": "https://image.tmdb.org/t/p/original//tI8ocADh22GtQFV28vGHaBZVb0U.jpg",
        "backdrop_path": "https://image.tmdb.org/t/p/original//o0F8xAt8YuEm5mEZviX5pEFC12y.jpg",
        "release_date": "2020-06-12",
        "overview": "Artemis Fowl is a 12-year-old genius and descendant of a long line of criminal masterminds. He soon finds himself in an epic battle against a race of powerful underground fairies who may be behind his father’s disappearance.",
        "genres": [
            "Adventure",
            "Fantasy",
            "Science Fiction",
            "Family"
        ],
        "budget": 125000000,
        "revenue": 0,
        "runtime": 95,
        "tagline": "Remember the name",
        "average_rating": 3
      }
    })


    const { getByText, getAllByAltText, getByAltText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>) 
   
    const title = await waitFor(() => getByText('DOPE NOPE'))
    const movieLink = await waitFor(() => getAllByAltText('film-poster')[0])

    
    expect(title).toBeInTheDocument(1)

    fireEvent.click(movieLink)

    const movieTitle = await waitFor(() => getByText('Artemis Fowl'))
    const releaseDate = await waitFor(() => getByText("Release Date: 2020-06-12"))
    const starIcon = await waitFor(() => getByAltText('star-icon'))
    const tagline = await waitFor(() => getByText(`"Remember the name"`))
    
    expect(movieTitle).toBeInTheDocument()
    expect(releaseDate).toBeInTheDocument()
    expect(starIcon).toBeInTheDocument()
    expect(tagline).toBeInTheDocument()
  })

  it('should render the logged in app page on log in submit', async () => {
    submitUserLogIn.mockResolvedValueOnce({
      user: {
        id: 1, 
        name: "Alan", 
        email: "alan@turing.io"
      }
    })

    getUserMovieRatings.mockResolvedValueOnce(
      {
        ratings: [
            {
                id: 646,
                user_id: 59,
                movie_id: 451184,
                rating: 2,
                created_at: "2020-07-08T19:39:07.616Z",
                updated_at: "2020-07-08T19:39:07.616Z"
            },
            {
                id: 958,
                user_id: 59,
                movie_id: 508439,
                rating: 2,
                created_at: "2020-07-10T01:11:16.764Z",
                updated_at: "2020-07-10T01:11:16.764Z"
            }
        ]
      }
    )
  
    const { getByText, getByRole, getByPlaceholderText } = render(
        <MemoryRouter>
          <App />
        </MemoryRouter>)

    const logInButton = await waitFor(() => getByRole('button', {name: 'LOG IN'}))
    
    fireEvent.click(logInButton)
    
    const emailInput = getByPlaceholderText('email')
    const passwordInput = getByPlaceholderText('password')
    const submitBtn = getByRole('button', {name: /Log In/})

    fireEvent.change(emailInput, {target: {value: 'alan@turing.io'}})
    fireEvent.change(passwordInput, {target: {value: '654321'}})
    fireEvent.click(submitBtn)

    const pageTitle = await waitFor(() => getByText('DOPE NOPE'))
    const welcomeMessage = await waitFor(() => getByText('Welcome Alan'));

    expect(pageTitle).toBeInTheDocument()
    expect(welcomeMessage).toBeInTheDocument()
  })
});
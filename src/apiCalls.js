const url = 'https://rancid-tomatillos.herokuapp.com/api/v2'
const microUrl = 'http://localhost:3001/api/v1'

const getMovies = () => {
  return fetch(`${url}/movies`)
    .then(response => {
      if(response.ok) {
        return response.json() 
      } else {
        throw new Error('Pardon the disturbance in the force...')
      }
    })
}

const submitUserLogIn = (email, password) => {
  return fetch(`${url}/login`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: email,
        password: password
    })
  })
  .then(response => response.json())
}

const getMovieData = (moviePageID) => {
  return fetch(`${url}/movies/${moviePageID}`)
  .then(response => response.json())
}

const getUserMovieRatings = (user) => {
  return fetch(`${url}/users/${user}/ratings`) 
  .then(response => response.json())
}

const getMovieComments = (movieId) => {
  console.log(movieId, 'what the hell')
  return fetch(`http://localhost:3001/api/v1/movies/${movieId}/comments`)
      .then(response => response.json())
}

const deleteUserRating = async (userId, ratingId) => {
  await fetch(`${url}/users/${userId}/ratings/${ratingId}`, {
    method: 'DELETE',
  })
}

const submitRating = async (userId, moviePageID, value) => {
  const response = await fetch(`${url}/users/${userId}/ratings`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        movie_id: parseInt(moviePageID),
        rating: parseInt(value)
    })
  })
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  } else {
    const data = await response.json()
    return data
  }
}

const submitComment = async (commentPost) => {
  const response = await fetch(`${microUrl}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(commentPost)
  })
  return await response.json()
}

const getTrailer = (movieId) => {
  return fetch(`${url}/movies/${movieId}/videos`)
    .then(response => response.json())
}

export { getMovies, getUserMovieRatings, submitUserLogIn, getMovieData, deleteUserRating, submitRating, submitComment, getMovieComments, getTrailer }
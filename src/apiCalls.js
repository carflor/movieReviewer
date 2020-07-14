const url = 'https://rancid-tomatillos.herokuapp.com/api/v2'
const microserviceUrl = `http://localhost:3001/api/v1`

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

const addOrRemoveAFavorite = (userId, movieId) => {
  return fetch(`${microserviceUrl}/favoriteMovies`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      userId: userId,
      movieId: movieId
    })
  })
  .then(response => response.json())
}

const getUserFavorites = (userId) => {
  return fetch(`${microserviceUrl}/favoriteMovies/${userId}`)
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

export { getMovies, getUserMovieRatings, submitUserLogIn, getMovieData, deleteUserRating, submitRating, addOrRemoveAFavorite, getUserFavorites }
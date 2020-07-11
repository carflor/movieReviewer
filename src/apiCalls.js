const url = 'https://rancid-tomatillos.herokuapp.com/api/v2'

const getMovies = () => {
  return fetch(`${url}/movies`)
    .then(response => {
      if(response.ok) {
        return response.json() 
      } else {
        throw new Error('Pardon the disturbance in the force...')
      }})
}

const submitUserLogIn = (email, password) => {
  return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/login', {
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
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${moviePageID}`)
  .then(response => response.json())
}

const getUserMovieRatings = (user) => {
  return fetch(`${url}/users/${user}/ratings`) 
  .then(response => response.json())
}

const deleteUserRating = async (userId, ratingId) => {
  await fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${userId}/ratings/${ratingId}`, {
    method: 'DELETE',
  })
}

const submitRating = async (userId, moviePageID, value) => {
  const response = await fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/users/${userId}/ratings`, {
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

export { getMovies, getUserMovieRatings, submitUserLogIn, getMovieData, deleteUserRating, submitRating }
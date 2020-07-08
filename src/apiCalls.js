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

const getUserMovieRatings = (user) => {
  return fetch(`${url}/users/${user}/ratings`) 
  .then(response => response.json())
}



export { getMovies, getUserMovieRatings }
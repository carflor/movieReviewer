import React from 'react';
import './Body.css'

const Body = () => {
  // create a variable to contain the mapping of the cards and interpolate in section

  return (
    <section className="movie-container">
      <section className="movie-card">
        {/* cards should exist here */}
        <img src="https://image.tmdb.org/t/p/original//8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg" className="movie-poster" alt="film-poster" />
        <section className="rating-box">
          <section>AVG RATING</section>
          <section>USER RATING</section>
        </section>

      </section>

      <section className="movie-card">
        {/* cards should exist here */}
        <img src="https://image.tmdb.org/t/p/original//8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg" className="movie-poster" alt="film-poster" />
        <section className="rating-box">
          <section>AVG RATING</section>
          <section>USER RATING</section>
        </section>

      </section>

      <section className="movie-card">
        {/* cards should exist here */}
        <img src="https://image.tmdb.org/t/p/original//8WUVHemHFH2ZIP6NWkwlHWsyrEL.jpg" className="movie-poster" alt="film-poster" />
        <section className="rating-box">
          <section>AVG RATING</section>
          <section>USER RATING</section>
        </section>

      </section>
    </section>
  )

}

export default Body;
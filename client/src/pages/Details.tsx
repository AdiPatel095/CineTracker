import React, { useState, useEffect } from 'react';
import '../styles/details.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getDetails } from '../api/detailsAPI';
import { CardDetails } from '../interfaces/CardDetails';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Jumbotron: React.FC<{ id: number }> = ({ id }) => {
  
  const poster_url = "https://image.tmdb.org/t/p/original";
  const [cardDetails, setDetails] = useState<CardDetails>({});

  useEffect(() => {
    getDetails({ MovieID : id })
      .then((data) => {
        console.log(data+"data");
        setDetails(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [id]);


  return (
<div 
  className="parent-container" 
  style={{
    backgroundImage: `url(${poster_url + cardDetails.BackdropLink})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: 'calc(100vh - 100px)', // Adjust for header/footer height
    width: '100%',  // Full page width
    position: 'relative',  // Ensures the background stays within the bounds
    margin: 0,  // Remove any margin
    padding: 0, // Remove any padding
    boxSizing: 'border-box', // Prevents padding/border from affecting the width
  }}
>
  <div className="d-flex justify-content-between" style={{ width: '100%' }}>
    {/* Left side for movie details */}
    <div className="left-side" style={{ flex: 1, paddingRight: '2rem' }}>
      <div className="black-overlay-box">
        <div className="details-holder">
          <div className="movie-title" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            {cardDetails?.Title}
          </div>
          <div className="movie-overview" style={{ fontStyle: 'italic', marginTop: '1rem' }}>
            {cardDetails?.Overview}
          </div>
          <div className="movie-year" style={{ marginTop: '1rem', fontSize: '1.1rem' }}>
            {cardDetails?.Year}
          </div>
          <button className="btn btn-outline-secondary button-spacing" type="button">
            Add To Watchlist
          </button>
          <button className="btn btn-outline-secondary" type="button">
            Watch already
          </button>
        </div>
      </div>
    </div>

    {/* Right side for reviews */}
    <div className="right-side" style={{ flex: 1, padding: '1rem' }}>
      <div className="review-container">
        <div className="details-holder">
          <div>
            <h2>Reviews</h2>
            <p className="italic-text">
              "I’m a big fan of Superman, and I’ve been waiting for this movie for so long. After just watching the trailer, I can already tell that this movie is going to be a hit. I’m so excited to watch it!"
            </p>
            <h4><strong>Stanley B.</strong></h4>
            <button className="btn btn-outline-secondary" type="button">
              NEXT
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>




  );
};

export default Jumbotron;

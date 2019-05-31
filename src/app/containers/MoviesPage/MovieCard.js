import React from 'react';
import PropTypes from 'prop-types';

import { Card } from 'react-bootstrap';

const MovieCard = ({ movie }) => {
  const finalImagePath = movie.poster_path || movie.background_path;
  const imgUrl = `https://image.tmdb.org/t/p/w500${finalImagePath}`;

  return (
    <Card>
      <Card.Img height="500px" variant="left" src={imgUrl} />
      <Card.Body>
        <Card.Text>{movie.title}</Card.Text>
      </Card.Body>
    </Card>
  );
};

MovieCard.propTypes = {
  movie: PropTypes.object,
};

export default MovieCard;

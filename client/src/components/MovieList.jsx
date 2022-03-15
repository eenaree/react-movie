import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import MovieGridCard from './MovieGridCard';

const MovieList = ({ movies }) => {
  return (
    <div>
      <Row gutter={[24, 24]}>
        {movies.map(movie => (
          <Col xs={24} md={8} lg={6} key={movie.id}>
            <MovieGridCard movie={movie} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MovieList;

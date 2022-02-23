import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const MovieContext = createContext({
  movies: [],
  setMovies: () => {},
});

const MovieContextProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);

  return (
    <MovieContext.Provider value={{ movies, setMovies }}>
      {children}
    </MovieContext.Provider>
  );
};

MovieContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default MovieContextProvider;

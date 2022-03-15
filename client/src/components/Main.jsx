import React, { useState } from 'react';
import SearchForm from './SearchForm';
import PopularMovies from './PopularMovies';
import { useLocation } from 'react-router-dom';
import SearchResult from './SearchResult';

const Main = () => {
  const location = useLocation();
  const [movies, setMovies] = useState([]);

  return (
    <>
      <SearchForm setMovies={setMovies} />
      {location.pathname !== '/search' ? (
        <PopularMovies movies={movies} setMovies={setMovies} />
      ) : (
        <SearchResult movies={movies} />
      )}
    </>
  );
};

export default Main;

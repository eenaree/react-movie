import React, { useEffect, useState } from 'react';
import movieAPI from '../api/movie';
import MovieList from './MovieList';

const PopularMovies = () => {
  const [movies, setMovies] = useState([]);

  async function getPopularMovies() {
    try {
      const { data } = await movieAPI.getPopularMovies();
      console.log(data.results);
      setMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getPopularMovies();
  }, []);

  return <>{movies && <MovieList movies={movies} />}</>;
};

export default PopularMovies;

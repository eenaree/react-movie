import React, { useContext, useEffect } from 'react';
import movieAPI from '../api/movie';
import MovieList from './MovieList';
import { MovieContext } from '../context/MovieContext';

const PopularMovies = () => {
  const { movies, setMovies } = useContext(MovieContext);

  useEffect(() => {
    async function getPopularMovies() {
      try {
        const { data } = await movieAPI.getPopularMovies();
        console.log(data.results);
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    }
    getPopularMovies();
  }, []);

  return <>{movies && <MovieList movies={movies} />}</>;
};

export default PopularMovies;

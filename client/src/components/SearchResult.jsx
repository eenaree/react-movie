import React, { useContext, useEffect } from 'react';
import { css } from '@emotion/react';
import MovieList from './MovieList';
import { MovieContext } from '../context/MovieContext';
import movieAPI from '../api/movie';

const SearchResult = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const keyword = searchParams.get('keyword');
  const { movies, setMovies } = useContext(MovieContext);

  useEffect(() => {
    async function searchMovie() {
      try {
        const { data } = await movieAPI.searchMovie(keyword);
        !data.results.length ? setMovies([]) : setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    }

    searchMovie();
  }, [searchParams, keyword]);

  return (
    <>
      {keyword && (
        <div>
          <p
            css={css`
              padding-top: 50px;
              text-align: center;
              font-size: 20px;
            `}
          >
            <strong>{keyword}</strong>(으)로 검색한 결과
          </p>
          {movies.length > 0 ? (
            <MovieList movies={movies} />
          ) : (
            <div
              css={css`
                text-align: center;
              `}
            >
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchResult;

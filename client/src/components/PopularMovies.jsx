import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { PlusCircleOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import movieAPI from '../api/movie';
import MovieList from './MovieList';

const PopularMovies = ({ movies, setMovies }) => {
  const [pageCount, setPageCount] = useState(1);

  async function getMorePopularMovies() {
    try {
      const { data } = await movieAPI.getPopularMovies(pageCount + 1);
      setMovies(movies.concat(data.results));
    } catch (error) {
      console.error(error);
    }
  }

  function onClickMoreBtn() {
    setPageCount(prevCount => prevCount + 1);
    getMorePopularMovies();
  }

  useEffect(() => {
    async function getPopularMovies() {
      try {
        const { data } = await movieAPI.getPopularMovies();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    }
    getPopularMovies();
  }, []);

  return (
    <>
      {movies.length > 0 && (
        <div
          css={css`
            padding: 50px;
          `}
        >
          <MovieList movies={movies} />
          <div
            css={css`
              text-align: center;
              margin-top: 25px;
            `}
          >
            <button
              onClick={onClickMoreBtn}
              css={css`
                background: none;
                border: none;
              `}
            >
              <PlusCircleOutlined
                style={{ fontSize: '30px', color: '#08c', cursor: 'pointer' }}
              />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

PopularMovies.propTypes = {
  movies: PropTypes.array.isRequired,
  setMovies: PropTypes.func.isRequired,
};

export default PopularMovies;

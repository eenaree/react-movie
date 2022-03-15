import React from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { css } from '@emotion/react';
import MovieList from './MovieList';

const SearchResult = ({ movies }) => {
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const keyword = searchParams.get('keyword');

  return (
    <>
      {keyword && (
        <div
          css={css`
            padding: 0 50px 50px 50px;
          `}
        >
          <p
            css={css`
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

SearchResult.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default SearchResult;

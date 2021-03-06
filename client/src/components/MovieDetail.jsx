import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import movieAPI from '../api/movie';
import { IMAGE_BASE_URL } from '../constants';
import MovieInfo from './MovieInfo';
import MovieCast from './MovieCast';
import FavoriteButton from './FavoriteButton';
import MovieComments from './MovieComments';

const MovieTitle = styled.h2`
  position: relative;
  height: 570px;
  line-height: 570px;
  font-size: 35px;
  font-weight: 700;
  text-align: center;
  color: #000;
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    background: url(${props => props.background}) no-repeat center;
    background-size: cover;
    width: 100%;
    height: 100%;
    opacity: 0.5;
  }
`;

const MovieDetail = () => {
  const params = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function getMovie() {
      try {
        const { data } = await movieAPI.getMovie(params.id);
        setMovie(data);
      } catch (error) {
        console.error(error);
      }
    }

    getMovie();
  }, [params.id]);

  return (
    <>
      {movie && (
        <>
          <MovieTitle
            background={
              movie.backdrop_path &&
              IMAGE_BASE_URL + 'original' + movie.backdrop_path
            }
          >
            {movie.title}
          </MovieTitle>
          <div
            css={css`
              position: relative;
              padding: 50px;
            `}
          >
            <FavoriteButton
              movie={movie}
              css={css`
                position: absolute;
                top: 20px;
                right: 50px;
              `}
            />
            <MovieInfo movie={movie} />
            <MovieCast />
            <MovieComments movie={movie} />
          </div>
        </>
      )}
    </>
  );
};

export default MovieDetail;

import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import GridCard from './GridCard';
import { IMAGE_BASE_URL } from '../constants';

const MovieGridCard = ({ movie }) => {
  const { id, title, release_date, vote_average, poster_path } = movie;
  const background = poster_path && IMAGE_BASE_URL + 'w500' + poster_path;

  return (
    <Link to={`/movie/${id}`} title={title}>
      <GridCard
        background={background}
        css={css`
          height: 400px;
          &:after {
            border-radius: 10px;
            background-position: center;
            background-size: cover;
            opacity: 0.9;
          }
        `}
      >
        <div
          css={css`
            z-index: 1;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            padding: 20px 20px 10px 20px;
            background-color: rgba(0, 0, 0, 0.7);
            color: #fff;
            border-radius: 10px;
          `}
        >
          <h3
            css={css`
              color: #fff;
              font-size: 20px;
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
            `}
          >
            {title}
          </h3>
          <p>{release_date}</p>
          <p
            css={css`
              width: 45px;
              height: 45px;
              padding: 10px;
              border: 2px solid yellow;
              border-radius: 22px;
              color: yellow;
              text-align: center;
            `}
          >
            {vote_average}
          </p>
        </div>
      </GridCard>
    </Link>
  );
};

MovieGridCard.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieGridCard;

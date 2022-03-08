import React from 'react';
import GridCard from './GridCard';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { IMAGE_BASE_URL } from '../constants';

const CastGridCard = ({ cast }) => {
  const { original_name, character, profile_path } = cast;

  return (
    <GridCard
      background={profile_path && IMAGE_BASE_URL + 'w200' + profile_path}
      css={css`
        height: 300px;
        &:after {
          background-position: center;
          background-size: cover;
          border-radius: 10px;
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
        <p>
          <strong>{original_name}</strong>
        </p>
        <p
          css={css`
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          `}
        >
          {character}
        </p>
      </div>
    </GridCard>
  );
};

CastGridCard.propTypes = {
  cast: PropTypes.object.isRequired,
};

export default CastGridCard;

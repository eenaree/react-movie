import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Row, Col } from 'antd';
import CastGridCard from './CastGridCard';

const MovieCast = ({ casts }) => {
  return (
    <div
      css={css`
        width: calc(100% - 100px);
        margin: 0 50px;
      `}
    >
      <h3
        css={css`
          font-size: 20px;
          font-weight: 700;
        `}
      >
        주요 출연진
      </h3>
      <Row gutter={[24, 24]}>
        {casts.map(cast => (
          <Col key={cast.cast_id} xs={12} md={8} lg={6}>
            <CastGridCard cast={cast} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

MovieCast.propTypes = {
  casts: PropTypes.array.isRequired,
};

export default MovieCast;

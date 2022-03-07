import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Row, Col } from 'antd';
import CastGridCard from './CastGridCard';
import movieAPI from '../api/movie';
import { useParams } from 'react-router-dom';

const MovieCast = () => {
  const params = useParams();
  const [casts, setCasts] = useState(null);

  useEffect(() => {
    async function getMovieCredits() {
      try {
        const { data } = await movieAPI.getMovieCredits(params.id);
        const mainCasts = data.cast.slice(0, 8);
        setCasts(mainCasts);
      } catch (error) {
        console.error(error);
      }
    }

    getMovieCredits();
  }, [params.id]);

  return (
    <>
      {casts && (
        <div>
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
      )}
    </>
  );
};

export default MovieCast;

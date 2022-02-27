import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

const tableStyle = css`
  margin: 30px 0 50px;
  border: 1px solid #000;
  tr,
  td {
    border: 1px solid #000;
    padding: 10px 0;
  }
  th {
    width: 10%;
    background-color: #eee;
  }
  td {
    padding: 10px;
  }
`;

const MovieInfo = ({ movie }) => {
  const { genres, vote_average, runtime, release_date, overview } = movie;

  return (
    <table css={tableStyle}>
      <tbody>
        <tr>
          <th>장르</th>
          <td>
            {genres.map((genre, index, arr) =>
              index === arr.length - 1 ? `${genre.name}` : `${genre.name}, `
            )}
          </td>
          <th>상영시간</th>
          <td>{runtime}분</td>
        </tr>
        <tr>
          <th>개봉일</th>
          <td>{release_date}</td>
          <th>평점</th>
          <td>{vote_average}</td>
        </tr>
        <tr>
          <th>줄거리</th>
          <td colSpan="3">{overview}</td>
        </tr>
      </tbody>
    </table>
  );
};

MovieInfo.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieInfo;

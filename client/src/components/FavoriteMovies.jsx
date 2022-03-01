import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Table, Button } from 'antd';
import { Link } from 'react-router-dom';
import movieAPI from '../api/movie';

const FavoriteMovies = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const columns = [
    {
      title: 'No',
      dataIndex: 'key',
      align: 'center',
    },
    {
      title: '제목',
      dataIndex: 'title',
      align: 'center',
      render: (text, record) => (
        <Link to={`/movie/${record.movieId}`}>{text}</Link>
      ),
    },
    {
      title: '개봉일',
      dataIndex: 'release_date',
      align: 'center',
    },
    {
      title: '상영시간',
      dataIndex: 'runtime',
      align: 'center',
      render: text => `${text}분`,
    },
    {
      dataIndex: 'action',
      align: 'center',
      render: (text, record) => (
        <Button
          danger
          onClick={() => removeFavoriteMovie({ movieId: record.movieId })}
        >
          삭제
        </Button>
      ),
    },
  ];

  function addIndexKeyToMovies(movies) {
    return movies.map((movie, index) => ({ ...movie, key: index + 1 }));
  }

  async function removeFavoriteMovie(movieId) {
    try {
      const { data } = await movieAPI.removeFavoriteMovie(movieId);
      const favoriteMoviesWithKey = addIndexKeyToMovies(data.favoriteMovies);
      setFavoriteMovies(favoriteMoviesWithKey);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    async function getFavoriteMovies() {
      try {
        const { data } = await movieAPI.getFavoriteMovies();
        const favoriteMoviesWithKey = addIndexKeyToMovies(data.favoriteMovies);
        setFavoriteMovies(favoriteMoviesWithKey);
      } catch (error) {
        console.error(error);
      }
    }

    getFavoriteMovies();
  }, []);

  return (
    <div
      css={css`
        padding: 50px;
      `}
    >
      <h3
        css={css`
          margin-bottom: 30px;
          font-weight: 700;
          font-size: 25px;
        `}
      >
        즐겨찾기
      </h3>
      <Table columns={columns} dataSource={favoriteMovies} />
    </div>
  );
};

export default FavoriteMovies;

import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import movieAPI from '../api/movie';

const FavoriteButton = ({ movie, ...props }) => {
  const [isFavored, setIsFavored] = useState(false);
  const navigate = useNavigate();
  const movieInfo = {
    movieId: movie.id,
    title: movie.title,
    release_date: movie.release_date,
    runtime: movie.runtime,
  };

  async function addFavoriteMovie() {
    try {
      await movieAPI.addFavoriteMovie(movieInfo);
      setIsFavored(true);
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data.message);
        navigate('/login');
      }
    }
  }

  async function removeFavoriteMovie() {
    try {
      await movieAPI.removeFavoriteMovie(movieInfo);
      setIsFavored(false);
    } catch (error) {
      console.error(error);
    }
  }

  function onClick() {
    isFavored ? removeFavoriteMovie() : addFavoriteMovie();
  }

  useEffect(() => {
    async function getFavoriteMovieStatus() {
      try {
        const { data } = await movieAPI.getFavoriteMovieStatus(movie.id);
        data.success ? setIsFavored(true) : setIsFavored(false);
      } catch (error) {
        console.error(error);
      }
    }

    getFavoriteMovieStatus();
  }, [movie.id]);

  return (
    <Button onClick={onClick} {...props}>
      {isFavored ? '즐겨찾기 추가됨' : '즐겨찾기 추가'}
    </Button>
  );
};

FavoriteButton.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default FavoriteButton;
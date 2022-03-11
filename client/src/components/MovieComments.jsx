import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { useParams } from 'react-router-dom';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import movieAPI from '../api/movie';

const MovieComments = ({ movie }) => {
  const params = useParams();
  const movieInfo = {
    movieId: movie.id,
    title: movie.title,
    runtime: movie.runtime,
    release_date: movie.release_date,
  };
  const [{ comments }, dispatch] = useReducer(commentReducer, { comments: [] });

  function commentReducer(state, action) {
    switch (action.type) {
      case 'GET_COMMENTS':
        return {
          ...state,
          comments: action.comments,
        };
      case 'ADD_COMMENT':
        return {
          ...state,
          comments: [action.comment, ...state.comments],
        };
      case 'REMOVE_COMMENT':
        return {
          ...state,
          comments: state.comments.filter(comment => comment.id !== action.id),
        };
    }
  }

  async function addComment(comment) {
    try {
      const movieInfoWithComment = { ...movieInfo, comment };
      const { data } = await movieAPI.addComment(movieInfoWithComment);
      if (data.success) {
        dispatch({ type: 'ADD_COMMENT', comment: data.comment });
        return true;
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  }

  async function removeComment(commentId) {
    try {
      const { data } = await movieAPI.removeComment({ commentId });
      if (data.success) {
        dispatch({ type: 'REMOVE_COMMENT', id: commentId });
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  }

  useEffect(() => {
    async function getComments() {
      try {
        const { data } = await movieAPI.getComments(params.id);
        if (data.success) {
          dispatch({ type: 'GET_COMMENTS', comments: data.comments });
        }
      } catch (error) {
        console.error(error);
      }
    }

    getComments();
  }, [params.id]);

  return (
    <div>
      <h3
        css={css`
          font-size: 20px;
          font-weight: 700;
          margin-top: 30px;
        `}
      >
        {comments.length > 0 ? `${comments.length}개의 댓글` : '댓글'}
      </h3>
      <CommentForm addComment={addComment} />
      {comments.length > 0 && (
        <CommentList comments={comments} removeComment={removeComment} />
      )}
    </div>
  );
};

MovieComments.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieComments;

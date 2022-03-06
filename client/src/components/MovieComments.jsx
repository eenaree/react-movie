import React, { useEffect, useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Input, Button } from 'antd';
import { useParams } from 'react-router-dom';
import Comment from './Comment';
import movieAPI from '../api/movie';

const MovieComments = ({ movie }) => {
  const params = useParams();
  const [comment, setComment] = useState('');
  const onChangeComment = e => setComment(e.target.value);
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
          comments: state.comments.concat(action.comment),
        };
      case 'REMOVE_COMMENT':
        return {
          ...state,
          comments: state.comments.filter(comment => comment.id !== action.id),
        };
    }
  }

  async function addComment() {
    try {
      const movieInfoWithComment = { ...movieInfo, comment };
      const { data } = await movieAPI.addComment(movieInfoWithComment);
      if (data.success) {
        dispatch({ type: 'ADD_COMMENT', comment: data.comment });
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    addComment();
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
      <form
        onSubmit={onSubmit}
        css={css`
          position: relative;
        `}
      >
        <Input
          value={comment}
          onChange={onChangeComment}
          placeholder="댓글을 입력해주세요"
        />
        <Button
          type="primary"
          htmlType="submit"
          css={css`
            position: absolute;
            top: 0;
            right: 0;
          `}
        >
          등록
        </Button>
      </form>
      {comments.length > 0 && (
        <div>
          {comments.map(comment => (
            <Comment key={comment.id} comment={comment} dispatch={dispatch} />
          ))}
        </div>
      )}
    </div>
  );
};

MovieComments.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MovieComments;

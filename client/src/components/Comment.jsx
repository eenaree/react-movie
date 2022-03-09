import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Button } from 'antd';
import movieAPI from '../api/movie';
import { UserContext } from '../context/UserContext';
import LikeButton from './LikeButton';

const Comment = ({ comment, dispatch }) => {
  const { loggedUser } = useContext(UserContext);

  async function removeComment() {
    try {
      const { data } = await movieAPI.removeComment({ commentId: comment.id });
      if (data.success) {
        dispatch({ type: 'REMOVE_COMMENT', id: comment.id });
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  }

  return (
    <div
      css={css`
        position: relative;
        margin-top: 15px;
        padding: 20px;
        border: 1px solid #eee;
        .nickname {
          font-weight: 700;
        }
        .createdAt {
          margin-left: 15px;
        }
        .comment {
          margin: 10px 0;
        }
      `}
    >
      <span className="nickname">{comment.User.nickname}</span>
      <span className="createdAt">{comment.createdAt}</span>
      <p className="comment">{comment.comment}</p>
      {loggedUser?.nickname === comment.User.nickname && (
        <Button
          onClick={removeComment}
          type="primary"
          danger
          css={css`
            position: absolute;
            top: 0;
            right: 0;
          `}
        >
          삭제
        </Button>
      )}
      <LikeButton
        comment={comment}
        css={css`
          position: absolute;
          right: 0;
          bottom: 0;
        `}
      />
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default Comment;

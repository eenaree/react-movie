import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Button } from 'antd';
import { UserContext } from '../context/UserContext';
import LikeButton from './LikeButton';

const Comment = ({ comment, removeComment }) => {
  const { loggedUser } = useContext(UserContext);

  function removeHandler() {
    removeComment(comment.id);
  }

  return (
    <div
      css={css`
        position: relative;
        padding: 20px;
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
          onClick={removeHandler}
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
  removeComment: PropTypes.func.isRequired,
};

export default Comment;

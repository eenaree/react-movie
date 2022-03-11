import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import Comment from './Comment';
import ReplyCommentList from './ReplyCommentList';

const CommentList = ({ comments, removeComment }) => {
  return (
    <div>
      {comments.map(comment => (
        <div
          key={comment.id}
          css={css`
            border: 1px solid #eee;
            margin-top: 15px;
          `}
        >
          <Comment comment={comment} removeComment={removeComment} />
          <ReplyCommentList replies={comment.replies} commentId={comment.id} />
        </div>
      ))}
    </div>
  );
};

CommentList.propTypes = {
  comments: PropTypes.array.isRequired,
  removeComment: PropTypes.func.isRequired,
};

export default CommentList;

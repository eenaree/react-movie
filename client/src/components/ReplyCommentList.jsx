import React, { useReducer, useState } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { css } from '@emotion/react';
import Comment from './Comment';
import CommentForm from './CommentForm';
import movieAPI from '../api/movie';

const ReplyCommentList = ({ replies, commentId }) => {
  const [{ replyComments }, dispatch] = useReducer(replyCommentReducer, {
    replyComments: replies,
  });
  const [isOpenReplyComment, setIsOpenReplyComment] = useState(false);

  function toggleReplyComment() {
    setIsOpenReplyComment(prevState => !prevState);
  }

  function replyCommentReducer(state, action) {
    switch (action.type) {
      case 'ADD_REPLY_COMMENT':
        return {
          ...state,
          replyComments: [action.replyComment, ...state.replyComments],
        };
      case 'REMOVE_REPLY_COMMENT':
        return {
          ...state,
          replyComments: state.replyComments.filter(
            replyComment => replyComment.id !== action.id
          ),
        };
    }
  }

  async function addReplyComment(replyComment) {
    try {
      if (!replyComment) {
        return alert('입력한 내용이 없습니다.');
      }
      const replyCommentInfo = { commentId, replyComment };
      const { data } = await movieAPI.addReplyComment(replyCommentInfo);
      if (data.success) {
        dispatch({
          type: 'ADD_REPLY_COMMENT',
          replyComment: data.replyComment,
        });
        return true;
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  }

  async function removeReplyComment(replyCommentId) {
    try {
      const { data } = await movieAPI.removeReplyComment({ replyCommentId });
      if (data.success) {
        dispatch({ type: 'REMOVE_REPLY_COMMENT', id: replyCommentId });
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  }

  return (
    <>
      <Button type="link" onClick={toggleReplyComment}>
        댓글
        {replyComments.length > 0 ? (
          <strong> {replyComments.length}</strong>
        ) : (
          ' 작성'
        )}
      </Button>
      {isOpenReplyComment && (
        <div
          css={css`
            background-color: #eee;
            padding: 10px 20px;
          `}
        >
          {replyComments.map(replyComment => (
            <div
              key={replyComment.id}
              css={css`
                border-bottom: 1px solid #ddd;
                padding-bottom: 10px;
                margin-bottom: 10px;
              `}
            >
              <Comment
                comment={replyComment}
                removeComment={removeReplyComment}
              />
            </div>
          ))}
          <CommentForm addComment={addReplyComment} />
        </div>
      )}
    </>
  );
};

ReplyCommentList.propTypes = {
  replies: PropTypes.array.isRequired,
  commentId: PropTypes.number.isRequired,
};

export default ReplyCommentList;

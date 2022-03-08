import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import movieAPI from '../api/movie';

const LikeButton = ({ comment, ...props }) => {
  const [isLiked, setIsLiked] = useState(false);

  async function likeComment() {
    try {
      const { data } = await movieAPI.likeComment({ commentId: comment.id });
      data.success && setIsLiked(true);
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  }

  async function unlikeComment() {
    try {
      const { data } = await movieAPI.unlikeComment({ commentId: comment.id });
      data.success && setIsLiked(false);
    } catch (error) {
      console.error(error);
      if (error.response) {
        alert(error.response.data.message);
      }
    }
  }

  function onClick() {
    isLiked ? unlikeComment() : likeComment();
  }

  useEffect(() => {
    async function getCommentLikeStatus() {
      try {
        const { data } = await movieAPI.getCommentLikeStatus(comment.id);
        data.success && setIsLiked(true);
      } catch (error) {
        console.error(error);
      }
    }

    getCommentLikeStatus();
  }, [comment.id]);

  return (
    <Button {...props} onClick={onClick}>
      {isLiked ? '좋아요 취소' : '좋아요'}
    </Button>
  );
};

LikeButton.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default LikeButton;

import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import movieAPI from '../api/movie';
import { css } from '@emotion/react';

const LikeButton = ({ comment, ...props }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likerCount, setLikerCount] = useState(0);

  async function likeComment() {
    try {
      const { data } = await movieAPI.likeComment({ commentId: comment.id });
      if (data.success) {
        setIsLiked(true);
        setLikerCount(prevCount => prevCount + 1);
      }
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
      if (data.success) {
        setIsLiked(false);
        setLikerCount(prevCount => prevCount - 1);
      }
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

    async function getCommentLikers() {
      try {
        const { data } = await movieAPI.getCommentLikers(comment.id);
        data.success && setLikerCount(data.likerCount);
      } catch (error) {
        console.error(error);
      }
    }

    getCommentLikeStatus();
    getCommentLikers();
  }, [comment.id]);

  return (
    <Button
      {...props}
      onClick={onClick}
      css={
        isLiked &&
        css`
          border: 1px solid #1890ff;
          color: #1890ff;
        `
      }
    >
      좋아요{likerCount}
    </Button>
  );
};

LikeButton.propTypes = {
  comment: PropTypes.object.isRequired,
};

export default LikeButton;

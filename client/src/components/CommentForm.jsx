import React, { useRef, useState } from 'react';
import { Input, Button } from 'antd';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

const CommentForm = ({ addComment }) => {
  const [comment, setComment] = useState('');
  const onChangeComment = e => setComment(e.target.value);
  const inputRef = useRef();

  function onSubmit(e) {
    e.preventDefault();
    const success = addComment(comment);
    if (success) {
      setComment('');
      inputRef.current.focus();
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      css={css`
        position: relative;
      `}
    >
      <Input
        ref={inputRef}
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
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default CommentForm;

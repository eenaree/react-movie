import React from 'react';
import PropTypes from 'prop-types';
import { Alert } from 'antd';
import { css } from '@emotion/react';

const ErrorMessage = ({ message }) => {
  return (
    <Alert
      type="error"
      message={message}
      showIcon
      css={css`
        font-weight: 700;
      `}
    />
  );
};

ErrorMessage.propTypes = {
  message: PropTypes.string,
};

export default ErrorMessage;

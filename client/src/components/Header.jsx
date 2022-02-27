import React, { useState } from 'react';
import { Layout, Button, Space } from 'antd';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import userAPI from '../api/user';

const userMenuStyle = css`
  position: absolute;
  top: 0;
  right: 50px;
  display: flex;
  li {
    list-style: none;
    margin: 0 10px;
  }
`;

const Header = () => {
  const user = JSON.parse(sessionStorage.getItem('user'));
  const [loggedUser, setLoggedUser] = useState(user?.nickname);

  async function logoutUser() {
    try {
      await userAPI.logout();
      const currentUrl = window.location.href;
      window.location.replace(currentUrl);
      sessionStorage.removeItem('user');
      setLoggedUser('');
    } catch (error) {
      console.error(error);
    }
  }

  function onClickLogout() {
    logoutUser();
  }

  return (
    <Layout.Header
      css={css`
        position: relative;
      `}
    >
      <h1>
        <Link to="/">React Movie</Link>
      </h1>
      {loggedUser ? (
        <div css={userMenuStyle}>
          <Space align="center">
            <strong
              css={css`
                color: #fff;
              `}
            >
              {loggedUser}님
            </strong>
            <Button type="link" onClick={onClickLogout}>
              로그아웃
            </Button>
          </Space>
        </div>
      ) : (
        <ul css={userMenuStyle}>
          <li>
            <Link to="/login">로그인</Link>
          </li>
          <li>
            <Link to="/register">회원가입</Link>
          </li>
        </ul>
      )}
    </Layout.Header>
  );
};

export default Header;

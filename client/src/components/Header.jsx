import React, { useState } from 'react';
import { Layout, Button, Space, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  async function logoutUser() {
    try {
      await userAPI.logout();
      sessionStorage.removeItem('user');
      setLoggedUser('');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  function onClickLogout() {
    logoutUser();
  }

  function onClickFavorite() {
    navigate('/movie/favorite');
  }

  return (
    <Layout.Header
      css={css`
        position: relative;
        display: flex;
      `}
    >
      <h1>
        <Link to="/">React Movie</Link>
      </h1>
      <Menu
        theme="dark"
        css={css`
          margin-left: 50px;
          margin-top: 10px;
        `}
      >
        <Menu.Item key="favorite" onClick={onClickFavorite}>
          즐겨찾기
        </Menu.Item>
      </Menu>
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

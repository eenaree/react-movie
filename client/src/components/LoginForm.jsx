import React, { useEffect, useState } from 'react';
import { Form, Input, Button } from 'antd';
import { css } from '@emotion/react';
import { useNavigate, Link } from 'react-router-dom';
import userAPI from '../api/user';
import useInput from '../hooks/useInput';
import ErrorMessage from './ErrorMessage';

const LoginForm = () => {
  const navigate = useNavigate();
  const initialState = { email: '', password: '' };
  const [userInfo, onChangeUserInfo] = useInput(initialState);
  const [errorMessage, setErrorMessage] = useState(null);

  async function loginUser(userInfo) {
    try {
      const { data } = await userAPI.login(userInfo);
      sessionStorage.setItem('user', JSON.stringify(data.user));
      navigate('/');
    } catch (error) {
      console.error(error);
      if (error.response) {
        setErrorMessage(error.response.data.message);
      }
    }
  }

  function onSubmit(e) {
    e.preventDefault();
  }

  function onFinish() {
    loginUser(userInfo);
  }

  useEffect(() => {
    setErrorMessage('');
  }, [userInfo]);

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
      `}
    >
      <div
        css={css`
          width: 500px;
          border: 1px solid #eee;
          padding: 25px 50px;
          text-align: center;
        `}
      >
        <h1>로그인</h1>
        <Form onSubmit={onSubmit} onFinish={onFinish}>
          <Form.Item
            label="이메일"
            name="email"
            rules={[{ required: true, message: '이메일을 입력해주세요.' }]}
          >
            <Input
              name="email"
              value={userInfo.email}
              onChange={onChangeUserInfo}
            />
          </Form.Item>
          <Form.Item
            label="비밀번호"
            name="password"
            rules={[{ required: true, message: '비밀번호를 인력해주세요.' }]}
          >
            <Input.Password
              name="password"
              value={userInfo.password}
              onChange={onChangeUserInfo}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              로그인
            </Button>
          </Form.Item>
          <p>
            <Link to="/register">아직 회원이 아니신가요?</Link>
          </p>
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;

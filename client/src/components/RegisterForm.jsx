import React, { useEffect, useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import userAPI from '../api/user';
import useInput from '../hooks/useInput';
import ErrorMessage from './ErrorMessage';

const RegisterForm = () => {
  const navigate = useNavigate();
  const initialState = { email: '', nickname: '', password: '' };
  const [userInfo, onChangeUserInfo] = useInput(initialState);
  const [errorMessage, setErrorMessage] = useState('');
  let timeout;

  async function registerUser(userInfo) {
    try {
      const { data } = await userAPI.register(userInfo);
      if (data) {
        processRegisterResult(data.success);
      }
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
    registerUser(userInfo);
  }

  function processRegisterResult(result) {
    const key = 'register result message';

    function processRegisterSuccess(key) {
      message.success({
        content: '회원가입 성공',
        key,
        duration: 2,
      });
      navigate('/');
    }

    function processRegisterFailure(key) {
      message.error({
        content: '회원가입 실패',
        key,
        duration: 2,
      });
    }

    message.loading({ content: '회원가입 처리중...', key });

    if (result) {
      timeout = setTimeout(processRegisterSuccess, 1000, key);
    } else {
      timeout = setTimeout(processRegisterFailure, 1000, key);
    }
  }

  useEffect(() => {
    setErrorMessage('');
    return () => {
      clearTimeout(timeout);
    };
  }, [userInfo, timeout]);

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
        <h1>회원가입</h1>
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
            label="닉네임"
            name="nickname"
            rules={[{ required: true, message: '닉네임을 입력해주세요.' }]}
          >
            <Input
              name="nickname"
              value={userInfo.nickname}
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
              회원가입
            </Button>
          </Form.Item>
          {errorMessage && <ErrorMessage message={errorMessage} />}
        </Form>
      </div>
    </div>
  );
};

export default RegisterForm;

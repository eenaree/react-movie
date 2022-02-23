import React, { useRef, useState } from 'react';
import { Input, Button } from 'antd';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const SearchButton = styled(Button)`
  position: absolute;
  top: 50px;
  right: 50px;
`;

const SearchForm = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearchQuery = e => setSearchQuery(e.target.value);
  const inputRef = useRef();
  const searchParams = new URLSearchParams();
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    if (!searchQuery) {
      alert('키워드를 입력하세요');
      return inputRef.current.focus();
    }
    searchParams.set('keyword', searchQuery);
    navigate(`/search?${searchParams}`);
    setSearchQuery('');
  }

  return (
    <>
      <form
        onSubmit={onSubmit}
        css={css`
          position: relative;
          padding: 50px 50px 0 50px;
        `}
      >
        <Input
          placeholder="영화 검색"
          value={searchQuery}
          onChange={onChangeSearchQuery}
          ref={inputRef}
        />
        <SearchButton type="primary" htmlType="submit">
          검색
        </SearchButton>
      </form>
    </>
  );
};

export default SearchForm;

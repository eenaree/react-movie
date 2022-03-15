import React, { useRef, useState } from 'react';
import { Input, Button } from 'antd';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import movieAPI from '../api/movie';

const SearchButton = styled(Button)`
  position: absolute;
  top: 50px;
  right: 50px;
`;

const SearchForm = ({ setMovies }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearchQuery = e => setSearchQuery(e.target.value);
  const inputRef = useRef();
  const searchParams = new URLSearchParams();
  const navigate = useNavigate();

  async function searchMovie(keyword) {
    try {
      const { data } = await movieAPI.searchMovie(keyword);
      !data.results.length ? setMovies([]) : setMovies(data.results);
      setSearchQuery('');
      navigate(`/search?${searchParams}`);
    } catch (error) {
      console.error(error);
    }
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!searchQuery) {
      alert('키워드를 입력하세요');
      return inputRef.current.focus();
    }
    searchParams.set('keyword', searchQuery);
    searchMovie(searchQuery);
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

SearchForm.propTypes = {
  setMovies: PropTypes.func.isRequired,
};

export default SearchForm;

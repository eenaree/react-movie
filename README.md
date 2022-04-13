# React Movie App

The Movie Database (TMDB) API 영화 데이터를 로컬 서버에 저장한 후, CRUD 기능을 실행합니다.  
React, React Hook, React Router를 이용하여 화면 및 페이지 이동을 구성했습니다.

## 서버

1. TMDB API: App을 구성하는데 필요한 영화 데이터를 받아오는 서버
2. Local Server: TMDB API에서 받아온 영화 정보를 먼저 저장한 후, 해당 영화에 대한 즐겨찾기, 댓글 정보 등을 저장 및 관리

## 구현 기능

- 회원가입 및 로그인
  - sessionStorage 사용: 새로고침시, 로그인 정보 유지 목적
- 인기 영화 리스트, 영화별 상세 페이지
- 영화 검색
  - URI 값에 따라 인기 영화 리스트, 영화 검색 결과를 같은 컴포넌트 안에서 렌더링
- 영화 즐겨찾기 추가, 사용자의 즐겨찾기 영화 리스트 페이지
  - Authentication 컴포넌트 사용: 로그인 사용자만 접속이 가능한 페이지, 로그인 상태가 아닐 경우, 로그인 페이지로 강제 이동
- 영화에 대한 댓글 및 대댓글 등록
  - CommentForm, CommentList 컴포넌트를 재사용하여 코드 구조만 다르게 구성
- 댓글 좋아요

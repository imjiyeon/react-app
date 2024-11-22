import { createSlice } from "@reduxjs/toolkit";
// npm install @reduxjs/toolkit

// 슬라이스에 넣을 state 초기값
const initialState = {
  token : null, // 인증토큰
  info : null // 회원정보
}

// 슬라이스 생성
// 인자: 슬라이스 이름, 초기상태, 리듀서
export const memberSlice = createSlice(
  {
    name: "memberSlice",
    initialState,
    reducers: {
      // 로그인시 생성된 토큰과 회원정보를 state에 저장
      login: (state, action) => {
        state.token = action.payload.token;
        state.info = action.payload.user;
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('info', JSON.stringify(action.payload.user));
      },
      // 로그아웃시 state를 초기화
      logout: (state, action) => {
        // state 초기화
        state.token = null;
        state.info = null;
        // 스토리지 초기화
        localStorage.removeItem('token');
        localStorage.removeItem('info');
      }
    }
  }
);

// 슬라이스를 생성하면 리듀서에 대응되는 액션함수가 자동으로 생성됨
// 액션함수 중 login, logout을 추출
export const { login, logout } = memberSlice.actions;
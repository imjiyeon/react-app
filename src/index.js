import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createContext } from 'react';

import store from './store/store';
import { Provider } from 'react-redux';

import { login } from './store/memberSlice';

export const Context = createContext();

// index.js : 앱의 시작점

// 앱이 시작될 때 스토리지에 있는 로그인 정보를 확인하여
// 로그인 상태를 유지

// 로컬 스토리지에서 로그인 데이터 꺼내기
let info = localStorage.getItem('info');
let token = localStorage.getItem('token');

// dispatch를 사용하여 login 액션 함수 호출
if(info !== null){
  // json string => object
  const loginData = { user: JSON.parse(info), token: token }
  store.dispatch(login(loginData));
}

// 로컬 컴퓨터에서 React App을 실행할 때는
// API 주소도 localhost로 설정
// 그렇지 않으면 (Netlify에서) AWS 서버로 설정
let host;
if(window.location.hostname === 'localhost'){
  host = 'http://localhost:8080';
} else {
  host = 'http://ec2-3-35-231-182.ap-northeast-2.compute.amazonaws.com:8080'
}

console.log(host);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
      <Context.Provider value={ { host } }>
        <Provider store={store}>
          <App />
        </Provider>
      </Context.Provider>
  </BrowserRouter>
);
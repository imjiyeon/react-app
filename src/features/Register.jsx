import React from 'react'
import { CustomCard, CustomContainer } from '../components/Styles'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { Context } from '../index';
import { useContext } from 'react';

// 회원가입 컴포넌트

const Register = () => {

  const navigate = useNavigate();

  // 새로운 회원 정보
  const [ member, setMember ] = useState(null);

  // Context에서 host 데이터 가져오기
  const { host } = useContext(Context);

  // 입력필드의 이벤트 함수
  const handleChange = (event) => {
    const { name, value } = event.target;
    const newMember = { ...member };
    newMember[name] = value;
    setMember(newMember);
  }  

  // 폼태그 이벤트 함수
  const handleSubmit = async (event) => {

    // 버튼의 이동 동작을 방지
    event.preventDefault();

    // 회원 등록 API 호출
    // 등록은 post
    // 인자: 주소, 바디데이터
    const response = await axios.post(
      `${host}/register`,
      member
    );

    // 회원가입에 성공했으면 로그인 화면으로 이동
    if(response.status===201){
      navigate('/login');
    }else{
      throw new Error(`api error: ${response.status} ${response.statusText}`);
    }
    
  }


  return (
    <CustomCard>
      <CustomContainer>
      <h3>회원가입</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="member.id">
          <Form.Label>아이디</Form.Label>
          <Form.Control type="text" onChange={handleChange} name="id"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="member.password">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password" onChange={handleChange} name="password"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="member.name">
          <Form.Label>이름</Form.Label>
          <Form.Control type="text" onChange={handleChange} name="name"/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="member.role">
          <Form.Check
            type="radio"
            label="사용자"
            id="member.role1"
            name="role"
            value="ROLE_USER" onChange={handleChange}
          />
          <Form.Check
            type="radio"
            label="관리자"
            id="member.role2"
            name="role"
            value="ROLE_ADMIN" onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

      </CustomContainer>
    </CustomCard>
    
  )
}

export default Register
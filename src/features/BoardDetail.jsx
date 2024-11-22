import React from 'react'
import { CustomCard, CustomContainer } from '../components/Styles'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

import { useContext } from 'react';
import { Context } from '../index';

import { useSelector } from 'react-redux';


const BoardDetail = () => {


  // 파일 경로
  // const IMG_PATH = 'C://uploadfile/';
  // 파일경로를 프로젝트 내부의 상대경로로 설정
  const IMG_PATH = '/image/';

  // 스토어에서 token state를 가져오기
  const token = useSelector((state)=>{
    return state.member.token;
  });

  let [board, setBoard] = useState(null);

  const navigate = useNavigate();

  const params = useParams();

  const { host } = useContext(Context);

  useEffect(()=>{

    const apiCall = async () => {

      const response = await axios.get(
        `${host}/board/read?no=${params.no}`,
        { 
          headers: {
            Authorization: token
          }
        }
      );

      if(response.status === 200){
        setBoard(response.data); // state 업데이트
      } else {
        throw new Error(`api error: ${response.status} ${response.statusText}`);
      }

    }

    apiCall();

  }, []);

  // 실제 파일은 존재하지만
  // 브라우저 정책에 의해 프로젝트 외부 경로에 접근할 수 없음!

  return (
    <CustomCard>
      <CustomContainer>
        <h3>게시물 상세</h3>

        { 
          board!==null && 
          <Form>
            <Form.Group className="mb-3" controlId="board.no">
              <Form.Label>번호</Form.Label>
              <Form.Control type="text" value={board.no} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.title">
              <Form.Label>제목</Form.Label>
              <Form.Control type="text" value={board.title} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.content">
              <Form.Label>내용</Form.Label>
              <Form.Control as="textarea" rows={3} value={board.content} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.writer">
              <Form.Label>작성자</Form.Label>
              <Form.Control type="text" value={board.writer} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.regDate">
              <Form.Label>등록일</Form.Label>
              <Form.Control type="text" value={board.regDate} readOnly/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="board.modDate">
              <Form.Label>수정일</Form.Label>
              <Form.Control type="text" value={board.modDate} readOnly/>
            </Form.Group>

            {
              board.imgPath!==null && 
              <img src={ `${IMG_PATH}${board.imgPath}` }></img>
            }

            <Button variant="primary" onClick={ ()=>{
              navigate(`/board/modify/${board.no}`);
            }} >수정</Button>

          </Form>
          
        }

      </CustomContainer>
    </CustomCard>
  )
}

export default BoardDetail
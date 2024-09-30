import React from 'react';
import './Main.css';
import { useNavigate } from 'react-router-dom';

function Main() {

  const navigate = useNavigate(); // useNavigate 훅 호출

  // "일기 쓰기" 버튼을 누르면 CreateDiary로 이동
  const gotolist = () => {
    navigate('/DiaryList'); 
  };



  return (
    <div className="main-container">
      <div className="heading">
        AI와 그리는 나의 하루
      </div>
      <button className="create-diary-button" onClick={gotolist}>그림 일기 쓰기</button>
      <div className="first-time">
        처음이신가요?
      </div>
      <div className="use-one-drawing">
        하루 한 그림 활용하기
      </div>
    </div>
  );
}

export default Main;

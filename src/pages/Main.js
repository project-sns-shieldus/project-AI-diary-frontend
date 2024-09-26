import React from 'react';
import './Main.css';

function Main() {
  return (
    <div className="main-container">
      <div className="heading">
        AI와 그리는 나의 하루
      </div>
      <button className="create-diary-button">그림 일기 쓰기</button>
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

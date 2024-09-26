import React from 'react';
import './DiaryList.css';
import cardImage1 from '../images/카드2.png';
import cardImage2 from '../images/카드3.png';
import cardImage3 from '../images/카드4.png';
import { useNavigate } from 'react-router-dom';

function DiaryList() {
  // 백엔드에서 데이터 가져와서 유저의 일기목록을 꽂아주기!
  const diaryEntries = [
    { id: 1, title: 'Fall, and Coffee', date: '2024-09-01', image: cardImage1 },
    { id: 2, title: 'Sunday Memories', date: '2024-09-10', image: cardImage2 },
    { id: 3, title: 'Jeju Sea', date: '2024-09-15', image: cardImage3 },
  ];

  const navigate = useNavigate(); // useNavigate 훅 호출

  // "일기 쓰기" 버튼을 누르면 CreateDiary로 이동
  const writeDiary = () => {
    navigate('/creatediary'); 
  };

  return (
    <div className="diary-list-container">
      <div className="diary-list-header">
        <h1>나의 일기장</h1>
      </div>
      <button className="write-diary-button" onClick={writeDiary}>일기 쓰기</button>

      <div className="diary-cards">
        {/* 유저가 생성한 일기 개수만큼 카드 레이아웃 반복하는 함수 */}
        {diaryEntries.map((entry) => (
          <div key={entry.id} className="diary-card">
            <img src={entry.image} alt="Diary Preview" className="diary-card-image" />
            <div className="diary-card-info">
              <h2 className="diary-card-title">{entry.title}</h2>
              <p className="diary-card-date">{entry.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiaryList;

import React, { useEffect, useState } from 'react';
import './DiaryList.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DiaryList = () => {
  const [diaryEntries, setDiaryEntries] = useState([]); // 일기 목록 상태
  const navigate = useNavigate(); // useNavigate 훅 호출

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/diary/get/byEmail/${localStorage.getItem('email')}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`, // JWT 토큰 인증
          },
        });

        // 서버에서 반환된 필드와 프론트엔드의 필드 매칭
        const transformedData = response.data.map(entry => ({
          diaryId: entry.diaryId,
          userid: entry.userid,
          diaryDate: entry.diaryDate,
          title: entry.title,
          weather: entry.weather,
          content: entry.notes, // notes -> content로 변환
          createdAt: entry.createdAt,
          updatedDateAt: entry.updatedDateAt,
        }));

        setDiaryEntries(transformedData); // 변환된 데이터를 상태에 저장
      } catch (error) {
        console.error('Error fetching diary entries:', error);
      }
    };

    fetchDiaryEntries();
  }, []); // 컴포넌트가 마운트될 때 한 번 실행

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
        {/* 유저가 생성한 일기 개수만큼 카드 레이아웃 반복 */}
        {diaryEntries.map((entry) => (
          <div key={entry.diaryId} className="diary-card">
            <img src={entry.image} alt="Diary Preview" className="diary-card-image" />
            <div className="diary-card-info">
              <h2 className="diary-card-title">{entry.title}</h2>
              <p className="diary-card-date">{entry.diaryDate}</p>
              <p className="diary-card-content">{entry.content}</p> {/* content 필드를 사용 */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DiaryList;

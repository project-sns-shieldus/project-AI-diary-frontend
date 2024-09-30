import React, { useEffect, useState } from 'react';
import './DiaryList.css';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import axios from 'axios';

const DiaryList = () => {
  const [diaryEntries, setDiaryEntries] = useState([]); // 일기 목록 상태
  const navigate = useNavigate(); // useNavigate 훅 호출

  useEffect(() => {
    const fetchDiaryEntries = async () => {
      const email = localStorage.getItem('email');
  
      if (!email) {
        console.error("No email found in localStorage");
        return;
      }
  
      try {
        const response = await axios.get(`http://localhost:8080/api/diary/get/byEmail/${email}`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('accessToken')}`,
          },
        });
  
        // 서버에서 반환된 데이터를 처리
        const transformedData = response.data.map(entry => ({
          diaryId: entry.diaryId,
          userid: entry.userid,
          diaryDate: entry.diaryDate,
          title: entry.title,
          weather: entry.weather,
          content: entry.notes,
          createdAt: entry.createdAt,
          updatedDateAt: entry.updatedDateAt,
        }));
  
        setDiaryEntries(transformedData);
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

  // 일기 카드를 클릭했을 때 DiaryDetail 페이지로 이동
  const handleCardClick = (diaryId) => {
    navigate(`/diary/${diaryId}`); // DiaryDetail 페이지로 이동하며 diaryId를 전달
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
          <div
            key={entry.diaryId}
            className="diary-card"
            onClick={() => handleCardClick(entry.diaryId)} // 카드 클릭 시 상세 페이지로 이동
            style={{ cursor: 'pointer' }} // 마우스 포인터를 손 모양으로 변경
          >
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

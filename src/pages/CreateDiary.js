import React, { useState } from 'react';
import './CreateDiary.css';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';


function CreateDiary() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [diaryDate, setDiaryDate] = useState('');
  const [weather, setWeather] = useState('');
  const navigate = useNavigate();  // useNavigate 훅 사용
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 서버로 데이터 전송 로직 추가
    const diaryData = {
      title: title,
      diaryDate,
      weather,
      notes: content,
      //createdAt: new Date().toISOString(),
    };
    console.log('저장된 데이터:', diaryData);

    const response = await axios.post('http://localhost:8080/api/diary/add',diaryData,{
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('accessToken')}`,
      },
    });

    if(response.status === 200) {
      alert('일기 저장 성공!');
      navigate('/diarylist');
    }
  };

  return (
    <div className="diary-page">
      <div className="diary-content">
        <input
          type="text"
          className="diary-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          maxLength="19" // 최대 글자 수 19글자로 제한
        />
        <div className="diary-meta">
          <input
            type="date"
            className="diary-date"
            value={diaryDate}
            onChange={(e) => setDiaryDate(e.target.value)}
          />
          <div className="diary-weather-container">
            <label className="weather-label">날씨:</label>
            <input
              type="text"
              className="diary-weather"
              value={weather}
              onChange={(e) => setWeather(e.target.value)}
            />
          </div>
        </div>
        <textarea
          className="diary-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="일기를 작성해보세요..."
        />
      </div>

      <div className="save-button-container">
        <button className="save-button" onClick={handleSubmit}>
          저장하기
        </button>
      </div>
    </div>
  );
}

export default CreateDiary;

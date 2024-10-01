import React, { useState } from 'react';
import './CreateDiary.css';
import axios from 'axios';  
import { useNavigate } from 'react-router-dom';
import AiLoadingModal from '../components/AiLoadingModal'; 
import DiaryPreview from '../components/DiaryPreview'; 

function CreateDiary() {
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [diaryDate, setDiaryDate] = useState('');
  const [weather, setWeather] = useState('');
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const navigate = useNavigate();

  const handleGenerateImage = async () => {
    setLoading(true);
    try {
      // Flask 서버로 일기 내용을 보내 이미지 생성 요청
      const flaskResponse = await axios.post('http://localhost:5000/translation', {
        text: content,
        source: 'ko',
        target: 'en',
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (flaskResponse.status === 200) {
        const { image_url } = flaskResponse.data;
        setImageUrl(image_url);        // 이미지 URL 저장
        setShowPreview(true);          // 미리보기 표시
      } else {
        alert('이미지 생성 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버 요청 중 오류가 발생했습니다.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDiary = async () => {
    // 서버로 데이터 전송 로직
    const diaryData = {
      title: title,
      diaryDate,
      weather,
      notes: content,
    };
    console.log('저장된 데이터:', diaryData);

    try {
      // 1. 일기 저장
      const response = await axios.post('http://localhost:8080/api/diary/add', diaryData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('accessToken')}`,
        },
      });

      if (response.status === 200) {
        const diaryId = response.data;  // 서버에서 반환한 diaryId를 받음
        alert('일기 저장 성공!');

        // 2. 이미지 저장
        const imageData = {
          imageUrls: [imageUrl],  // Flask 서버로부터 받은 이미지 URL을 배열로 감싸서 전송
        };

        // 이미지 저장 요청 보내기
        const imageResponse = await axios.post(`http://localhost:8080/api/images/${diaryId}`, imageData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${localStorage.getItem('accessToken')}`,
          },
        });


        if (imageResponse.status === 200) {
          alert('이미지 저장 성공!');
          navigate('/diarylist');
        } else {
          alert('이미지 저장 중 오류가 발생했습니다.');
        }
      } else {
        alert('일기 저장 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버 요청 중 오류가 발생했습니다.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleGenerateImage();
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
          maxLength="19"
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
        <button className="save-button" onClick={handleSubmit} disabled={loading}>
          {loading ? '이미지 생성 중...' : '이미지 생성하기'}
        </button>
      </div>

      {loading && <AiLoadingModal />}

      {showPreview && (
        <DiaryPreview
          title={title}
          diaryDate={diaryDate}
          weather={weather}
          content={content}
          imageUrl={imageUrl}
          onConfirm={handleSaveDiary}
          onCancel={() => setShowPreview(false)}
        />
      )}
    </div>
  );
}

export default CreateDiary;

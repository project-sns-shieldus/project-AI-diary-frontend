import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // 일기 ID를 URL에서 가져오기 위해 사용
import axios from 'axios'; // axios 임포트
import './DiaryDetail.css';

function DiaryDetail() {
  const { id } = useParams(); // URL에서 일기 ID를 가져옴
  const navigate = useNavigate();
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [diaryDate, setDiaryDate] = useState('');
  const [weather, setWeather] = useState('');

  // 일기 상세 정보 가져오기
  useEffect(() => {
    const fetchDiaryDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/diary/get/byId/${id}`, { 
          headers: {
            'Authorization': `${localStorage.getItem('accessToken')}`, // JWT 토큰 추가
          },
        });
        
        const data = response.data;
        setTitle(data.title);
        setDiaryDate(data.diaryDate);
        setWeather(data.weather);
        setContent(data.notes);
        setImageUrl(data.imageUrl); // 이미지 URL이 데이터에 포함되어 있는 경우
      } catch (error) {
        console.error('Failed to fetch diary detail:', error);
      }
    };

    fetchDiaryDetail();
  }, [id]);

  // 일기 수정 핸들러
  const handleModify = async () => {
    try {
      const updatedDiary = {
        title,
        diaryDate,
        weather,
        notes: content,
      };

      const response = await axios.put(`http://localhost:8080/api/diary/update/${id}`, updatedDiary, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('accessToken')}` // JWT 토큰 추가
        }
      });

      if (response.status === 200) {
        alert('일기가 수정되었습니다!');
        navigate('/diarylist'); // 수정 후 일기 목록으로 이동
      } else {
        alert('일기 수정에 실패했습니다.');
      }
    } catch (error) {
      console.error('Failed to modify diary:', error);
    }
  };

  // 일기 삭제 핸들러
  const handleDelete = async () => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/diary/delete/${id}`, {
        headers: {
          'Authorization': `${localStorage.getItem('accessToken')}` // JWT 토큰 추가
        }
      });

      if (response.status === 200 || response.status === 204) {
        alert('일기가 삭제되었습니다!');
        navigate('/diarylist'); // 삭제 후 일기 목록으로 이동
      } else {
        alert('일기 삭제에 실패했습니다.');
      }
    } catch (error) {
      console.error('Failed to delete diary:', error);
    }
  };

  return (
    <div className="diary-page">
      <div className="diary-content2">
        <div
          className="imagebox"
          style={{
            backgroundImage: imageUrl
              ? `url(${imageUrl})`
              : 'url(https://pimg.mk.co.kr/meet/neds/2022/06/image_readmed_2022_557782_16562167665086622.jpg)', // 기본 이미지
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        <input
          type="text"
          className="diary-title2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="제목을 입력해주세요"
          maxLength="19"
        />
        <div className="diary-meta2">
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
          className="diary-detailtext"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="일기를 작성해보세요..."
        />
      </div>

      <div className="button-container">
        <button className="modify-button" onClick={handleModify}>
          수정하기
        </button>
        <button className="delete-button" onClick={handleDelete}>
          삭제하기
        </button>
      </div>
    </div>
  );
}

export default DiaryDetail;

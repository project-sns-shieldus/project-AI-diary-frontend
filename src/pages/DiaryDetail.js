import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // 일기 ID를 URL에서 가져오기 위해 사용
import './DiaryDetail.css';

function DiaryDetail() {
  const { id } = useParams(); // URL에서 일기 ID를 가져옴
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [title, setTitle] = useState('');
  const [diaryDate, setDiaryDate] = useState('');
  const [weather, setWeather] = useState('');

  useEffect(() => {
    const fetchDiaryDetail = async () => {
      try {
        const response = await fetch(`/api/diaries/${id}`); // 백엔드에서 일기 상세 정보를 가져오는 API 요청
        const data = await response.json();

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

  const handleModify = () => {
    console.log('수정하기 버튼 클릭');
  };

  const handleDelete = () => {
    console.log('삭제하기 버튼 클릭');
  };

  return (
    <div className="diary-page">
      <div className="diary-content2">
        <div
          className="imagebox"
          style={{
            backgroundImage: imageUrl
              ? `url(${imageUrl})`
              : 'url(https://pimg.mk.co.kr/meet/neds/2022/06/image_readmed_2022_557782_16562167665086622.jpg)',
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

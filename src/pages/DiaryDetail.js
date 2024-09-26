import React, { useState } from 'react';
import './DiaryDetail.css';

function CreateDiary() {
  const [content, setContent] = useState('');

  const handleModify = () => {
    // 수정 기능 추가
    console.log('수정하기 버튼 클릭');
  };

  const handleDelete = () => {
    // 삭제 기능 추가
    console.log('삭제하기 버튼 클릭');
  };

  return (
    <div className="diary-page">
      <div className="diary-content">
        <textarea
          className="diary-textarea"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="글의 상세페이지."
        />
      </div>

      <div className="button-container">
        <button className="modify-button" onClick={handleModify}>수정하기</button>
        <button className="delete-button" onClick={handleDelete}>삭제하기</button>
      </div>
    </div>
  );
}

export default CreateDiary;

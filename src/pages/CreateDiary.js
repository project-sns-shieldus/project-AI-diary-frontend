import React, { useState } from 'react';
import './CreateDiary.css';

function CreateDiary() {
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // 여기에 저장 기능을 추가하면 됩니다.
    console.log('작성된 내용:', content);
  };

  return (
    <div className="diary-page">
      <div className="diary-content">
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

import React from 'react';
import './DiaryPreview.css';

function DiaryPreview({ title, diaryDate, weather, content, imageUrl, onConfirm, onCancel }) {
  return (
    <div className="diary-preview-overlay">
      <div className="diary-preview-container">
        <h2 className="preview-title">{title}</h2>
        <div className="preview-meta">
          <span className="preview-date">{diaryDate}</span>
          <span className="preview-weather">날씨: {weather}</span>
        </div>
        <img src={imageUrl} alt="Generated AI" className="preview-image" />
        <p className="preview-content">{content}</p>
        <div className="preview-buttons">
            <button className="cancel-button" onClick={onCancel}>다시하기</button>
            <button className="confirm-button" onClick={onConfirm}>저장하기</button>
        </div>
      </div>
    </div>
  );
}

export default DiaryPreview;

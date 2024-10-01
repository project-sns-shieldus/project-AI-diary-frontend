import React from 'react';
import './AiLoadingModal.css';

function AiLoadingModal() {
  return (
    <div className="ai-loading-modal">
      <div className="spinner"></div>
      <p>AI 이미지를 생성하고 있습니다. 잠시만 기다려주세요...</p>
    </div>
  );
}

export default AiLoadingModal;

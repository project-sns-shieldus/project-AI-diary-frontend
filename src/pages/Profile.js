import React from 'react';
import './Profile.css';

function Profile() {
  return (
    <div className="profile-container">
      <div className="profile-title">내 정보</div>
      <form className="profile-form">
        <div className="input-container">
          <input type="text" className="input-field" placeholder="닉네임" />
        </div>
        <div className="input-container">
          <input type="email" className="input-field" placeholder="이메일" />
        </div>
        <button type="submit" className="profile-button">변경하기</button>
      </form>
      <div className="password-change">
        <a href="/change-password" className="password-link">비밀번호 변경</a>
      </div>
    </div>
  );
}

export default Profile;

import React from 'react';
import './Signup.css';

function Signup() {
  return (
    <div className="signup-container">
      <div className="signup-title">회원가입</div>
      <form className="signup-form">
        <div className="input-container">
          <input type="text" className="input-field" placeholder="아이디" />
        </div>
        <div className="input-container">
          <input type="text" className="input-field" placeholder="별명" />
        </div>
        <div className="input-container">
          <input type="password" className="input-field" placeholder="비밀번호" />
        </div>
        <div className="input-container">
          <input type="password" className="input-field" placeholder="비밀번호 확인" />
        </div>
        <button type="submit" className="signup-button">회원가입</button>
      </form>
      <div className="login-prompt">
        이미 계정이 있으신가요? <a href="/login" className="tologin-link">로그인</a>
      </div>
    </div>
  );
}

export default Signup;

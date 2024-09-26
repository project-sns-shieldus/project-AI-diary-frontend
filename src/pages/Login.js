import React from 'react';
import './Login.css';
import { Link } from 'react-router-dom'; // Import Link for navigation
function Login() {
  return (
    <div className="login-container">
      <div className="login-title">로그인</div>
      <form className="login-form">
        <div className="input-container">
          <input type="text" className="input-field" placeholder="아이디" />
        </div>
        <div className="input-container">
          <input type="password" className="input-field" placeholder="비밀번호를 입력하세요" />
        </div>
        <button type="submit" className="login-button">로그인</button>
      </form>
      <Link to="/signup" className="signup">회원가입</Link> 
      <div className="정보찾기">
        <div className="아이디찾기링크">
          <div className="findid">아이디 찾기</div>
        </div>
        <div className="비번찾기링크">
          <div className="findpw">비밀번호 찾기</div>  
        </div>
      </div>
    </div>
  );
}

export default Login;

import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  // 이메일, 비밀번호, 닉네임 상태 정의
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate(); // 네비게이션 훅

  // 회원가입 버튼 클릭 시 실행되는 함수
  const handleSignup = async (e) => {
    e.preventDefault();
    
    // 비밀번호와 확인 비밀번호가 일치하는지 체크
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    // 회원가입 데이터 구성
    const registerData = {
      email,
      username,  // 닉네임 추가
      password
    };

    try {
      // 회원가입 API 호출
      const response = await axios.post('http://localhost:8080/api/v1/register', registerData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('회원가입 성공:', response.data);
      alert('회원가입이 성공적으로 완료되었습니다!');
      navigate('/login');
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-title">회원가입</div>
      <form className="signup-form" onSubmit={handleSignup}>
        <div className="input-container">
          {/* 이메일 입력 필드 */}
          <input 
            type="email" 
            className="input-field" 
            placeholder="이메일을 입력하세요" 
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
        </div>
        <div className="input-container">
          {/* 닉네임 입력 필드 */}
          <input 
            type="text" 
            className="input-field" 
            placeholder="닉네임을 입력하세요" 
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div className="input-container">
          {/* 비밀번호 입력 필드 */}
          <input 
            type="password" 
            className="input-field" 
            placeholder="비밀번호를 입력하세요" 
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <div className="input-container">
          {/* 비밀번호 확인 입력 필드 */}
          <input 
            type="password" 
            className="input-field" 
            placeholder="비밀번호 확인" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)} 
          />
        </div>
        <button type="submit" className="signup-button">회원가입</button>
      </form>
      
      {/* 로그인 페이지로 이동할 수 있는 링크 */}
      <div className="login-prompt">
        이미 계정이 있으신가요? 
        <Link to="/login" className="tologin-link">로그인</Link>
      </div>

    </div>
  );
}

export default Signup;

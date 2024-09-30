import React, { useState, useContext } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await axios.post('http://localhost:8080/api/v1/login', loginData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 200) {
        const accessToken = response.data.body.accessToken;
        login(accessToken, email);  // 로그인 상태 업데이트
        navigate('/diarylist');
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="login-container">
      <div className="login-title">로그인</div>
      <form className="login-form" onSubmit={handleLogin}>
        <div className="input-container">
          <input
            type="email"
            className="input-field"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            className="input-field"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-button">로그인</button>
      </form>
      
      <Link to="/signup" className="signup">회원가입</Link>
    </div>
  );
}

export default Login;

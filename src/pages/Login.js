import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom'; // Link와 useNavigate 훅 불러오기
//import { userApi } from '../api/api'; // userApi import
//import { useUser } from '../UserProvider'; // UserProvider에서 사용자 컨텍스트 가져오기
import axios from 'axios';

function Login() {
  const navigate = useNavigate(); // 네비게이션 훅
 // const { setCurrentUser } = useUser(); // UserProvider에서 사용자 상태 업데이트 함수 사용

  // 이메일과 비밀번호 입력을 위한 상태
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 처리 함수
  const handleLogin = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 새로고침 방지

    const loginData = {
      email: email, // email 키를 사용하도록 변경
      password: password, // 비밀번호 키 이름 유지
    };

    try {
      //const response = await userApi.loginUser(loginData);
      const response = await axios.post('http://localhost:8080/api/v1/login',loginData,{
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 200) {
        console.log('로그인 성공:', response);

        // 응답 데이터에서 필요한 정보 추출
        const accessToken = response.data.body.accessToken;
        const email = loginData.email; // 요청 시 사용한 이메일을 사용

        // 추출된 토큰과 이메일 저장
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('email', email);
    

        // 로그인 성공 시, 채팅 페이지로 이동
        alert('로그인 성공!');
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
          {/* 이메일 입력 */}
          <input
            type="email"
            className="input-field"
            placeholder="이메일"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // 이메일 값 변경 핸들러
          />
        </div>
        <div className="input-container">
          {/* 비밀번호 입력 */}
          <input
            type="password"
            className="input-field"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 비밀번호 값 변경 핸들러
          />
        </div>
        <button type="submit" className="login-button">로그인</button>
      </form>
      
      {/* 회원가입 페이지 링크 */}
      <Link to="/signup" className="signup">회원가입</Link>

      {/* 아이디/비밀번호 찾기 링크 섹션 */}
      <div className="정보찾기">
        <div className="아이디찾기링크">
          <Link to="/find-id" className="findid">아이디 찾기</Link>
        </div>
        <div className="비번찾기링크">
          <Link to="/find-password" className="findpw">비밀번호 찾기</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;

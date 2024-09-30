import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext'; // AuthContext에서 현재 로그인된 사용자 정보 가져오기

function Profile() {
  const { email: loggedInEmail, accessToken, logout } = useContext(AuthContext); // 로그아웃 함수 추가
  const [username, setUsername] = useState(''); // 기존 닉네임을 저장할 상태
  const [email, setEmail] = useState(loggedInEmail); // 기본적으로 현재 로그인한 유저의 이메일을 설정
  const navigate = useNavigate();

  useEffect(() => {
    // 초기 렌더링 시 유저 정보를 가져와서 username을 설정
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/v1/users`, {
          headers: {
            'Authorization': `${accessToken}`,
          },
        });
        setUsername(response.data.body); // 유저의 닉네임 설정
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [accessToken]);

  // Function to update username or email
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestBody = {
        email: email, // 새로 입력된 이메일 값
        newUsername: username, // 새로 입력된 닉네임 값
      };

      const response = await axios.put('http://localhost:8080/api/v1/update-username', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${accessToken}`, // 토큰 추가
        },
      });

      if (response.status === 200) {
        alert('변경에 성공하였습니다. 다시 로그인 해주세요.');
        logout(); // 로그아웃 처리
        navigate('/login'); // 로그인 페이지로 이동
      } else {
        alert('변경에 실패하였습니다.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-title">프로필 변경</div>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="email"
            className="input-field"
            placeholder="변경할 email을 입력하세요" // 로그인한 유저의 이메일을 기본 placeholder로 사용
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            className="input-field"
            placeholder="변경할 username을 입력하세요"
            value={username} // 현재 닉네임을 보여주고 수정할 수 있게 설정
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button type="submit" className="profile-button">변경하기</button>
      </form>
      <div className="password-change">
        <a href="/passwordchange" className="password-link">
          비밀번호 변경
        </a>
      </div>
    </div>
  );
}

export default Profile;

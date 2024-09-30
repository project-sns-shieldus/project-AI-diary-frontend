import React, { useState } from 'react';
import axios from 'axios';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // Function to update username
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem('accessToken');
      const requestBody = {
        email: email,
        newUsername: username,
      };

      const response = await axios.put('http://localhost:8080/api/v1/update-username', requestBody, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${accessToken}`,
        },
      });

      if (response.status === 200) {
        alert('변경에 성공하였습니다.');
        navigate('/profile');  // Redirect to another page after success
      } else {
        alert('변경에 실패하였습니다.');
      }
    } catch (error) {
      console.error('Error updating username:', error);
      alert('An error occurred during the update.');
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-title">User Profile</div>
      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="input-container">
          <input
            type="email"
            className="input-field"
            placeholder="이메일을 입력하세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="text"
            className="input-field"
            placeholder="변경할 username을 입력하세요"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <button type="submit" className="profile-button">Username 변경</button>
      </form>
      <div className="password-change">
        <a href="/change-password" className="password-link">
          비밀번호 변경
        </a>
      </div>
    </div>
  );
}

export default Profile;

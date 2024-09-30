import React, { useState } from 'react';
import './PasswordChange.css'; // Login.css 스타일을 재사용
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function PasswordChange() {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // 새 비밀번호와 확인 비밀번호가 일치하는지 체크
    if (newPassword !== confirmNewPassword) {
      alert('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    const changePasswordData = { currentPassword, newPassword };

    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.put('http://localhost:8080/api/v1/change-password', changePasswordData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${accessToken}`,
        },
      });

      if (response.status === 200) {
        alert('비밀번호가 성공적으로 변경되었습니다.');
        navigate('/diarylist');
      } else {
        alert('비밀번호 변경에 실패했습니다.');
      }
    } catch (error) {
      console.error('비밀번호 변경 실패:', error);
      alert('오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="login-container">
      <div className="pwchange-title">비밀번호 변경</div>
      <form className="login-form" onSubmit={handlePasswordChange}>
        <div className="input-container">
          <input
            type="password"
            className="input-field"
            placeholder="현재 비밀번호"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            className="input-field"
            placeholder="새 비밀번호"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="input-container">
          <input
            type="password"
            className="input-field"
            placeholder="새 비밀번호 확인"
            value={confirmNewPassword}
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="login-button">비밀번호 변경</button>
      </form>
    </div>
  );
}

export default PasswordChange;

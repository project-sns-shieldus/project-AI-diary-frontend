import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { AuthContext } from '../contexts/AuthContext';

function Navbar() {
  const { isLoggedIn, logout, email } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();  // Link의 기본 동작을 막음
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <Link to="/" className="main-link">하루 한 그림</Link>
      <Link to="/diarylist" className="diary-link">일기장</Link>
      {isLoggedIn ? (
        <>
          <Link to="/profile" className="profile-link">내 정보</Link>
          <Link to="/logout" className="logout-link" onClick={handleLogout}>로그아웃</Link> {/* Link로 변경 */}
        </>
      ) : (
        <Link to="/login" className="login-link">로그인</Link>
      )}
    </nav>
  );
}

export default Navbar;

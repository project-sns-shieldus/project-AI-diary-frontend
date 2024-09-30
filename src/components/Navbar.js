import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="main-link">하루 한 그림</Link>
      <Link to="/diarylist" className="diary-link">일기장</Link>
      <Link to="/login" className="login-link">로그인</Link>
    </nav>
  );
}

export default Navbar;

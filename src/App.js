import './App.css';
import Navbar from './components/Navbar.js';
import Main from './pages/Main.js';
import Login from './pages/Login.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup.js';
import Profile from './pages/Profile.js'
function App() {
  return ( 
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>

  );
}

export default App;

import './App.css';
import Navbar from './components/Navbar.js';
import Main from './pages/Main.js';
import Login from './pages/Login.js';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  return ( 
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>

  );
}

export default App;

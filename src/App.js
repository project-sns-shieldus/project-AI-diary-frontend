import './App.css';
import Navbar from './components/Navbar';
import Main from './pages/Main';
import Login from './pages/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import CreateDiary from './pages/CreateDiary';
import DiaryDetail from './pages/DiaryDetail';
import DiaryList from './pages/DiaryList';
import PasswordChange from './pages/PasswordChange';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* 로그인한 사용자만 접근 가능한 경로 */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/passwordchange"
            element={
              <ProtectedRoute>
                <PasswordChange/>
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/creatediary"
            element={
              <ProtectedRoute>
                <CreateDiary />
              </ProtectedRoute>
            }
          />
          <Route
            path="/diarylist"
            element={
              <ProtectedRoute>
                <DiaryList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/diary/:id"
            element={
              <ProtectedRoute>
                <DiaryDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

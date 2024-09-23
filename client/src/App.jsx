import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import HomePage from './pages/Home';
import Login from './components/auth/Login';
import InvestorDashboard from './components/dashboard/InvestorDashboard';
import Profile from './pages/Profile';
import Mentorship from './pages/Mentorship';
import CreatePost from './components/posts/CreatePost';
import ChatList from './components/chat/ChatList';
import ChatWindow from './components/chat/ChatWindow';
import VideoCall from './components/video/VideoCall';
import FounderDashboard from './components/dashboard/FounderDashboard';
import Header from './components/layout/Header';
import SignUp from './components/auth/SignUp';

function App() {
  const location = useLocation();
  const noHeaderPaths = ['/', '/login', '/signup'];

  return (
    <div className="App">
      {!noHeaderPaths.includes(location.pathname) && <Header />}
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/founderdashboard" element={<FounderDashboard />} />
        <Route path="/investordashboard" element={<InvestorDashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/createpost" element={<CreatePost />} />
        <Route exact path="/chat" element={<ChatList />} />
        <Route path="/chat/:chatId" element={<ChatWindow />} />
        <Route path="/video-call" element={<VideoCall />} />
      </Routes>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;

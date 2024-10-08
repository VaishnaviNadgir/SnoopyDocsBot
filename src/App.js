import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './UI/Components/Elements/Sidebar';
import Navbar from './UI/Components/Elements/Navbar';
import Dashboard from './UI/Components/Elements/Dashboard';
import Fileupload from './UI/Components/UploadFiles/Fileupload';
import LoginModal from './UI/Components/Login/LoginModal';
import ChatInterface from './UI/Components/Chat/ChatInterface';
import './App.css';
import AdminLogin from './UI/Components/Roles/AdminLogin';
import UserLogin from './UI/Components/Roles/UserLogin';

const App = () => {

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documents" element={<Fileupload />} />                    
          <Route path="/LoginModal" element={<LoginModal />} />
          <Route path="/new chat" element={<ChatInterface />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/user-login" element={<UserLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './UI/Components/Elements/Sidebar';
import Navbar from './UI/Components/Elements/Navbar';
import Dashboard from './UI/Components/Elements/Dashboard';
import Fileupload from './UI/Components/UploadFiles/Fileupload';
import LoginModal from './UI/Components/Login/LoginModal';
import ChatInterface from './UI/Components/Chat/ChatInterface';
import './App.css';
import AdminDashboard from './UI/Components/Roles/AdminDashboard';
import UserDashboard from './UI/Components/Roles/UserDashboard';

const App = () => {
  // const [userRole, setUserRole] = useState(null); // This should come from your authentication logic

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
          {/* <Route path="/login" element={<LoginModal showSignup={false} setUserRole={setUserRole} />} />
        <Route path="/admin-dashboard" element={userRole === ROLES.ADMIN ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/" element={userRole === ROLES.USER ? <UserDashboard /> : <Navigate to="/login" />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

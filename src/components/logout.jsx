import React, { useState } from 'react';
import './component.css';
import { Link, Outlet } from 'react-router-dom';
import {
  FaHome, FaUser, FaUsers, FaChalkboardTeacher,
  FaCalendarCheck, FaClipboardList, FaChartBar, FaFileAlt
} from 'react-icons/fa';
import { IoPersonCircle } from "react-icons/io5";

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="layout-container">
      {/* Toggle button (for mobile) */}
      <button className="toggle-btn" onClick={() => setSidebarOpen(!isSidebarOpen)}>
        ☰
      </button>

      {/* Sidebar */}
      {isSidebarOpen && (
        <nav className="sidebar">
          <h1>School System</h1>
          <div className="nav-links">
            <Link to="/"><FaHome className="nav-icon" /> Dashboard</Link>
            <Link to="/admin"><FaUser className="nav-icon" /> Admin</Link>
            <Link to="/students"><FaUsers className="nav-icon" /> Students</Link>
            <Link to="/teachers"><FaChalkboardTeacher className="nav-icon" /> Teachers</Link>
            <Link to="/attendance"><FaCalendarCheck className="nav-icon" /> Attendance</Link>
            <Link to="/events"><FaClipboardList className="nav-icon" /> Events</Link>
            <Link to="/results"><FaChartBar className="nav-icon" /> Results</Link>
            <Link to="/report"><FaFileAlt className="nav-icon" /> Report</Link>
            <Link to="/login" className='login'><IoPersonCircle className="nav-icon" />Login</Link>
          </div>
        </nav>
      )}

      {/* Main Content */}
      <main className="main-content">
        {children || <Outlet />}
      </main>
    </div>
  );
};

export default Layout;

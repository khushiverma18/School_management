import React, { useState } from 'react';
import './component.css';
import { Link, Outlet } from 'react-router-dom';
import {
  FaHome, FaUser, FaUsers, FaChalkboardTeacher,
  FaCalendarCheck, FaClipboardList,  FaMicrophone ,FaChartBar, FaFileAlt, FaBell
} from 'react-icons/fa';
import { IoPersonCircle } from "react-icons/io5";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { FaSchool } from "react-icons/fa";

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`layout-container ${darkMode ? 'dark' : ''}`}>
      
      {/* Header at the top */}
      <header className="header">
        <button className="toggle-btn" onClick={() => setSidebarOpen(!isSidebarOpen)}>☰</button>
        <FaSchool className='icon' />
        <input type="text" className="search-bar" placeholder="Search..." />
        <div className="header-actions">
          <FaMicrophone className='icon' />
          <button className="darkmode-toggle" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <MdLightMode /> : <MdDarkMode />}
          </button>
          <button className="notification-btn">
            <FaBell />
          </button>
        </div>
      </header>

      <div className="main-body">
        {/* Sidebar on the left */}
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
    </div>
  );
};

export default Layout;

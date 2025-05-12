import React from "react";
import { Link } from "react-router-dom";
import './admin.css'; // Import the CSS file

const AdminPanel = () => {
  return (
     <div className="admin-dashboard">
      <h1 className="main-title">Admin Dashboard</h1>

      <div className="dashboard-buttons">
        <Link to="/admin/teachers" className="btn blue">Add Teacher</Link>
        <Link to="/admin/student" className="btn green">Add Student</Link>
        <Link to="/admin/events" className="btn yellow">Schedule Event</Link>
      </div>

      <div className="dashboard-cards">
        <div className="card light-blue">
          <div className="card-content">
            <h3>Attendance Rate</h3>
            <h1>91%</h1>
            <div className="progress-bar blue" />
          </div>
          <div className="card-icon calendar-icon" />
        </div>

        <div className="card light-green">
          <div className="card-content">
            <h3>Avg Performance</h3>
            <h1>B+</h1>
            <div className="progress-bar green" />
          </div>
          <div className="card-icon graph-icon" />
        </div>

        <div className="card light-yellow">
          <div className="card-content">
            <h3>Upcoming Events</h3>
            <h1>3</h1>
            <div className="progress-bar yellow" />
          </div>
          <div className="card-icon calendar-icon" />
        </div>

        <div className="card light-red">
          <div className="card-content">
            <h3>Tasks Due</h3>
            <h1>5</h1>
            <div className="progress-bar red" />
          </div>
          <div className="card-icon user-icon" />
        </div>
      </div>
    
 

      {/* Main Content */}
      
        <h2>Feature Modules</h2>

        {/* Quick Actions */}
        <div className="quick-actions">
          <div className="quick-action-card">
            <Link to="/admin/student" className="quick-action-link">
              <h2 className="quick-action-title">Add Student</h2>
              <p className="quick-action-description">Quickly add a new student.</p>
            </Link>
          </div>

          <div className="quick-action-card">
            <Link to="/admin/teachers" className="quick-action-link">
              <h2 className="quick-action-title">Add Teacher</h2>
              <p className="quick-action-description">Quickly add a new teacher.</p>
            </Link>
          </div>

          <div className="quick-action-card">
            <Link to="/admin/attendance" className="quick-action-link">
              <h2 className="quick-action-title">Record Attendance</h2>
              <p className="quick-action-description">Record student attendance for the day.</p>
            </Link>
          </div>

          <div className="quick-action-card">
            <Link to="/admin/results" className="quick-action-link">
              <h2 className="quick-action-title">Upload Results</h2>
              <p className="quick-action-description">Upload student exam results easily.</p>
            </Link>
          </div>

          <div className="quick-action-card">
            <Link to="/admin/events" className="quick-action-link">
              <h2 className="quick-action-title">Schedule Events</h2>
              <p className="quick-action-description">Create and manage school events.</p>
            </Link>
          </div>

          <div className="quick-action-card">
            <Link to="/admin/reports" className="quick-action-link">
              <h2 className="quick-action-title">View Reports</h2>
              <p className="quick-action-description">View and manage school reports.</p>
            </Link>
          </div>
        </div>
     
    </div>
  
  );
};

export default AdminPanel;

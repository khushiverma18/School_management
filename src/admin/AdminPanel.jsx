import React from "react";
import { Link } from "react-router-dom";
import './admin.css'; // Import the CSS file

const AdminPanel = () => {
  return (
    <div className="admin-panel-container">

      {/* Main Content */}
      <main className="main-content">
        <h1 className="main-title">Admin Dashboard</h1>

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
      </main>
    </div>
  );
};

export default AdminPanel;

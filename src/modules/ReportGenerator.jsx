import React, { useContext, useState } from 'react';
import { AppContext } from '../context/contexts';
import './modules.css';

import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';

const ModuleReport = () => {
  const { students = [], teachers = [], attendanceRecords = {}, results = [], enabledModules = {} } = useContext(AppContext);
  const [view, setView] = useState('students');
  const [metric, setMetric] = useState('Attendance %');
  const [timeframe, setTimeframe] = useState('Last Month');

  const data = [
    { week: 'Week 1', value: 97 },
    { week: 'Week 2', value: 90 },
    { week: 'Week 3', value: 94 },
    { week: 'Week 4', value: 91 },
  ];

  const getAttendanceRate = (id) => {
    const records = attendanceRecords[id];
    const total = records ? Object.keys(records).length : 0;
    const present = records ? Object.values(records).filter(status => status === 'Present').length : 0;
    return total > 0 ? ((present / total) * 100).toFixed(2) + '%' : 'N/A';
  };

  const getAverageMarks = (id) => {
    const studentResults = results.filter(r => r.studentId === id);
    const totalMarks = studentResults.reduce((sum, r) => sum + r.marks, 0);
    return studentResults.length ? (totalMarks / studentResults.length).toFixed(2) : 'N/A';
  };

  const getTeacherPerformance = (id) => {
    const feedback = results.filter(r => r.teacherId === id);
    const totalFeedback = feedback.length;
    const positiveFeedback = feedback.filter(f => f.marks >= 75).length;
    return totalFeedback > 0 ? ((positiveFeedback / totalFeedback) * 100).toFixed(2) + '%' : 'N/A';
  };

  return (
    <div className="main-re">
            <div className="left-panel">
      <h2>Report</h2>
      {/* Module Toggles */}
      <div className="module-container">
        {enabledModules.attendance && <div className="module-placeholder attendance">Attendance Module Enabled</div>}
        {enabledModules.events && <div className="module-placeholder events">Events Module Enabled</div>}
        {enabledModules.results && <div className="module-placeholder results">Results Module Enabled</div>}
        {enabledModules.reports && <div className="module-placeholder reports">Reports Module Enabled</div>}
      </div>

      {/* Performance Metrics */}
      <div className="performance-container">
        <div className="performance-header">
          <h2>Performance Metrics</h2>
          <div className="dropdowns">
            <select value={metric} onChange={e => setMetric(e.target.value)}>
              <option>Attendance %</option>
              <option>Grade Avg</option>
            </select>
            <select value={timeframe} onChange={e => setTimeframe(e.target.value)}>
              <option>Last Month</option>
              <option>This Month</option>
            </select>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="week" />
            <YAxis domain={[0, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Report Summary */}
      <h2>Report Summary</h2>

      <select
        onChange={(e) => setView(e.target.value)}
        value={view}
        className="dashboard-select"
      >
        <option value="students">Students</option>
        <option value="teachers">Teachers</option>
      </select>

      {view === 'students' ? (
        students.length === 0 ? (
          <p>No students available.</p>
        ) : (
          <ul className="student-list">
            {students.map(student => (
              <li key={student.id} className="student-item">
                <p><strong>{student.name}</strong> (Class {student.Class})</p>
                <p>Attendance: {getAttendanceRate(student.id)}</p>
                <p>Avg Marks: {getAverageMarks(student.id)}</p>
              </li>
            ))}
          </ul>
        )
      ) : (
        teachers.length === 0 ? (
          <p>No teachers available.</p>
        ) : (
          <ul className="student-list">
            {teachers.map(teacher => (
              <li key={teacher.id} className="student-item">
                <p><strong>{teacher.name}</strong> (Subject: {teacher.subject})</p>
                <p>Performance: {getTeacherPerformance(teacher.id)}</p>
              </li>
            ))}
          </ul>
        )
      )}
      </div>
      <div className="right-panel"></div>
    </div>
   
  );
};

export default ModuleReport;

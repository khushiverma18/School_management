import React, { useContext, useState } from 'react';
import { AppContext } from '../context/contexts';
import './modules.css';

// Placeholder components if not yet implemented
const AttendanceModule = () => <div className="module-placeholder attendance">Attendance Module Enabled</div>;
const EventsModule = () => <div className="module-placeholder events">Events Module Enabled</div>;
const ResultsModule = () => <div className="module-placeholder results">Results Module Enabled</div>;
const ReportsModule = () => <div className="module-placeholder reports">Reports Module Enabled</div>;


const ModuleReport = () => {
  const { students = [], teachers = [], attendanceRecords = {}, results = [], enabledModules = {} } = useContext(AppContext);
  const [view, setView] = useState('students');

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
    <div className="main-t">
       <div className="module-container">
        {enabledModules.attendance && <div className="module-placeholder attendance">Attendance Module Enabled</div>}
        {enabledModules.events && <div className="module-placeholder events">Events Module Enabled</div>}
        {enabledModules.results && <div className="module-placeholder results">Results Module Enabled</div>}
        {enabledModules.reports && <div className="module-placeholder reports">Reports Module Enabled</div>}
      </div>

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
  );
};

export default ModuleReport;

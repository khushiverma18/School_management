import React, { useContext, useState } from 'react';
import { AppContext } from '../context/contexts';
import './modules.css';

const ViewAttendance = () => {
  const { students, teachers, attendanceRecords } = useContext(AppContext);
  const [viewType, setViewType] = useState('student'); // 'student' or 'teacher'

  const getNameById = (id) => {
    const list = viewType === 'student' ? students : teachers;
    const person = list.find(p => p.id.toString() === id.toString());
    return person ? person.name : 'Unknown';
  };

  const isInViewType = (id) => {
    const list = viewType === 'student' ? students : teachers;
    return list.some(p => p.id.toString() === id.toString());
  };

  const attendanceList = Object.entries(attendanceRecords).flatMap(
    ([id, records]) =>
      Object.entries(records).map(([date, status]) => ({
        id,
        date,
        status,
      }))
  ).filter(record => isInViewType(record.id));

  return (
    <div className="main">
      <h2>Attendance Records</h2>
      <select onChange={(e) => setViewType(e.target.value)} className="dashboard-select ">
        <option value="student">Students</option>
        <option value="teacher">Teachers</option>
      </select>

      {attendanceList.length > 0 ? (
        <ul className="student-list">
        {attendanceList.map((record, index) => (
          <li key={index} className="student-item">
            <div>
              <p>Name: <span>{getNameById(record.id)}</span></p>
              <p>Date: <span>{record.date}</span></p>
              <p>Status: <span>{record.status}</span></p>
            </div>
          </li>
        ))}
      </ul>
      
      ) : (
        <p className="text-gray-600">No attendance records available.</p>
      )}
    </div>
  );
};

export default ViewAttendance;

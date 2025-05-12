import React, { useContext, useState } from 'react';
import { AppContext } from '../context/contexts.jsx';
import './modules.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const Student = () => {
  const { students = [] } = useContext(AppContext);
  const [selectedClass, setSelectedClass] = useState('All');
 const classStrength = students.reduce((acc, student) => {
    const cls = student.class || student.Class || 'N/A';
    acc[cls] = (acc[cls] || 0) + 1;
    return acc;
  }, {});

  const data = Object.keys(classStrength).map(cls => ({
    class: cls,
    strength: classStrength[cls]
  }));
  // Extract unique class names
  const classList = ['All', ...new Set(students.map(s => s.class || s.Class || 'N/A'))];

  // Filtered students by class
  const filteredStudents = selectedClass === 'All'
    ? students
    : students.filter(s => (s.class || s.Class || 'N/A') === selectedClass);

  return (
    <div className="main-t">
       <h2 >Student Strength by Class</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="class" />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Legend />
          <Bar dataKey="strength" fill="#4f46e5" />
        </BarChart>
      </ResponsiveContainer>
      <h2 className="teacher-admin-heading">Student List</h2>

      <div className="filter-bar">
        <label htmlFor="class-select">Filter by Class:</label>
        <select
          id="class-select"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="class-dropdown"
        >
          {classList.map((cls, idx) => (
            <option key={idx} value={cls}>{cls}</option>
          ))}
        </select>
      </div>

      {filteredStudents.length === 0 ? (
        <p className="no-students">No students found in this class.</p>
      ) : (
        <ul className="student-list grid">
          {filteredStudents.map(student => (
            <li key={student.id} className="student-admin-item card">
              <p className="student-admin-name">Name: <span>{student.name}</span></p>
              <p className="student-admin-class">Class: <span>{student.class || student.Class || 'N/A'}</span></p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Student;

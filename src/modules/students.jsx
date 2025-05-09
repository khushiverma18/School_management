import React, { useContext } from 'react';
import { AppContext } from '../context/contexts.jsx';
import './modules.css';

const Student = () => {
  const { students } = useContext(AppContext);
  
  return (
    <div className="main-t">
      <h2 className="teacher-admin-heading">Student List</h2>
      <ul className="student-list">
        {students.map(student => (
          <li key={student.id} className="student-admin-item">
            <div>
              <p className="student-admin-name">Name: <span>{student.name}</span></p>
              <p className="student-admin-class">Class: <span>{student.class || student.Class || 'N/A'}</span></p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Student;

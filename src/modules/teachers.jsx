import React, { useContext } from 'react';
import './modules.css';
import { AppContext } from '../context/contexts.jsx';

const Teacher = () => {
  const {teachers} = useContext(AppContext);
  const tempteach = [
    { id: 1, name: 'Khushi', subject: 'Maths' },
    { id: 2, name: 'Muskan', subject: 'English' },
    { id: 3, name: 'priya', subject: 'Hindi' },
    { id: 4, name: 'aayush', subject: 'Maths' },
    { id: 5, name: 'Simmi', subject: 'Chemistry' },
    { id: 6, name: 'Mukesh', subject: 'Physics' },
  ];

  const alltech = [...tempteach, ...teachers];
  return (
    <div className="teacher-admin-container">
    <h2 className="teacher-admin-heading">All Teachers</h2>
    <ul className="teacher-list">
      {alltech.map(teacher => (
        <li key={teacher.id} className="teacher-admin-item">
          <div>
            <p className="teacher-admin-name">
              Name: <span>{teacher.name}</span>
            </p>
            <p className="teacher-admin-role">
              Subject: <span>{teacher.subject || 'N/A'}</span>
            </p>
          </div>
        </li>
      ))}
    </ul>
  </div>
  

  );
};

export default Teacher;

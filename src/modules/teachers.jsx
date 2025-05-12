import React, { useContext } from 'react';
import './modules.css';
import { AppContext } from '../context/contexts.jsx';

const Teacher = ({ tempteach = [] }) => {
  const { teachers = [] } = useContext(AppContext);

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

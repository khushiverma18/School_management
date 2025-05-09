// src/modules/Results.jsx
import React, { useContext } from 'react';
import { AppContext } from '../context/contexts';
import './modules.css';

const Results = () => {
  const { results, students } = useContext(AppContext);

  const getStudentName = (id) => {
    const student = students.find(s => s.id === id);
    return student ? student.name : 'Unknown';
  };

  return (
    <div className="module-result-container">
      <h2 className="text-green-600 text-xl font-semibold mb-4">Student Results</h2>
      {results.length === 0 ? (
        <p className="text-gray-600">No results available.</p>
      ) : (
        <ul className="student-list">
          {results.map((res) => (
            <li key={res.id} className="student-item">
              <p><strong>Name:</strong> {getStudentName(res.studentId)}</p>
              <p><strong>Subject:</strong> {res.subject}</p>
              <p><strong>Marks:</strong> {res.marks}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Results;

// src/admin/AdminResults.jsx
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/contexts';
import './admin.css';

const AdminResults = () => {
  const { students, addResult } = useContext(AppContext);

  const [selectedStudent, setSelectedStudent] = useState('');
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedStudent || !subject || !marks) return alert("All fields are required.");

    const newResult = {
      id: Date.now(),
      studentId: parseInt(selectedStudent),
      subject,
      marks: parseInt(marks)
    };

    addResult(newResult);
    setSelectedStudent('');
    setSubject('');
    setMarks('');
    alert("Result added successfully.");
  };

  return (
    <div className="admin-student-container">
      <h2>Add Student Result</h2>
      <form onSubmit={handleSubmit} className="admin-form">
        <label>Student:</label>
        <select
          value={selectedStudent}
          onChange={(e) => setSelectedStudent(e.target.value)}
        >
          <option value="">Select Student</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>
              {student.name} ({student.Class || student.class || 'N/A'})
            </option>
          ))}
        </select>

        <label>Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Enter subject"
        />

        <label>Marks:</label>
        <input
          type="number"
          value={marks}
          onChange={(e) => setMarks(e.target.value)}
          placeholder="Enter marks"
        />

        <button type="submit">Add Result</button>
      </form>
    </div>
  );
};

export default AdminResults;

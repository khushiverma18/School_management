import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/contexts';
import './admin.css';

const AdminAttendance = () => {
  const { students, teachers, markAttendance, attendanceRecords } = useContext(AppContext);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [role, setRole] = useState('student'); // student or teacher
  const [attendanceForDate, setAttendanceForDate] = useState({});

  const list = role === 'student' ? students : teachers;

  useEffect(() => {
    const records = {};
    list.forEach(person => {
      const status = attendanceRecords?.[person.id]?.[date];
      if (status) {
        records[person.id] = status;
      }
    });
    setAttendanceForDate(records);
  }, [date, list, attendanceRecords]);

  const handleAttendance = (id, status) => {
    markAttendance(id, date, status);
    setAttendanceForDate(prev => ({
      ...prev,
      [id]: status,
    }));
  };

  return (
    <div className="admin-student-container">
      <h2>Mark {role === 'student' ? 'Student' : 'Teacher'} Attendance</h2>
      <div style={{ marginBottom: '10px' }}>
        <button onClick={() => setRole('student')} disabled={role === 'student'}>Students</button>
        <button onClick={() => setRole('teacher')} disabled={role === 'teacher'}>Teachers</button>
      </div>
      <input
        type="date"
        value={date}
        onChange={e => setDate(e.target.value)}
        className="date-picker"
      />
      <ul className="admin-lists">
        {list.map(person => {
          const status = attendanceForDate[person.id];
          return (
            <li key={person.id} className="admin-item">
              <div>
                <p>{person.name} ({person.class || person.Class || person.subject || 'N/A'})</p>
                <p>Status: <strong>{status || 'Not Marked'}</strong></p>
                <button onClick={() => handleAttendance(person.id, 'Present')} disabled={status === 'Present'}>Present</button>
                <button onClick={() => handleAttendance(person.id, 'Absent')} disabled={status === 'Absent'}>Absent</button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default AdminAttendance;

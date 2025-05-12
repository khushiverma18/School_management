import React, { useContext, useState, useEffect } from 'react';
import { AppContext } from '../context/contexts';
import './admin.css';

const AdminAttendance = () => {
  const { students, teachers, markAttendance, attendanceRecords } = useContext(AppContext);
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [role, setRole] = useState('student');
  const [selectedClass, setSelectedClass] = useState('All');
  const [attendanceForDate, setAttendanceForDate] = useState({});
  const [listKey, setListKey] = useState(0);

  // Filter logic
  const studentClasses = [...new Set(students.map(s => s.class || s.Class).filter(Boolean))];
  const filteredStudents = selectedClass === 'All'
    ? students
    : students.filter(s => (s.class || s.Class) === selectedClass);

  const list = role === 'student' ? filteredStudents : teachers;

  useEffect(() => {
    const records = {};
    if (list) {
      list.forEach(person => {
        const status = attendanceRecords?.[person.id]?.[date];
        if (status) {
          records[person.id] = status;
        }
      });
    }
    setAttendanceForDate(records);
  }, [date, list, attendanceRecords]);

  const handleRoleChange = (newRole) => {
    if (newRole !== role) {
      setRole(newRole);
      setSelectedClass('All'); // Reset class filter on role change
      setListKey(prevKey => prevKey + 1);
    }
  };

  const handleAttendance = (id, status) => {
    markAttendance(id, date, status);
    setAttendanceForDate(prev => ({
      ...prev,
      [id]: status,
    }));
  };

  const getStatusClass = (status) => {
    if (status === 'Present') return 'present';
    if (status === 'Absent') return 'absent';
    return 'not-marked';
  };

  return (
    <div className="admin-attendance-container">
      <h2>Mark {role === 'student' ? 'Student' : 'Teacher'} Attendance</h2>

      <div className="role-selector">
        <button onClick={() => handleRoleChange('student')} disabled={role === 'student'}>
          Students
        </button>
        <button onClick={() => handleRoleChange('teacher')} disabled={role === 'teacher'}>
          Teachers
        </button>
      </div>

      <div className="date-picker-container">
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          className="date-picker"
        />
      </div>

      {/* Class Filter Dropdown */}
      {role === 'student' && (
        <div className="class-filter">
          <label>Select Class: </label>
          <select
            value={selectedClass}
            onChange={e => setSelectedClass(e.target.value)}
          >
            <option value="All">All</option>
            {studentClasses.map(cls => (
              <option key={cls} value={cls}>{cls}</option>
            ))}
          </select>
        </div>
      )}

      {(!list || list.length === 0) ? (
        <p className="no-users-message">No {role === 'student' ? 'students' : 'teachers'} found.</p>
      ) : (
        <ul className="admin-attendance-list" key={listKey}>
          {list.map((person, index) => {
            const status = attendanceForDate[person.id];
            return (
              <li
                key={person.id}
                className="admin-attendance-item"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="person-info">
                  <p className="person-name">{person.name}</p>
                  <p className="person-detail">
                    {person.class || person.Class || person.subject || 'N/A'}
                  </p>
                  <p>
                    Status:{' '}
                    <span className={`status-text ${getStatusClass(status)}`}>
                      {status || 'Not Marked'}
                    </span>
                  </p>
                </div>
                <div className="action-buttons">
                  <button
                    className="present-btn"
                    onClick={() => handleAttendance(person.id, 'Present')}
                    disabled={status === 'Present'}
                  >
                    Present
                  </button>
                  <button
                    className="absent-btn"
                    onClick={() => handleAttendance(person.id, 'Absent')}
                    disabled={status === 'Absent'}
                  >
                    Absent
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default AdminAttendance;

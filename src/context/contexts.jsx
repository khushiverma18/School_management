import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [enabledModules, setEnabledModules] = useState({
    students: true,
    teachers: true,
    attendance: true,
    events: true,
    results: true,
    reports: true
  });

  const [theme, setTheme] = useState('light'); // default theme

  const toggleModule = (module) => {
    setEnabledModules((prev) => ({
      ...prev,
      [module]: !prev[module],
    }));
  };

  const changeTheme = (newTheme) => {
    setTheme(newTheme);
  };

  const tempStudents = [
    { id: 1, name: 'Khushi', Class: '9' },
    { id: 2, name: 'Radhika', Class: '10' },
    { id: 3, name: 'Priya', Class: '10' },
    { id: 4, name: 'Aayush', Class: '10' },
    { id: 5, name: 'Simmi', Class: '10' },
    { id: 6, name: 'Mukesh', Class: '10' },
  ];

  const tempteach = [
    { id: 100, name: 'Khushi', subject: 'Maths' },
    { id: 102, name: 'Muskan', subject: 'English' },
    { id: 103, name: 'Priya', subject: 'Hindi' },
    { id: 104, name: 'Aayush', subject: 'Maths' },
    { id: 105, name: 'Simmi', subject: 'Chemistry' },
    { id: 106, name: 'Mukesh', subject: 'Physics' },
  ];

  const defaultEvents = [
    { id: 1, title: 'Independence Day', date: '2025-08-15', description: 'Flag hoisting and celebration' },
    { id: 2, title: 'Annual Function', date: '2025-12-01', description: 'Annual cultural program' },
  ];

  const defaultResults = [
    { id: 1, studentId: 1, subject: 'Math', marks: 85 },
    { id: 2, studentId: 2, subject: 'English', marks: 92 },
  ];

  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [attendanceRecords, setAttendanceRecords] = useState({});
  const [customEvents, setCustomEvents] = useState([]);
  const [results, setResults] = useState(defaultResults);

  // Add student/teacher/event/result handlers
  const addStudent = (student) => {
    setStudents(prev => [...prev, student]);
  };

  const addTeacher = (teacher) => {
    setTeachers(prev => [...prev, teacher]);
  };

  const addEvent = (newEvent) => {
    const exists = allEvents.some(e => e.title === newEvent.title && e.date === newEvent.date);
    if (!exists) {
      setCustomEvents(prev => [...prev, { ...newEvent, id: Date.now() }]);
    }
  };

  const addResult = (result) => {
    setResults(prev => [...prev, result]);
  };

  const markAttendance = (studentId, date, status) => {
    setAttendanceRecords(prev => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [date]: status
      }
    }));
  };

  const allstudents = [...tempStudents, ...students];
  const allteachers = [...tempteach, ...teachers];
  const allEvents = [...defaultEvents, ...customEvents].filter(
    (event, index, self) =>
      index === self.findIndex(e => e.title === event.title && e.date === event.date)
  );

  return (
    <AppContext.Provider value={{
      enabledModules,
      toggleModule,
      theme,
      changeTheme,
      students: allstudents,
      teachers: allteachers,
      attendanceRecords,
      addStudent,
      addTeacher,
      markAttendance,
      events: allEvents,
      addEvent,
      results,
      addResult,
    }}>
      {children}
    </AppContext.Provider>
  );
};

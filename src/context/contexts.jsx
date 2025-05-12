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
    { id: 3, name: 'Priya', Class: '11' },
    { id: 4, name: 'Aayush', Class: '12' },
    { id: 5, name: 'Simmi', Class: '10' },
    { id: 6, name: 'Mukesh', Class: '10' },
    { id: 7, name: 'Khushi', Class: '9' },
    { id: 8, name: 'Radhika', Class: '10' },
    { id: 9, name: 'Muskan', Class: '11' },
    { id: 10, name: 'Aayush', Class: '12' },
    { id: 11, name: 'Simmi', Class: '8' },
    { id: 12, name: 'Vishwash', Class: '8' },
     { id: 13, name: 'Khushi', Class: '7' },
    { id: 21, name: 'Radhika', Class: '10' },
    { id: 31, name: 'Priya', Class: '7' },
    { id: 41, name: 'Aayush', Class: '12' },
    { id: 51, name: 'Simmi', Class: '7' },
    { id: 61, name: 'Monika', Class: '10' },
    { id: 71, name: 'Khushi', Class: '9' },
    { id: 81, name: 'Radhika', Class: '10' },
    { id: 91, name: 'Aniket', Class: '11' },
    { id: 101, name: 'Aayush', Class: '12' },
    { id: 111, name: 'Ayushi', Class: '8' },
    { id: 121, name: 'Mukesh', Class: '8' },
  ];

  const tempteach = [
    { id: 100, name: 'Khushi Verma', subject: 'Maths' },
    { id: 102, name: 'Muskan Malik', subject: 'English' },
    { id: 103, name: 'Priya Khatana', subject: 'Hindi' },
    { id: 104, name: 'Aayush Sharwat', subject: 'Geography' },
    { id: 105, name: 'Lokesh Sharma', subject: 'Chemistry' },
    { id: 106, name: 'Jitender verma', subject: 'Physics' },
      { id: 107, name: 'Monika Choudhary', subject: 'Art' },
        { id: 108, name: 'Dinesh Chandela', subject: 'Biology' },
          { id: 109, name: 'Mummta Singh', subject: 'Civices' },
           { id: 110, name: 'Rupak Sharma', subject: 'History' },
            { id: 112, name: 'Pankaj Yadav', subject: 'Ecommers' },
             { id: 113, name: 'Boby malik', subject: 'Dance' },
  ];

  const defaultEvents = [
    { id: 1, title: 'Independence Day', date: '2025-08-15', description: 'Flag hoisting and celebration' },
    { id: 2, title: 'Annual Function', date: '2025-12-01', description: 'Annual cultural program' },
  ];

  const defaultResults = [
    { id: 1, studentId: 1, subject: 'Math', marks: 85 },
     { id: 3, studentId: 1, subject: 'Hindi', marks: 80 },
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

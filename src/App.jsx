import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { AppContext } from './context/contexts';
import Dashboard from './components/dashboard';
import Layout from './components/logout';
import Login from './components/login';

import Students from './modules/students';
import Teachers from './modules/teachers';
import Attendance from './modules/Attendance';
import Events from './modules/Events';
import Results from './modules/Results';
import ReportGenerator from './modules/ReportGenerator';
import ModuleDashboard from './modules/ModuleDashboard'; // ✅ NEW IMPORT

import AdminPanel from './admin/AdminPanel';
import AdminStudents from './admin/adminstudent';
import AdminTeacher from './admin/adminteacher';
import AdminAttendance from './admin/Adminattendance';
import AdminEvents from './admin/Adminevent';
import AdminResults from './admin/Adminresults';
import AIReportGenerator from './admin/adminreport';
import AdminSettings from './admin/adminsettig';

function App() {
  //const { theme } = useContext(AppContext);

  return (

      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/admin/student" element={<AdminStudents />} />
          <Route path="/admin/teachers" element={<AdminTeacher />} />
          <Route path="/admin/attendance" element={<AdminAttendance />} />
          <Route path="/admin/events" element={<AdminEvents />} />
          <Route path="/admin/results" element={<AdminResults />} />
          <Route path="/admin/reports" element={<AIReportGenerator />} />
          <Route path="/admin/settings" element={<AdminSettings/>} />

          {/* Student Module Routes */}
          <Route path="/modules" element={<ModuleDashboard />} /> {/* ✅ MAIN ENTRY */}
          <Route path="/students" element={<Students />} />
          <Route path="/teachers" element={<Teachers />} />
          <Route path="/attendance" element={<Attendance />} />
          <Route path="/events" element={<Events />} />
          <Route path="/results" element={<Results />} />
          <Route path="/report" element={<ReportGenerator />} />
        </Routes>
      </Layout>
  );
}

export default App;

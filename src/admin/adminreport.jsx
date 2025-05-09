import React, { useContext } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AppContext } from '../context/contexts';
import './admin.css';
import { FaBrain } from "react-icons/fa";
import { FaDownload } from "react-icons/fa6";

const AIReportGenerator = () => {
  const { students, attendanceRecords, results } = useContext(AppContext);

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text('School Report Summary', 14, 20);

    // Attendance Alerts
    const attendanceAlerts = students
      .map(student => {
        const records = attendanceRecords[student.id];
        const totalDays = records ? Object.keys(records).length : 0;
        const presentDays = records
          ? Object.values(records).filter(status => status === 'Present').length
          : 0;
        const attendanceRate = totalDays > 0 ? (presentDays / totalDays) * 100 : 0;
        return {
          name: student.name,
          class: student.Class,
          attendance: attendanceRate.toFixed(2) + '%',
          status: attendanceRate < 75 ? 'Low Attendance' : 'OK',
        };
      })
      .filter(item => item.status === 'Low Attendance');

    if (attendanceAlerts.length > 0) {
      autoTable(doc, {
        startY: 30,
        head: [['Name', 'Class', 'Attendance %', 'Status']],
        body: attendanceAlerts.map(s => [s.name, s.class, s.attendance, s.status]),
      });
    } else {
      doc.text('No low attendance alerts.', 14, 40);
    }

    // Academic Trends
    const performanceData = students.map(student => {
      const studentResults = results.filter(r => r.studentId === student.id);
      const totalMarks = studentResults.reduce((sum, r) => sum + r.marks, 0);
      const avg = studentResults.length ? totalMarks / studentResults.length : 0;
      return { name: student.name, class: student.Class, avg: avg.toFixed(2) };
    });

    performanceData.sort((a, b) => b.avg - a.avg);
    const top5 = performanceData.slice(0, 5);

    doc.text('Top 5 Performers', 14, doc.lastAutoTable ? doc.lastAutoTable.finalY + 10 : 50);
    autoTable(doc, {
      startY: doc.lastAutoTable ? doc.lastAutoTable.finalY + 15 : 55,
      head: [['Name', 'Class', 'Average Marks']],
      body: top5.map(s => [s.name, s.class, s.avg]),
    });

    doc.save('School_Report.pdf');
  };

  return (
    <div className="admin-student-containers">
      <h2><FaBrain /> AI-Powered Report Generator</h2>
      <button onClick={generatePDF} className="btn-primary"><FaDownload /> Generate Report PDF</button>
    </div>
  );
};

export default AIReportGenerator;

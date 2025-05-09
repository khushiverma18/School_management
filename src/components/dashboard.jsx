import React from 'react';
import './component.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

const summaryData = [
  { title: 'STUDENTS', value: 3256, color: '#8B5CF6' },
  { title: 'EMPLOYEES', value: 68, color: '#F97316' },
  { title: 'CLASS', value: 12, color: '#06B6D4' },
  { title: 'REVENUE', value: '3,47,00', color: '#22C55E' },
];

const pieStats = [
  { name: 'Admission', value: 95, color: '#6366F1' },
  { name: 'Fees Collection', value: 60, color: '#F87171' },
  { name: 'Syllabus', value: 80, color: '#FBBF24' },
  { name: 'Sports', value: 20, color: '#34D399' },
];

const attendanceData = [
  { date: '04/01', student: 28, employee: 22 },
  { date: '04/02', student: 30, employee: 25 },
  { date: '04/03', student: 40, employee: 30 },
  { date: '04/04', student: 36, employee: 27 },
  { date: '04/05', student: 33, employee: 29 },
];

const feesDetails = [
  { id: 191, name: 'Khushi', class: '9th', fees: 3999, due: '03/16/2019' },
  { id: 192, name: 'John Doe', class: '10th', fees: 3999, due: '03/16/2019' },
  { id: 204, name: 'Kathy Johnson', class: '11th', fees: 1599, due: '03/21/2019' },
  { id: 306, name: 'Matt Parker', class: '12th.', fees: 1599, due: '04/01/2019' },
];

const resultData = [
  { year: '2018', score: 70 },
  { year: '2019', score: 75 },
  { year: '2020', score: 80 },
  { year: '2021', score: 90 },
];

const batchData = [
  { year: '2018', value: 25 },
  { year: '2019', value: 35 },
  { year: '2020', value: 28 },
  { year: '2021', value: 40 },
];

const Dashboard = () => {
  return (
    <div className="dashboard-containe">
      <div className="chart-grid">
        {summaryData.map((item) => (
          <div className="mini-card" key={item.title} style={{ borderLeftColor: item.color }}>
            <h4>{item.title}</h4>
            <p>{item.value}</p>
          </div>
        ))}
      </div>

      <h3 className="section-title">Daily Attendance Overview</h3>
      <AreaChart width={600} height={200} data={attendanceData}>
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Area type="monotone" dataKey="student" stroke="#8B5CF6" fill="#EDE9FE" />
        <Area type="monotone" dataKey="employee" stroke="#10B981" fill="#D1FAE5" />
      </AreaChart>

      <div className="chart-grid">
        {pieStats.map((stat) => (
          <PieChart width={150} height={150} key={stat.name}>
            <Pie data={[stat]} dataKey="value" outerRadius={50} label>
              <Cell key={`cell-${stat.name}`} fill={stat.color} />
            </Pie>
          </PieChart>
        ))}
      </div>

      <div className="calendar-box">
        <h4>Calendar</h4>
        <p>April 2019 (Mock Calendar)</p>
      </div>

      <h3 className="section-title">Student Fees Details</h3>
      <table className="fees-table">
        <thead>
          <tr>
            <th>Sr. No.</th><th>Name</th><th>Class</th><th>Fees</th><th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {feesDetails.map((fee) => (
            <tr key={fee.id}>
              <td>{fee.id}</td>
              <td>{fee.name}</td>
              <td>{fee.class}</td>
              <td>${fee.fees}</td>
              <td>{fee.due}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 className="section-title">Result Trends</h3>
      <BarChart width={600} height={250} data={resultData}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="score" fill="#3B82F6" />
      </BarChart>

      <h3 className="section-title">Batch Trends</h3>
      <BarChart width={600} height={250} data={batchData}>
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="value" fill="#10B981" />
      </BarChart>

      <div className="updates-box">
        <h4>Updates</h4>
        <ul>
          <li>Complete the class 12 syllabus in 3 months</li>
          <li>School organized quiz on 17th</li>
          <li>Volleyball tournament on 25th</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;

import React, { useContext, useState, useMemo } from 'react';
import { AppContext } from '../context/contexts';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title // Import Title for chart titles
} from 'chart.js';
import './modules.css'; // Ensure this path is correct

// Register the necessary components for Chart.js
ChartJS.register(ArcElement, Tooltip, Legend, Title);

const ViewAttendance = () => {
  const { students, teachers, attendanceRecords } = useContext(AppContext);
  const [viewType, setViewType] = useState('student'); // 'student' or 'teacher'
  const [displayMode, setDisplayMode] = useState('list'); // 'list' or 'chart'

  // Memoize the current list (students or teachers)
  const currentList = useMemo(() => {
    return (viewType === 'student' ? students : teachers) || [];
  }, [viewType, students, teachers]);

  // Memoize name lookup
  const getNameById = useMemo(() => {
    const map = new Map(currentList.map(p => [p.id.toString(), p.name]));
    return (id) => map.get(id.toString()) || 'Unknown';
  }, [currentList]);

  // Memoize the processed attendance list for display
  const processedAttendanceList = useMemo(() => {
    if (!attendanceRecords || Object.keys(attendanceRecords).length === 0) {
      return [];
    }

    const currentIds = new Set(currentList.map(p => p.id.toString()));

    return Object.entries(attendanceRecords)
      .flatMap(([id, recordsByDate]) =>
        currentIds.has(id.toString()) // Filter by current viewType (student/teacher)
          ? Object.entries(recordsByDate).map(([date, status]) => ({
              id,
              name: getNameById(id), // Add name directly for easier use
              date,
              status,
            }))
          : []
      )
      .sort((a, b) => new Date(b.date) - new Date(a.date) || a.name.localeCompare(b.name)); // Sort by date then name
  }, [attendanceRecords, currentList, getNameById]);


  // Data for Pie Chart - Overall attendance summary
  const chartData = useMemo(() => {
    if (processedAttendanceList.length === 0) {
      return null; // No data to chart
    }

    let presentCount = 0;
    let absentCount = 0;

    processedAttendanceList.forEach(record => {
      if (record.status === 'Present') {
        presentCount++;
      } else if (record.status === 'Absent') {
        absentCount++;
      }
    });

    if (presentCount === 0 && absentCount === 0) return null; // No valid attendance data

    return {
      labels: ['Present', 'Absent'],
      datasets: [
        {
          label: `Overall ${viewType === 'student' ? 'Student' : 'Teacher'} Attendance`,
          data: [presentCount, absentCount],
          backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
          borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
          borderWidth: 1,
        },
      ],
    };
  }, [processedAttendanceList, viewType]);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Allows chart to fit container better
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Overall Attendance Summary for ${viewType.charAt(0).toUpperCase() + viewType.slice(1)}s`,
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed !== null) {
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = total > 0 ? ((context.parsed / total) * 100).toFixed(1) + '%' : '0%';
              label += `${context.raw} (${percentage})`;
            }
            return label;
          }
        }
      }
    },
  };
  
  const getStatusClass = (status) => {
    if (status === 'Present') return 'present';
    if (status === 'Absent') return 'absent';
    return ''; // Default or no class
  };

  return (
    <div className="view-attendance-container"> {/* Changed from 'main' */}
      <h2>Attendance Records</h2>

      <div className="attendance-controls">
        <div className="view-type-selector">
          <label htmlFor="viewTypeSelect">View records for:</label>
          <select 
            id="viewTypeSelect"
            value={viewType}
            // className="dashboard-select" // Keep if used elsewhere, or remove if only local style
            onChange={(e) => setViewType(e.target.value)}
          >
            <option value="student">Students</option>
            <option value="teacher">Teachers</option>
          </select>
        </div>

        <div className="display-mode-selector">
          <label>Display as:</label>
          <button 
            onClick={() => setDisplayMode('list')}
            className={`display-toggle-button ${displayMode === 'list' ? 'active' : ''}`}
            disabled={displayMode === 'list'}
          >
            List
          </button>
          <button 
            onClick={() => setDisplayMode('chart')}
            className={`display-toggle-button ${displayMode === 'chart' ? 'active' : ''}`}
            disabled={displayMode === 'chart' || !chartData} // Disable if chart mode active or no data
          >
            Chart
          </button>
        </div>
      </div>

      {displayMode === 'list' && (
        processedAttendanceList.length > 0 ? (
          <ul className="attendance-records-list"> {/* Changed class name */}
            {processedAttendanceList.map((record, index) => (
              <li key={`${record.id}-${record.date}-${index}`} className="attendance-record-item"> {/* Changed class + unique key */}
                <p><strong>Name:</strong> {record.name}</p>
                <p><strong>Date:</strong> {record.date}</p>
                <p>
                  <strong>Status:</strong>{' '}
                  <span className={`record-status ${getStatusClass(record.status)}`}>
                    {record.status}
                  </span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-records-message">No attendance records available for the selected criteria.</p>
        )
      )}

      {displayMode === 'chart' && chartData && (
        <div className="attendance-chart-container">
          <Pie data={chartData} options={chartOptions} />
        </div>
      )}
      {displayMode === 'chart' && !chartData && (
         <p className="no-records-message">Not enough data to display chart for the selected criteria.</p>
      )}
    </div>
  );
};

export default ViewAttendance;
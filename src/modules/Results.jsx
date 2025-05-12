import React, { useContext, useMemo } from 'react';
import { AppContext } from '../context/contexts';
import './modules.css'; // Ensure this path is correct

const Results = () => {
  const { results, students } = useContext(AppContext);

  // Helper function to determine performance grade and apply CSS class
  const getPerformanceStyling = (marks) => {
    if (marks === null || marks === undefined) return { text: 'N/A', className: '' };
    if (marks >= 90) return { text: marks, className: 'grade-excellent' };
    if (marks >= 75) return { text: marks, className: 'grade-good' };
    if (marks >= 50) return { text: marks, className: 'grade-average' };
    return { text: marks, className: 'grade-poor' };
  };

  // Memoize the grouped results by student
  const groupedResultsByStudent = useMemo(() => {
    if (!results || results.length === 0 || !students || students.length === 0) {
      return [];
    }

    const studentDataMap = new Map();

    // Initialize map with student info from the students list
    students.forEach(student => {
      studentDataMap.set(student.id.toString(), {
        studentId: student.id,
        studentName: student.name,
        classDisplay: student.Class || student.class || 'N/A', // Primary class of student for display
        terms: {} // This will store term -> [subject results]
      });
    });

    // Populate results into the map
    results.forEach(result => {
      const studentIdStr = result.studentId.toString();
      if (studentDataMap.has(studentIdStr)) {
        const studentEntry = studentDataMap.get(studentIdStr);
        const termKey = result.term || 'General Results'; // Handle results without a specific term

        if (!studentEntry.terms[termKey]) {
          studentEntry.terms[termKey] = [];
        }
        studentEntry.terms[termKey].push({
          id: result.id, // original result ID for keying
          subject: result.subject,
          marks: result.marks,
          // The 'class' from the result object (result.class) is available if needed for sub-grouping
        });
      }
      // Optionally handle results for students not in the current students list,
      // or assume results are always for known students.
    });

    // Convert map to array, filter out students with no results, then sort students
    return Array.from(studentDataMap.values())
      .filter(student => Object.keys(student.terms).length > 0)
      .sort((a, b) => {
        const classComp = (a.classDisplay || '').localeCompare(b.classDisplay || '');
        if (classComp !== 0) return classComp;
        return (a.studentName || '').localeCompare(b.studentName || '');
      });
  }, [results, students]);

  return (
    <div className="results-display-container">
      <h2>Student Academic Results</h2>
      
      {groupedResultsByStudent.length === 0 ? (
        <p className="no-results-message">No results have been published yet.</p>
      ) : (
        <ul className="student-results-cards-list">
          {groupedResultsByStudent.map((student) => (
            <li key={student.studentId} className="student-results-card">
              <div className="student-card-header">
                <span className="student-name">{student.studentName}</span>
                <span className="student-class">Class: {student.classDisplay}</span>
              </div>
              
              <div className="terms-container">
                {Object.entries(student.terms)
                  // Optional: Sort terms (e.g., alphabetically or by a predefined order)
                  .sort(([termA], [termB]) => termA.localeCompare(termB)) 
                  .map(([term, subjectList]) => (
                    <div key={term} className="term-block">
                      <h3 className="term-title">{term}</h3>
                      <ul className="subject-marks-list">
                        {subjectList
                          // Optional: Sort subjects within a term alphabetically
                          .sort((a,b) => (a.subject || '').localeCompare(b.subject || ''))
                          .map((item) => {
                            const performance = getPerformanceStyling(item.marks);
                            return (
                              <li key={item.id} className="subject-marks-item">
                                <span className="subject-name">{item.subject}</span>
                                <span className={`marks-value ${performance.className}`}>
                                  {performance.text}
                                </span>
                              </li>
                            );
                          })}
                      </ul>
                    </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Results;
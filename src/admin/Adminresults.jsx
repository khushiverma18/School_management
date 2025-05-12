import React, { useContext, useState, useMemo, useEffect } from 'react';
import { AppContext } from '../context/contexts';
import './admin.css'; // Assuming this file has common admin styles

const AdminResults = () => {
  const { students, addResult } = useContext(AppContext);

  const [selectedClass, setSelectedClass] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [subject, setSubject] = useState('');
  const [marks, setMarks] = useState('');
  const [term, setTerm] = useState(''); // e.g., 'Midterm', 'Final', 'Unit Test 1'

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Memoize the list of unique classes available from students
  const availableClasses = useMemo(() => {
    if (!students || students.length === 0) return [];
    const classSet = new Set();
    students.forEach(student => {
      const studentClass = student.Class || student.class; // Handle potential variations
      if (studentClass) {
        classSet.add(studentClass);
      }
    });
    return Array.from(classSet).sort(); // Sort for consistent order
  }, [students]);

  // Memoize the list of students filtered by the selected class
  const filteredStudents = useMemo(() => {
    if (!selectedClass || !students) return [];
    return students.filter(student => (student.Class || student.class) === selectedClass);
  }, [selectedClass, students]);

  // Effect to reset student selection if the class changes and the selected student is no longer valid
  useEffect(() => {
    if (selectedStudent && selectedClass) {
      const studentExistsInClass = filteredStudents.some(s => s.id.toString() === selectedStudent);
      if (!studentExistsInClass) {
        setSelectedStudent(''); // Reset student if not in the newly selected class
      }
    }
  }, [selectedClass, selectedStudent, filteredStudents]);


  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (!selectedClass || !selectedStudent || !subject.trim() || !marks.trim() || !term.trim()) {
      setError("All fields (Class, Student, Subject, Term, and Marks) are required.");
      return;
    }

    const marksValue = parseInt(marks, 10);
    if (isNaN(marksValue) || marksValue < 0 || marksValue > 100) { // Assuming marks are out of 100
      setError("Marks must be a number between 0 and 100.");
      return;
    }

    const newResult = {
      id: Date.now().toString(),
      studentId: parseInt(selectedStudent, 10),
      class: selectedClass, // Store the class for easier filtering/display later
      subject: subject.trim(),
      term: term.trim(),
      marks: marksValue
    };

    addResult(newResult); // Ensure addResult in AppContext handles the new 'class' and 'term' fields
    
    // Reset form fields (except class, user might add multiple results for the same class)
    setSelectedStudent('');
    setSubject('');
    setMarks('');
    setTerm('');
    setSuccessMessage(`Result for subject "${subject.trim()}" added successfully for student.`);

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="admin-form-container"> {/* Using the consistent container class */}
      <h2>Add Student Result</h2>

      {error && <p className="form-error-message">{error}</p>}
      {successMessage && <p className="form-success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit} className="admin-entity-form"> {/* Using consistent form class */}
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="selectClass">Select Class <span className="required-asterisk">*</span></label>
            <select
              id="selectClass"
              value={selectedClass}
              onChange={(e) => {
                setSelectedClass(e.target.value);
                setSelectedStudent(''); // Reset student when class changes
                setError(''); // Clear previous errors
              }}
              required
            >
              <option value="">-- Select Class --</option>
              {availableClasses.map(cls => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="selectStudent">Select Student <span className="required-asterisk">*</span></label>
            <select
              id="selectStudent"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              disabled={!selectedClass || filteredStudents.length === 0} // Disable if no class selected or no students in class
              required
            >
              <option value="">-- Select Student --</option>
              {filteredStudents.map(student => (
                <option key={student.id} value={student.id}>
                  {student.name} (ID: {student.id})
                </option>
              ))}
            </select>
            {!selectedClass && <small className="form-text text-muted">Please select a class first.</small>}
            {selectedClass && filteredStudents.length === 0 && <small className="form-text text-muted">No students found in this class.</small>}
          </div>

          <div className="form-group">
            <label htmlFor="subject">Subject <span className="required-asterisk">*</span></label>
            <input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g., Mathematics"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="term">Term/Exam Name <span className="required-asterisk">*</span></label>
            <input
              id="term"
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              placeholder="e.g., Midterm, Final, Unit Test 1"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="marks">Marks Obtained <span className="required-asterisk">*</span></label>
            <input
              id="marks"
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              placeholder="e.g., 85"
              min="0" // Basic HTML5 validation
              max="100" // Assuming max marks are 100
              required
            />
          </div>
        </div>

        <button type="submit" className="submit-button">Add Result</button>
      </form>
    </div>
  );
};

export default AdminResults;
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/contexts';
import './admin.css';
import { IoPersonSharp } from "react-icons/io5";

const AdminStudents = () => {
  const { addStudent } = useContext(AppContext);
  const [student, setStudent] = useState({
    name: '',
    class: '',
    section: '',
    rollNumber: '',
    admissionNumber: '',
    dob: '',
    gender: '',
    address: '',
    contact: '',
    email: '',
    parentName: '',
    parentContact: '',
    bloodGroup: '',
    healthIssues: ''
  });

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (student.name.trim() && student.class.trim()) {
      addStudent({ id: Date.now(), ...student });
      setStudent({
        name: '',
        class: '',
        section: '',
        rollNumber: '',
        admissionNumber: '',
        dob: '',
        gender: '',
        address: '',
        contact: '',
        email: '',
        parentName: '',
        parentContact: '',
        bloodGroup: '',
        healthIssues: ''
      });
    }
  };

  return (
    <div className="admin-student-container">
      <h2><IoPersonSharp />Add New Student</h2>
      <form onSubmit={handleAdd} className="admin-student-form">
        <input name="name" value={student.name} onChange={handleChange} placeholder="Full Name" />
        <input name="class" value={student.class} onChange={handleChange} placeholder="Class" />
        <input name="section" value={student.section} onChange={handleChange} placeholder="Section" />
        <input name="rollNumber" value={student.rollNumber} onChange={handleChange} placeholder="Roll Number" />
        <input name="admissionNumber" value={student.admissionNumber} onChange={handleChange} placeholder="Admission Number" />
        <input name="dob" value={student.dob} onChange={handleChange} placeholder="Date of Birth" type="date" />
        <select name="gender" value={student.gender} onChange={handleChange}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <textarea name="address" value={student.address} onChange={handleChange} placeholder="Address" />
        <input name="contact" value={student.contact} onChange={handleChange} placeholder="Contact Number" />
        <input name="email" value={student.email} onChange={handleChange} placeholder="Email" />
        <input name="parentName" value={student.parentName} onChange={handleChange} placeholder="Parent Name" />
        <input name="parentContact" value={student.parentContact} onChange={handleChange} placeholder="Parent Contact" />
        <input name="bloodGroup" value={student.bloodGroup} onChange={handleChange} placeholder="Blood Group" />
        <textarea name="healthIssues" value={student.healthIssues} onChange={handleChange} placeholder="Health Issues (if any)" />

        <button type="submit">Add Student</button>
      </form>
    </div>
  );
};

export default AdminStudents;

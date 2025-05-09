import React, { useContext, useState } from 'react';
import { AppContext } from '../context/contexts';
import './admin.css';

const AdminStudents = () => {
  const { addStudent } = useContext(AppContext);
  const [name, setName] = useState("");
  const [Class, setClass] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (name.trim() && Class.trim()) {
      addStudent({ id: Date.now(), name, class: Class }); // Include class here
      setName("");
      setClass("");
    }
  };

  return (
    <div className="admin-student-container">
      <h2>Add Student</h2>
      <form onSubmit={handleAdd} className="admin-student-form">
        <input
          type="text"
          value={name}
          placeholder="Student Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={Class}
          placeholder="Student Class"
          onChange={(e) => setClass(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AdminStudents;

import React, { useContext, useState } from 'react';
import { AppContext } from '../context/contexts';
import './admin.css';

const Adminteacher = () => {
  const { addTeacher } = useContext(AppContext);
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    if (name.trim() && subject.trim()) {
      addTeacher({ id: Date.now(), name, subject: subject }); // Include class here
      setName("");
      setSubject("");
    }
  };

  return (
    <div className="admin-student-container">
      <h2>Add Teachers</h2>
      <form onSubmit={handleAdd} className="admin-student-form">
        <input
          type="text"
          value={name}
          placeholder="Teacher Name"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          value={subject}
          placeholder="Teacher Subject"
          onChange={(e) => setSubject(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default Adminteacher;

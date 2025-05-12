// src/admin/AdminEvents.jsx
import React, { useContext, useState } from 'react';
import { AppContext } from '../context/contexts';
import './admin.css';

const AdminEvents = () => {
  const { events, addEvent } = useContext(AppContext);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !description) return;
    addEvent({ id: Date.now(), title, date, description });
    setTitle('');
    setDate('');
    setDescription('');
  };

  return (
    <div className="admin-event-container">
      <h2>Add School Event</h2>
      <form onSubmit={handleSubmit} className="event-form">
        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        <textarea
          placeholder="Event Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <button type="submit">Add Event</button>
      </form>
<div className="event-grid">
      <h3>Upcoming Events</h3>
  {events.map(event => (
    <div key={event.id} className="event-card">
      <h4>{event.title}</h4>
      <p className="event-date">{event.date}</p>
      <p className="event-description">{event.description}</p>
    </div>
  
  ))}
  
</div>
    </div>
  );
};

export default AdminEvents;

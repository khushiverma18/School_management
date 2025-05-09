// src/modules/Events.jsx
import React, { useContext } from 'react';
import { AppContext } from '../context/contexts';
import './modules.css';

const Events = () => {
  const { events } = useContext(AppContext);

  // Filter to avoid duplicate events based on title + date
  const uniqueEvents = events.filter(
    (event, index, self) =>
      index === self.findIndex(e => e.title === event.title && e.date === event.date)
  );

  return (
    <div className="module-event-container">
      <h2 >Upcoming Events</h2>
      {uniqueEvents.length === 0 ? (
        <p className="text-gray-600">No events scheduled.</p>
      ) : (
        <ul className="event-list">
          {uniqueEvents.map(event => (
            <li key={event.id} className="student-lists">
              <p><strong>{event.title}</strong> - {event.date}</p>
              <p>{event.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Events;

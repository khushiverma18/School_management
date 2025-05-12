// src/modules/Events.jsx
import React, { useContext } from 'react';
import { AppContext } from '../context/contexts';
import './modules.css'; // Ensure this path is correct



const Events = () => {
  const { events } = useContext(AppContext);

  const uniqueDisplayEvents = (events || []).filter(
    (event, index, self) =>
      index === self.findIndex(e => e.title === event.title && e.date === event.date)
  );

   const formatDateForCard = (dateString) => {
    if (!dateString) return 'Date TBD';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short', // "Jul"
        day: 'numeric',   // "29"
        year: 'numeric',  // "2024"
      });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="page-layout-container events-two-tone-page"> {/* Main page wrapper */}
      {/* Bottom Dark Section - Contains the event cards */}
      <div className="page-section">
        <h2>Upcoming Events</h2>
        <div className="section-content-limiter"> {/* To control width of content within this section */}
          {uniqueDisplayEvents.length === 0 ? (
            <p className="themed-no-events-message dark-section-message">
              No events currently scheduled. Please check back soon!
            </p>
          ) : (
            <ul className="upcoming-events-cards">
  {uniqueDisplayEvents.map((event, index) => {
    const dateObj = new Date(event.date);
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString('default', { month: 'short' }).toUpperCase();

    return (
      <li key={event.id || `${event.title}-${index}`} className={`event-card color-${index % 4}`}>
        <div className="event-card-header">
          <span className="event-month">{month}</span>
          <span className="event-day">{String(day).padStart(2, '0')}</span>
        </div>
        <div className="event-card-body">
          <h3 className='title'>{event.title}</h3>
          <p>{event.description || 'No description available'}</p>
        </div>
      </li>
    );
  })}
</ul>

          )}
        </div>
      </div>
    </div>
  );
};

export default Events;
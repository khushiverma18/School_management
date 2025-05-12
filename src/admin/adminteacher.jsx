import React, { useContext, useState } from 'react';
import { AppContext } from '../context/contexts';
import './admin.css'; // Assuming this file has general styles for admin sections

const AdminTeacher = () => {
  const { addTeacher } = useContext(AppContext); // Make sure addTeacher can handle the new fields

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState(new Date().toISOString().slice(0, 10)); // Default to today
  const [qualifications, setQualifications] = useState("");
  const [employeeId, setEmployeeId] = useState(""); // Optional: Could be auto-generated or manual
  const [address, setAddress] = useState(""); // Optional but common

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    // Basic Validation
    if (!name.trim() || !subject.trim() || !email.trim()) {
      setError("Name, Subject, and Email are required.");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
        setError("Please enter a valid email address.");
        return;
    }

    const newTeacher = {
      id: Date.now().toString(), // Ensure ID is a string if other IDs are
      name: name.trim(),
      subject: subject.trim(),
      email: email.trim(),
      phone: phone.trim(),
      dateOfJoining,
      qualifications: qualifications.trim(),
      employeeId: employeeId.trim(), // Add if you want to include it
      address: address.trim()
    };

    // Assuming addTeacher is prepared to handle these new fields
    addTeacher(newTeacher);

    setSuccessMessage(`Teacher "${name.trim()}" added successfully!`);

    // Clear form fields
    setName("");
    setSubject("");
    setEmail("");
    setPhone("");
    setDateOfJoining(new Date().toISOString().slice(0, 10));
    setQualifications("");
    setEmployeeId("");
    setAddress("");

    // Optionally, clear success message after a few seconds
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  return (
    <div className="admin-form-container"> {/* Changed class for better distinction */}
      <h2>Add New Teacher</h2>
      
      {error && <p className="form-error-message">{error}</p>}
      {successMessage && <p className="form-success-message">{successMessage}</p>}

      <form onSubmit={handleAdd} className="admin-entity-form"> {/* Changed class */}
        <div className="form-grid">
          <div className="form-group">
            <label htmlFor="teacherName">Full Name <span className="required-asterisk">*</span></label>
            <input
              id="teacherName"
              type="text"
              value={name}
              placeholder="e.g., Jane Doe"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="teacherSubject">Primary Subject <span className="required-asterisk">*</span></label>
            <input
              id="teacherSubject"
              type="text"
              value={subject}
              placeholder="e.g., Mathematics"
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="teacherEmail">Email Address <span className="required-asterisk">*</span></label>
            <input
              id="teacherEmail"
              type="email"
              value={email}
              placeholder="e.g., jane.doe@example.com"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="teacherPhone">Phone Number</label>
            <input
              id="teacherPhone"
              type="tel"
              value={phone}
              placeholder="e.g., (555) 123-4567"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="teacherDoj">Date of Joining</label>
            <input
              id="teacherDoj"
              type="date"
              value={dateOfJoining}
              onChange={(e) => setDateOfJoining(e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="teacherEmployeeId">Employee ID</label>
            <input
              id="teacherEmployeeId"
              type="text"
              value={employeeId}
              placeholder="e.g., TCH-00123"
              onChange={(e) => setEmployeeId(e.target.value)}
            />
          </div>

          <div className="form-group full-width"> {/* Spans full width in grid */}
            <label htmlFor="teacherQualifications">Qualifications</label>
            <textarea
              id="teacherQualifications"
              value={qualifications}
              placeholder="e.g., M.Sc. in Physics, B.Ed."
              onChange={(e) => setQualifications(e.target.value)}
              rows="3"
            />
          </div>
          
          <div className="form-group full-width">
            <label htmlFor="teacherAddress">Address</label>
            <textarea
              id="teacherAddress"
              value={address}
              placeholder="e.g., 123 Main St, Anytown, USA"
              onChange={(e) => setAddress(e.target.value)}
              rows="3"
            />
          </div>
        </div>

        <button type="submit" className="submit-button">Add Teacher</button>
      </form>
    </div>
  );
};

export default AdminTeacher;
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './PostPatient.css'; // Optional CSS file for styling

const PostPatient = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [medicalCondition, setMedicalCondition] = useState('');
  const [wearableId, setWearableId] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await axios.post('http://localhost:8081/api/patients/add', {
        name,
        age,
        medicalCondition,
        wearableId,
      });

      // Redirect to the Patient List page after successfully adding the patient
      navigate('/patients'); // Navigate back to the patient list
    } catch (err) {
      setError('Error adding patient.');
    }
  };

  return (
    <div className="post-patient-container">
      <h2>Add Patient</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit} className="post-patient-form">
        <div className="form-group">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="medicalCondition">Medical Condition:</label>
          <input
            type="text"
            id="medicalCondition"
            value={medicalCondition}
            onChange={(e) => setMedicalCondition(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="wearableId">Wearable ID:</label>
          <input
            type="text"
            id="wearableId"
            value={wearableId}
            onChange={(e) => setWearableId(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Add Patient
        </button>
      </form>
    </div>
  );
};

export default PostPatient;

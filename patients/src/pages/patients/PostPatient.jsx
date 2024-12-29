import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './PostPatient.css';

const PostPatient = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [medicalCondition, setMedicalCondition] = useState('');
  const [wearableId, setWearableId] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [radius, setRadius] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    // Retrieve userId from localStorage
    const caregiverId = localStorage.getItem('userId');

    if (!caregiverId) {
      setError('User ID is not available. Please log in again.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8081/api/patients/add', {
        name,
        age,
        medicalCondition,
        wearableId,
        caregiverId,  // Send the caregiverId with the new patient
        safeZone: {    // Send safe zone data with the patient
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          radius: parseFloat(radius)
        }
      });

      // Redirect to the Patient List page after successfully adding the patient
      navigate('/patients');
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
            type="number"
            id="wearableId"
            value={wearableId}
            onChange={(e) => setWearableId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="latitude">Latitude:</label>
          <input
            type="number"
            id="latitude"
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="longitude">Longitude:</label>
          <input
            type="number"
            id="longitude"
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="radius">Radius:</label>
          <input
            type="number"
            id="radius"
            value={radius}
            onChange={(e) => setRadius(e.target.value)}
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

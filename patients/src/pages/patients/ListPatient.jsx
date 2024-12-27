import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListPatient.css';

const ListPatient = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch patient data when the component is mounted
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/patients');
        setPatients(response.data);
      } catch (err) {
        setError('Error fetching patient data.');
      }
    };

    fetchPatients();
  }, []); // Empty array ensures this effect runs only once on mount

  // Function to navigate to the Add Patient page
  const handleAddPatient = () => {
    navigate('/add-patient');
  };

  // Function to handle editing a patient
  const handleEditPatient = (userId) => {
    // Navigate to the EditPatient page with the patient userId
    navigate(`/patients/edit/${userId}`);
  };

  // Function to handle deleting a patient
  const handleDeletePatient = async (userId) => {
    try {
      await axios.delete(`http://localhost:8081/api/patients/${userId}`); // Use patient userId for delete request
      setPatients(patients.filter(patient => patient.userId !== userId)); // Remove deleted patient from state
    } catch (err) {
      setError('Error deleting patient.');
    }
  };

  return (
    <div className="patient-list-container">
      <h2>Patient List</h2>
      {error && <p className="error-message">{error}</p>}
      <button onClick={handleAddPatient} className="add-patient-button">
        Add Patient
      </button>
      <table className="patient-table">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Age</th>
            <th>Medical Condition</th>
            <th>Wearable ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((patient) => {
              // Log the userId of each patient
              console.log('Patient userId:', patient.userId);
              return (
                <tr key={patient.userId}> {/* Use userId as the key */}
                  <td>{patient.name}</td>
                  <td>{patient.age}</td>
                  <td>{patient.medicalCondition}</td>
                  <td>{patient.wearableId}</td>
                  <td>
                    <button onClick={() => handleEditPatient(patient.userId)}>Edit</button>
                    <button onClick={() => handleDeletePatient(patient.userId)}>Delete</button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="5">No patients found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ListPatient;

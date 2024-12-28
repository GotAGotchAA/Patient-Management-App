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
        console.log(response.data);
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
  const handleEditPatient = (id) => {
    // Navigate to the EditPatient page with the patient ID
    navigate(`/patients/edit/${id}`);
  };

  // Function to handle deleting a patient
  const handleDeletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/patients/${id}`); // Use patient ID for delete request
      setPatients(patients.filter(patient => patient.id !== id)); // Remove deleted patient from state
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
            patients.map((patient) => (
              <tr key={patient.id}> {/* Use the unique ID as the key */}
                <td>{patient.name}</td>
                <td>{patient.age}</td>
                <td>{patient.medicalCondition}</td>
                <td>{patient.wearableId}</td>
                <td>
                  <button onClick={() => handleEditPatient(patient.id)}>Edit</button>
                  <button onClick={() => handleDeletePatient(patient.id)}>Delete</button>
                </td>
              </tr>
            ))
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

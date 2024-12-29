import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './ListPatient.css';

const ListPatient = () => {
  const [patients, setPatients] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Get the user's ID from localStorage

  useEffect(() => {
    if (!userId) {
      setError('User ID not found.');
      return;
    }

    // Fetch patient data when the component is mounted
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/patients');
        console.log(response.data); // Log the full patient data for debugging

        // Check if caregiverId exists and matches the userId
        const filteredPatients = response.data.filter(patient => {
          console.log(patient.caregiverId, userId); // Log caregiverId and userId for debugging
          return String(patient.caregiverId) === String(userId); // Compare as strings
        });

        setPatients(filteredPatients);
        console.log(filteredPatients); // Log filtered patients
      } catch (err) {
        setError('Error fetching patient data.');
      }
    };

    fetchPatients();
  }, [userId]); // Rerun effect if userId changes

  // Function to navigate to the Add Patient page
  const handleAddPatient = () => {
    navigate('/add-patient');
  };

  // Function to handle editing a patient
  const handleEditPatient = (id) => {
    navigate(`/patients/edit/${id}`);
  };

  // Function to handle deleting a patient
  const handleDeletePatient = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/patients/${id}`);
      setPatients(patients.filter(patient => patient.id !== id)); // Remove deleted patient from state
    } catch (err) {
      setError('Error deleting patient.');
    }
  };

  // Function to navigate to the Patient Details page
  const handleViewPatientDetails = (id) => {
    navigate(`/patients/${id}`);
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
              <tr key={patient.id}>
                <td>
                  <button onClick={() => handleViewPatientDetails(patient.id)}>
                    {patient.name}
                  </button>
                </td>
                <td>{patient.age}</td>
                <td>{patient.medicalCondition}</td>
                <td>{patient.wearableId}</td>
                <td>
                  <button onClick={() => handleEditPatient(patient.id)}className='edit-button'>Edit</button>
                  <button onClick={() => handleDeletePatient(patient.id)}className="delete-button">Delete</button>
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

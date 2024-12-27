import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditPatient = () => {
  const { userId } = useParams();  // Get userId from the route params
  const [patient, setPatient] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the patient data by userId
    const fetchPatient = async () => {
      try {
        const response = await axios.get(`http://localhost:8081/api/patients/${userId}`);
        setPatient(response.data);
      } catch (err) {
        setError('Error fetching patient data.');
      }
    };

    if (userId) {
      fetchPatient();
    }
  }, [userId]); // The effect runs when userId changes

  const handleUpdatePatient = async () => {
    try {
      await axios.put(`http://localhost:8081/api/patients/${userId}`, patient);
      navigate('/patients'); // Redirect to patients list after updating
    } catch (err) {
      setError('Error updating patient.');
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!patient) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Edit Patient</h2>
      <form>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={patient.name}
            onChange={(e) => setPatient({ ...patient, name: e.target.value })}
          />
        </div>
        <div>
          <label>Age</label>
          <input
            type="number"
            value={patient.age}
            onChange={(e) => setPatient({ ...patient, age: e.target.value })}
          />
        </div>
        <div>
          <label>Medical Condition</label>
          <input
            type="text"
            value={patient.medicalCondition}
            onChange={(e) => setPatient({ ...patient, medicalCondition: e.target.value })}
          />
        </div>
        <div>
          <label>Wearable ID</label>
          <input
            type="text"
            value={patient.wearableId}
            onChange={(e) => setPatient({ ...patient, wearableId: e.target.value })}
          />
        </div>
        <button type="button" onClick={handleUpdatePatient}>Update Patient</button>
      </form>
    </div>
  );
};

export default EditPatient;

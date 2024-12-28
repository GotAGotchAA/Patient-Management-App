import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Alert = () => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get('http://localhost:8083/api/alerts');
        setAlerts(response.data);
      } catch (err) {
        setError('Error fetching alerts.');
      }
    };

    // Fetch alerts every 10 seconds
    fetchAlerts(); // Initial fetch
    const interval = setInterval(fetchAlerts, 10000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="alerts-container">
      <h2>Patient Alerts</h2>
      {error && <p className="error-message">{error}</p>}
      {alerts.length > 0 ? (
        <ul>
          {alerts.map((alert) => (
            <li key={alert.id} className="alert-item">
              <strong>Patient ID:</strong> {alert.patientId} <br />
              <strong>Type:</strong> {alert.type} <br />
              <strong>Description:</strong> {alert.description} <br />
              <strong>Time:</strong> {new Date(alert.timestamp).toLocaleString()} <br />
              <strong>Status:</strong> {alert.status} <br />
            </li>
          ))}
        </ul>
      ) : (
        <p>No alerts at the moment.</p>
      )}
    </div>
  );
};

export default Alert;

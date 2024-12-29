import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Alerts.css';

const Alert = () => {
  const [alerts, setAlerts] = useState([]);

  // Fetch alerts and corresponding patient details from the backend
  useEffect(() => {
    const fetchAlertsWithPatientDetails = async () => {
      try {
        const response = await axios.get('http://localhost:8083/api/alerts');
        const alerts = response.data;

        // Fetch patient details for each alert
        const alertsWithPatientNames = await Promise.all(
          alerts.map(async (alert) => {
            try {
              const patientResponse = await axios.get(
                `http://localhost:8081/api/patients/${alert.patientId}`
              );
              return { ...alert, name: patientResponse.data.name };
            } catch (error) {
              console.error(`Error fetching patient details for ID ${alert.patientId}:`, error);
              return { ...alert, name: 'Unknown' }; // Fallback name
            }
          })
        );

        setAlerts(alertsWithPatientNames);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    fetchAlertsWithPatientDetails();
  }, []);

  // Function to update the alert status
  const updateAlertStatus = async (alertId, newStatus) => {
    try {
      await axios.put(`http://localhost:8083/api/alerts/${alertId}/status?status=${newStatus}`);
      setAlerts((prevAlerts) =>
        prevAlerts.map((alert) =>
          alert.id === alertId ? { ...alert, status: newStatus } : alert
        )
      );
    } catch (error) {
      console.error(`Error updating alert status for Alert ID ${alertId}:`, error);
    }
  };

  return (
    <div className="alert-container">
      <h1>Alerts</h1>
      {alerts.length === 0 ? (
        <p className="no-alerts-message">No alerts available</p>
      ) : (
        <table className="alert-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Type</th>
              <th>Description</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {alerts.map((alert) => (
              <tr key={alert.id}>
                <td>{alert.name}</td>
                <td>{alert.type}</td>
                <td>{alert.message || 'No description provided'}</td>
                <td>{new Date(alert.timestamp).toLocaleString()}</td>
                <td>{alert.status}</td>
                <td>
                  {(alert.status === 'New' ||
                    alert.status === 'Safe Zone Breach' ||
                    alert.status === 'Unusual Movement') ? (
                    <>
                      <button
                        className="acknowledge-button"
                        onClick={() => updateAlertStatus(alert.id, 'Acknowledged')}
                      >
                        Acknowledge
                      </button>
                      <button
                        className="resolve-button"
                        onClick={() => updateAlertStatus(alert.id, 'Resolved')}
                      >
                        Resolve
                      </button>
                    </>
                  ) : (
                    <span>No actions available</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Alert;

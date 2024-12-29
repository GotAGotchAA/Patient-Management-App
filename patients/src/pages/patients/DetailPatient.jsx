import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import MapComponent from "../map/MapComponent";
import './DetailPatient.css';  // Importing the CSS file

const PatientDetails = () => {
  const { userId } = useParams();
  const [patient, setPatient] = useState(null);
  const [locations, setLocations] = useState([]);
  const [loadingPatient, setLoadingPatient] = useState(true);
  const [loadingLocations, setLoadingLocations] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        setLoadingPatient(true);
        const response = await axios.get(`http://localhost:8081/api/patients/${userId}`);
        setPatient(response.data);
        setLoadingPatient(false);

        if (response.data?.wearableId) {
          fetchLocations(response.data.wearableId);
        }
      } catch (err) {
        console.error("Error fetching patient details:", err);
        setError("Error fetching patient details.");
        setLoadingPatient(false);
      }
    };

    const fetchLocations = async (wearableId) => {
      try {
        setLoadingLocations(true);
        const locationResponse = await axios.get(`http://localhost:8082/api/locations/${wearableId}`);
        setLocations(locationResponse.data);
        setLoadingLocations(false);
      } catch (err) {
        console.error("Error fetching location data:", err);
        setError("Error fetching location data.");
        setLoadingLocations(false);
      }
    };

    if (userId) {
      fetchPatient();
    }
  }, [userId]);

  if (loadingPatient) return <p className="loading">Loading patient details...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="patient-details-container">
      <h2>Patient Details</h2>
      <p><strong>Name:</strong> {patient?.name || "N/A"}</p>
      <p><strong>Age:</strong> {patient?.age || "N/A"}</p>
      <p><strong>Medical Condition:</strong> {patient?.medicalCondition || "N/A"}</p>
      <p><strong>Wearable ID:</strong> {patient?.wearableId || "N/A"}</p>

      <h3>SafeZone / Last Known Locations</h3>
      {loadingLocations ? (
        <p className="loading">Loading location data...</p>
      ) : (
        <>
          {locations.length > 0 ? (
            <>
              <ul>
                {locations.map((location, index) => (
                  <li key={index}>
                    <strong>Location {index + 1}:</strong> Latitude {location.latitude}, Longitude {location.longitude}
                  </li>
                ))}
              </ul>
              <div className="map-container">
                <MapComponent locations={locations} />
              </div>
            </>
          ) : (
            <p>No location data available.</p>
          )}
        </>
      )}
    </div>
  );
};

export default PatientDetails;

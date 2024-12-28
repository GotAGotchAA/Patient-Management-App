// src/components/MapComponent.jsx
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';  // Import Leaflet library for custom markers
import 'leaflet/dist/leaflet.css';  // Import Leaflet CSS

const MapComponent = ({ latitude, longitude, radius }) => {
  const [center, setCenter] = useState([latitude, longitude]);

  useEffect(() => {
    setCenter([latitude, longitude]);
  }, [latitude, longitude]);

  return (
    <MapContainer center={center} zoom={13} style={{ width: '100%', height: '400px' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center}>
        <Popup>
          <div>
            <h4>Patient's Safe Zone</h4>
            <p>Latitude: {latitude}</p>
            <p>Longitude: {longitude}</p>
            <p>Radius: {radius} meters</p>
          </div>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;

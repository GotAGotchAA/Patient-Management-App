import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import "./Location.css";

const MapComponent = ({ locations }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Debug: Log the locations data
  useEffect(() => {
    console.log("Locations Data: ", locations); // Check locations data
  }, [locations]);

  const mapContainerStyle = {
    height: "400px",
    width: "100%",
  };

  // Default center in case no location is provided
  const center = {
    lat: locations[0]?.latitude || 34.052235, // Default to San Francisco
    lng: locations[0]?.longitude || -118.243683, // Default to San Francisco
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyA52VJEnX8ec4zOmEDR-MpdxeGPzKs7s-E">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
      >
        {/* Debugging: Log if markers are being rendered */}
        {locations.length > 0 && locations.map((loc, index) => {
          console.log(`Rendering marker at ${loc.latitude}, ${loc.longitude}`); // Log marker placement
          return (
            <Marker
              key={index}
              position={{ lat: loc.latitude, lng: loc.longitude }}
              onClick={() => setSelectedLocation(loc)}
            />
          );
        })}

        {selectedLocation && (
          <InfoWindow
            position={{
              lat: selectedLocation.latitude,
              lng: selectedLocation.longitude,
            }}
            onCloseClick={() => setSelectedLocation(null)}
          >
            <div>
              <h2>{`Location ID: ${selectedLocation.id}`}</h2>
              <p>{`Timestamp: ${selectedLocation.timestamp}`}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;

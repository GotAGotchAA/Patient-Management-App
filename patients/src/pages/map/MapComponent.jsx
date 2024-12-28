import React, { useState } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";

const MapComponent = ({ locations }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const mapContainerStyle = {
    height: "400px",
    width: "100%",
  };

  const center = {
    lat: locations[0]?.latitude || 34.052235, // Default to San Francisco
    lng: locations[0]?.longitude || -118.243683,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyDUP9KEwJgyv1PpGQml5c9kAn18mNeZnB8">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={13}
      >
        {locations.map((loc, index) => (
          <Marker
            key={index}
            position={{ lat: loc.latitude, lng: loc.longitude }}
            onClick={() => setSelectedLocation(loc)}
          />
        ))}

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

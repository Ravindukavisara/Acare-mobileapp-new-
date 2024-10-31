// web-app/src/components/MapModal.js
import React, { useState, useCallback } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import './MapModal.css';

const mapContainerStyle = {
  width: '100%',
  height: '400px',
};

const mapOptions = {
  disableDefaultUI: true,
  zoomControl: true,
};

function MapModal({ isOpen, onClose, onSelectLocation }) {
  const [selectedPosition, setSelectedPosition] = useState(null);

  const handleMapClick = useCallback((event) => {
    const lat = event.latLng.lat();
    const lng = event.latLng.lng();
    setSelectedPosition({ lat, lng });
  }, []);
       

  const handleConfirmLocation = () => {
    if (selectedPosition) {
      onSelectLocation(selectedPosition);
      onClose(); // Close modal after selection
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <LoadScript googleMapsApiKey="AIzaSyDSnslxHd8R-oQtZcPMkZtxhqzw5taauow">
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={{ lat: 6.927079, lng: 79.861244 }}
            zoom={12}
            options={mapOptions}
            onClick={handleMapClick}
          >
            {selectedPosition && <Marker position={selectedPosition} />}
          </GoogleMap>
        </LoadScript>
        <button onClick={handleConfirmLocation}>Confirm Location</button>
      </div>
    </div>
  );
}

export default MapModal;

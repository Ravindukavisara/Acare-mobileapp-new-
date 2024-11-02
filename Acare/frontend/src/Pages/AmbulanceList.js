// web-app/src/components/AmbulanceList.js
import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import AmbulanceIcon from '../Assets/pic.png';
import MapModal from '../components/MapModal';
import { sendDestination } from '../services/socketService';
import './AmbulanceList.css';

const AmbulanceList = () => {
  const [ambulances, setAmbulances] = useState([]);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [selectedAmbulanceId, setSelectedAmbulanceId] = useState(null);

  // Fetch ambulances from the backend
  useEffect(() => {
    fetch('http://localhost:5000/api/Ambulance') 
      .then((response) => response.json())
      .then((data) => setAmbulances(data))
      .catch((error) => console.error('Error fetching ambulances:', error));
  }, []);

  const handleSendLocation = (ambulanceId) => {
    setSelectedAmbulanceId(ambulanceId); // Set ambulance ID to send
    setIsMapOpen(true); // Open map modal
  };

  const handleSelectLocation = (location) => {
    if (selectedAmbulanceId) {
      sendDestination(selectedAmbulanceId, location); // Send location to backend
      alert(`Location sent for ambulance ${selectedAmbulanceId}`);
      setSelectedAmbulanceId(null); // Reset selection
    }
  };

  return (
    <>
      <div className="header">
        <Navbar />
      </div>
      <div className="ambulance-list">
        {ambulances.map((ambulance) => (
          <div key={ambulance._id} className="ambulance-box">
            <img src={AmbulanceIcon} alt="Ambulance" className="pic" />
            <p>Vehicle Number: {ambulance.Ambulance_no}</p>
            <p>Driver ID: {ambulance.driverId}</p>
            <button onClick={() => handleSendLocation(ambulance._id)}>
              Send Location
            </button>
          </div>
        ))}
      </div>
      <MapModal 
        isOpen={isMapOpen} 
        onClose={() => setIsMapOpen(false)} 
        onSelectLocation={handleSelectLocation}
      />
    </>
  );
};

export default AmbulanceList;

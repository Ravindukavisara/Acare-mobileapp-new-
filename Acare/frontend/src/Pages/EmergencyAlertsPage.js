import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import alertSound from '../Assets/alert.wav';
import './EmergencyAlertsPage.css';
import Navbar from '../components/Navbar';

const SOCKET_ENDPOINT = 'http://localhost:3000';
const ALERT_ENDPOINT = 'http://localhost:3000/getSentAlerts';

function EmergencyAlertsPage() {
  const [alerts, setAlerts] = useState([]);
  
  const fetchAlerts = async () => {
    try {
      const response = await fetch(ALERT_ENDPOINT);
      if (response.ok) {
        const data = await response.json();
        setAlerts(data);
      } else {
        console.error('Failed to fetch alerts');
      }
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const socket = io(SOCKET_ENDPOINT);

    socket.on('newAlert', (alert) => {
      setAlerts((prevAlerts) => [alert, ...prevAlerts]);

      // Handle audio playback with a promise
      const audio = new Audio(alertSound);
      audio.play().catch(error => console.warn("Audio playback failed:", error));

      // Toast notification
      toast.info(`New Alert: ${alert.alertMessage}`, {
        position: toast.POSITION.TOP_RIGHT,
      });
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <>
      <div className="header">
        <Navbar />
      </div>
      <div style={{ padding: '20px' }}>
        <h1>Emergency Alerts</h1>
        <ToastContainer />
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {alerts.map((alert, index) => (
            <li key={index} style={{
              padding: '10px',
              margin: '5px 0',
              border: '1px solid #ccc',
              borderRadius: '5px',
            }}>
              <p>{alert.alertMessage}</p>
              <small>{new Date(alert.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default EmergencyAlertsPage;

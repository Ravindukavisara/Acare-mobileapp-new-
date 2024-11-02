import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import alertSound from '../Assets/alert.wav';
import './EmergencyAlertsPage.css';
import Navbar from '../components/Navbar';

const ENDPOINT = 'http://localhost:5000'; // Replace with your backend URL

function EmergencyAlertsPage() {
  const [alerts, setAlerts] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(ENDPOINT);
    setSocket(newSocket);

    // Fetch existing alerts when component mounts
    fetchAlerts();

    return () => newSocket.close();
  }, []);

  useEffect(() => {
    if (socket) {
      socket.on('newAlert', (alert) => {
        setAlerts((prevAlerts) => [alert, ...prevAlerts]);
        showNotification(alert);
        playAlertSound();
      });
    }

    return () => {
      if (socket) {
        socket.off('newAlert');
      }
    };
  }, [socket]);

  const fetchAlerts = async () => {
    try {
      const response = await fetch(`${ENDPOINT}/api/alerts`);
      const data = await response.json();
      setAlerts(data);
    } catch (error) {
      console.error('Failed to fetch alerts:', error);
      toast.error('Failed to fetch alerts. Please try again later.');
    }
  };

  const showNotification = (alert) => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Emergency Alert', { body: alert.message });
        }
      });
    }

    // Also show a toast notification
    toast.error(alert.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const playAlertSound = () => {
    const audio = new Audio(alertSound);
    audio.play().catch(error => console.error('Failed to play sound:', error));
  };

  return (
    <div className='Header'>
    <Navbar/>
    <div className="emergency-alerts-page">
      <h1>Emergency Alerts</h1>
      <div className="alert-list">
        {alerts.length > 0 ? (
          alerts.map((alert, index) => (
            <div key={index} className="alert-item">
              <h3>{alert.message}</h3>
              <p>Received: {new Date(alert.timestamp).toLocaleString()}</p>
            </div>
          ))
        ) : (
          <p>No alerts at the moment.</p>
        )}
      </div>
      <ToastContainer />
    </div>
    </div>
  );
}

export default EmergencyAlertsPage;
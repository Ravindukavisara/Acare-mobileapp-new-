// Pages/Notification.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotificationsPage = ({ hospitalId }) => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(`/api/Notification/${hospitalId}`);
        setNotifications(response.data.notifications);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, [hospitalId]);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification._id}>
            {notification.sender.name} has booked a bed. 
            <span>{new Date(notification.createdAt).toLocaleString()}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPage;

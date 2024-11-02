// web-app/src/services/socketService.js
import io from 'socket.io-client';
const socket = io('http://localhost:3000'); // Connect to backend

export const sendDestination = (ambulanceId, location) => {
  socket.emit('sendDestination', { driverId: ambulanceId, destination: location });
};

export const subscribeToLocationUpdates = (callback) => {
  socket.on('locationUpdate', callback);
};

export const unsubscribeFromLocationUpdates = () => {
  socket.off('locationUpdate');
};

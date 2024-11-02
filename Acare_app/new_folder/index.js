const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const cors = require('cors');
const socketIo = require('socket.io');
const Driver = require('./models/Driver'); // Assuming Driver model is in 'models/Driver.js'
const PredefinedAlert = require('./models/PredefinedAlert');
const SentAlert = require('./models/SentAlert');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, { cors: { origin: '*' } });

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://tdhananjani2000:trzlCbHRNJiHaLmY@a-care-db.2usizxx.mongodb.net/a-care-db?retryWrites=true&w=majority&appName=a-care-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB', err);
});

// Route to handle user login
app.post('/login', async (req, res) => {
  try {
    const { userId } = req.body;
    const driver = await Driver.findOne({ userId });

    if (!driver) {
      return res.status(401).json({ message: 'Invalid userId. Login failed.' });
    }
    return res.status(200).json({ message: 'Login successful', driver: driver });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get predefined alerts
app.get('/predefinedalerts', async (req, res) => {
  try {
    const alerts = await PredefinedAlert.find();
    res.json(alerts);
  } catch (error) {
    console.error("Error retrieving predefined alerts:", error);
    res.status(500).json({ error: 'Failed to retrieve predefined alerts' });
  }
});

// Endpoint to save sent alerts and emit them via Socket.IO
app.post('/sendAlert', async (req, res) => {
  const { alertMessage } = req.body;
  console.log("Received alert message:", alertMessage);

  if (!alertMessage) {
    return res.status(400).json({ error: 'Alert message is required' });
  }

  try {
    const newAlert = new SentAlert({ alertMessage });
    await newAlert.save();
    console.log("Alert saved successfully to database");

    io.emit('newAlert', newAlert); // Emit the new alert to all connected clients
    res.status(200).json({ message: 'Alert saved successfully' });
  } catch (error) {
    console.error("Error saving alert:", error);
    res.status(500).json({ error: 'Failed to save alert' });
  }
});

// Endpoint to retrieve sent alerts for the web app
app.get('/getSentAlerts', async (req, res) => {
  try {
    const alerts = await SentAlert.find().sort({ timestamp: -1 });
    res.json(alerts);
  } catch (error) {
    console.error("Error retrieving sent alerts:", error);
    res.status(500).json({ error: 'Failed to retrieve sent alerts' });
  }
});

// Socket.IO event handling
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Listen for destination location sent by the web app
  socket.on('sendDestination', ({ driverId, destination }) => {
    // Emit the destination to the driver’s specific Socket.IO room
    io.to(driverId).emit('receiveDestination', destination);
    console.log(`Destination sent to driver ${driverId}:`, destination);
  });

  // Listen for real-time location updates from the mobile app
  socket.on('updateLocation', ({ driverId, location }) => {
    // Store and broadcast location updates to all clients
    io.emit('locationUpdate', { driverId, location });
    console.log(`Location update from driver ${driverId}:`, location);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

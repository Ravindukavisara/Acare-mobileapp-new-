require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');            //ODM library 

const userRoutes = require('./api/User_login'); // Import user routes
const hospitalRoutes = require('./api/Hospital_login'); // Import Hospital routes
const driverRoutes = require('./api/Driver'); // Import driver routes
const ambulanceRoutes = require('./api/Ambulance'); // Import Ambulance routes
const availableBedRoutes = require('./api/Bedavailability'); // Import bed availability routes
const IcuRoutes = require('./api/Icu'); // Import ICU routes
const notificationRoutes = require('./api/Notification'); // Import notification routes
const ventilators = require('./api/Ventilators'); // Import ventilators routes
const theaters = require('./api/Theater'); // Import theaters routes
const oxygenRoutes = require('./api/Oxygen'); // Import oxygen routes

const app = express();       //initializes an Express application.

// Middleware setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Use user routes
app.use('/api/User_login', userRoutes);
app.use('/api/Hospital_login', hospitalRoutes);
app.use('/api/Driver', driverRoutes);
app.use('/api/Ambulance', ambulanceRoutes);
app.use('/api/Bedavailability', availableBedRoutes);
app.use('/api/Ventilators', ventilators);
app.use('/api/Icu',IcuRoutes);
app.use('/api/Notification', notificationRoutes);
app.use('/api/Theater', theaters);
app.use('/api/Oxygen', oxygenRoutes);
const PredefinedAlert = require('./models/PredefineAlert');
const SentAlert = require('./models/SentAlert');
// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,            //options that handle deprecation warnings
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));
app.get('/predefinedAlerts', async (req, res) => {
  try {
    const alerts = await PredefinedAlert.find();
    res.json(alerts);
  } catch (error) {
    console.error("Error retrieving predefined alerts:", error);
    res.status(500).json({ error: 'Failed to retrieve predefined alerts' });
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


// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

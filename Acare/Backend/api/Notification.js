const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');

// Create a new notification
router.post('/', async (req, res) => {
  const { hospitalName, location } = req.body;

  const newNotification = new Notification({
    hospitalName,
    location,
    message: `${hospitalName} has booked an ICU bed`
  });

  await newNotification.save();
  res.status(201).json(newNotification);
});

// Get all notifications
router.get('/', async (req, res) => {
  const notifications = await Notification.find();
  res.status(200).json(notifications);
});

module.exports = router;

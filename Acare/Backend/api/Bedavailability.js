const express = require('express');
const Hospital = require('../models/Hospital_login');
const router = express.Router();
const authenticate = require('../config/authenticate');

// Route to update beds
router.put('/updatebeds', authenticate, async (req, res) => {
  const { username, beds } = req.body;

  console.log('Received request to update beds:', { username, beds });

  // Validate bed count
  if (typeof beds !== 'number' || beds < 0) {
      return res.status(400).json({ status: 'FAILED', message: 'Invalid bed count!' });
  }

  try {
      // Update hospital record using findOneAndUpdate
      const hospital = await Hospital.findOneAndUpdate(
          { username: username },
          { beds: beds },
          { new: true } // Return the updated document
      );

      if (!hospital) {
          return res.status(404).json({ status: 'FAILED', message: 'Hospital not found!' });
      }

      console.log('Updated bed count:', hospital.beds);

      res.status(200).json({
          status: 'SUCCESS',
          message: 'Bed count updated successfully!',
          availablebeds: hospital.beds,
      });
  } catch (err) {
      console.error('Error updating beds:', err);
      res.status(500).json({
          status: 'FAILED',
          message: 'An error occurred while updating bed count!',
          error: err.message,
      });
  }
});

module.exports = router;
/*

const jwt = require('jsonwebtoken');
require('dotenv').config();
const secretKey = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    // Retrieve token from header (x-auth-token or Authorization)
    let token = req.header('x-auth-token') || req.header('Authorization');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // If token starts with "Bearer ", remove the "Bearer " part
    if (token.startsWith("Bearer ")) {
        token = token.slice(7, token.length);
    }

    console.log('Received Token:', token); // Log the token to debug

    try {
        // Verify the token using the secret key
        const decoded = jwt.verify(token, secretKey);
        console.log('Decoded Token:', decoded); // Log the decoded token for debugging

        // Attach the user information to the request (e.g., decoded username)
        req.user = decoded.user; // Assumes the JWT token has a 'user' payload
        
        // Proceed to the next middleware/route handler
        next();
    } catch (err) {
        // Invalid token case
        console.error('Token verification error:', err.message); // Log the error
        return res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = authenticate;
*/
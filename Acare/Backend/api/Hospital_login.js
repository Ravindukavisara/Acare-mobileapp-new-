const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Hospital = require('../models/Hospital_login');
const secretKey = process.env.JWT_SECRET;

// Signup Route
router.post('/signup', async (req, res) => {
    const { username, hospitalId, email, password, beds } = req.body;

    if (!hospitalId || !username || !email || !password || !beds) {
        return res.json({
            status: 'FAILED',
            message: 'All fields are required!'
        });
    } else if (!/^[a-zA-Z]*$/.test(username)) {
        return res.json({
            status: 'FAILED',
            message: 'Invalid username entered!'
        });
    } else if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
        return res.json({
            status: 'FAILED',
            message: 'Invalid email entered!'
        });
    } else if (password.length < 8) {
        return res.json({
            status: 'FAILED',
            message: 'Password is too short!'
        });
    }

    try {
        const existingUser = await Hospital.findOne({ username  });
        if (existingUser) {
            return res.json({
                status: 'FAILED',
                message: 'Hospital name already exists!'
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Hospital({
            username,
            hospitalId,
            email,
            password: hashedPassword,
            beds
        });

        const result = await newUser.save();
        const payload = { user: { id: result.id } };
        jwt.sign(payload, secretKey, { expiresIn: '24h' }, (err, token) => {
            if (err) throw err;
            res.json({
                status: "SUCCESS",
                message: "Signup successful!",
                token,
            });
        });

    } catch (err) {
        res.json({
            status: 'FAILED',
            message: 'An error occurred during signup!',
            error: err.message,
        });
    }
});

// Signin Route
router.post('/signin', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
      return res.json({
          status: 'FAILED',
          message: 'All fields are required!'
      });
  }

  try {
      const user = await Hospital.findOne({ username });
      if (!user) {
          return res.json({
              status: 'FAILED',
              message: 'Hospital not found!'
          });
      }

      const match = await bcrypt.compare(password, user.password);
      if (match) {
          const payload = { user: { id: user.id, hospitalId: user.hospitalId, username: user.username } }; // Include hospitalId and username
          jwt.sign(payload, secretKey, { expiresIn: '24h'}, (err, token) => { // Set token expiration to 1 day
              if (err) throw err;
              res.json({
                  status: "SUCCESS",
                  message: "Signin successful!",
                  token,
                  beds: user.beds,
                  username: user.username
              });
          });
      } else {
          res.json({
              status: 'FAILED',
              message: 'Invalid password!'
          });
      }
  } catch (err) {
      res.json({
          status: 'FAILED',
          message: 'An error occurred during signin!',
          error: err.message,
      });
  }
});


module.exports = router;
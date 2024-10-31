const express = require('express');
const Hospital = require('../models/Hospital_login');
const router = express.Router();
const authenticate = require('../config/authenticate');

// Fetch data for a specific hospital by name
router.route("/get/:name").get(authenticate, async (req, res) => {
    let hospitalName = req.params.name;

    try {
        const hospital = await Hospital.findOne({ name: hospitalName });  // Find by name
        if (hospital) {
            res.status(200).send({ status: "User fetched", Hospital: hospital });
        } else {
            res.status(404).send({ status: "Hospital not found" });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send({ status: "Error fetching hospital data", error: err.message });
    }
});

module.exports = router;

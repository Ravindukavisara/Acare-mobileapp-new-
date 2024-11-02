const router = require("express").Router();
let Driver = require("../models/Driver");

// Add Driver
router.route("/add").post(async (req, res) => {
    const userId = req.body.userId;
    const driver_name = req.body.driver_name;
    const hospitalId = req.body.hospitalId;
    const contact_no = Number(req.body.contact_no);

    const newDriver = new Driver({
        userId,
        driver_name,
        hospitalId,
        contact_no,
    });

    // Check if the user ID already exists
    const existingDriver = await Driver.findOne({ userId });
    if (existingDriver) {
        return res.status(400).json({
            message: "Driver with this User ID already exists",
        });
    }

    newDriver
        .save()
        .then(() => {
            res.json("Driver Added");
        })
        .catch((err) => {
            console.log(err);
        });
});
/*
// Get All Drivers

router.route("/").get((req, res) => {
    Driver.find()
        .then((drivers) => res.json(drivers))
        .catch((err) => {
            console.log(err);
        });
});*/

router.get("/", async (req, res) => {
    const { hospitalId } = req.query; // Get hospitalId from query params
    try {
        const drivers = hospitalId 
            ? await Driver.find({ hospitalId }) // Find drivers for specific hospital
            : await Driver.find(); // Find all drivers if hospitalId is not provided
        res.json(drivers);
    } catch (err) {
        console.error("Error fetching drivers:", err);
        res.status(500).json({ message: "Error fetching drivers" });
    }
});

//update Driver



router.route("/update/:id").put(async (req, res) => {
    let driverId = req.params.id;
    const { userId, driver_name, hospitalId, contact_no } = req.body; //D structure

    const updateDriver = {
        //object
        userId,
        driver_name,
        hospitalId,
        contact_no,
    };

    const update = await Driver.findByIdAndUpdate(driverId, updateDriver)
        .then(() => {
            res.status(200).send({
                status: "Driver Updated",
            });
        })
        .catch((err) => {
            console.log(err.message); //goes to terminal
            res.status(500).send({
                status: "Error with updating data",
                error: err.message,
            }); //goes to front end
        });
});

//delete Driver
router.route("/delete/:id").delete(async (req, res) => {
    let driverId = req.params.id;

    await Driver.findByIdAndDelete(driverId)
        .then(() => {
            res.status(200).send({ status: "Driver Deleted" });
        })
        .catch((err) => {
            console.log(err.message);
            res
                .status(500)
                .send({ status: "Error with deleting data", error: err.message });
        });
});

//take data from one user
router.route("/get/:id").get(async (req, res) => {
    let driverId = req.params.id;
    await Driver.findById(driverId)
        .then((Driver) => {
            res.status(200).send({ status: "user fetched", Driver });
        })
        .catch(() => {
            console.log(err.message);
            res
                .status(500)
                .send({ status: "Error with get user", error: err.message });
        });
});



module.exports = router;


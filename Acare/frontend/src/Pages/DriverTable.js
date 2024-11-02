/*
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DriverTable.css";
import { jwtDecode } from "jwt-decode";
import Navbar from '../components/Navbar';

const DriverTable = () => {
  const [drivers, setDrivers] = useState([]);
  const [hospitalId, setHospitalId] = useState("");

  useEffect(() => {
    // Decode token and extract hospitalId
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const hospitalIdFromToken = decodedToken.hospitalId;
      
        console.log("Hospital ID:", hospitalId);
      setHospitalId(hospitalIdFromToken);
    }

    const fetchDrivers = async () => {
      if (!hospitalId) return;

      try {
        const response = await axios.get("http://localhost:5000/api/Driver", {
            
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { hospitalId },
        });

        setDrivers(response.data);
        console.log("Drivers:", response.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, [hospitalId]);

  return (
    <div className="driver-table-container">
      <Navbar />
      <h2>Drivers for Hospital {hospitalId}</h2>
      <table className="driver-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Driver Name</th>
            <th>Contact No</th>
          </tr>
        </thead>
        <tbody>
          {drivers.length > 0 ? (
            drivers.map((driver) => (
              <tr key={driver._id}>
                <td>{driver.userId || "N/A"}</td>
                <td>{driver.driver_name}</td>
                <td>{driver.contact_no}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No drivers found for this hospital</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DriverTable;
*/
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./DriverTable.css";
//import { jwtDecode } from "jwt-decode";
import Navbar from '../components/Navbar';

const DriverTable = () => {
  const [drivers, setDrivers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchDrivers = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/Driver", {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        setDrivers(response.data);
        console.log("Drivers:", response.data);
      } catch (error) {
        console.error("Error fetching drivers:", error);
      }
    };

    fetchDrivers();
  }, []);

  return (
    <div className="driver-table-container">
      <Navbar />
      <h2>All Drivers</h2>
      <table className="driver-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Driver Name</th>
            <th>Contact No</th>
          </tr>
        </thead>
        <tbody>
          {drivers.length > 0 ? (
            drivers.map((driver) => (
              <tr key={driver._id}>
                <td>{driver.userId || "N/A"}</td>
                <td>{driver.driver_name}</td>
                <td>{driver.contact_no}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">No drivers found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DriverTable;


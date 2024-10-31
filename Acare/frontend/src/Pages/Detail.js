import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Detail.css';  // Import the CSS file

export default function Detail() {
  const location = useLocation();
  const { name, oxygenCapacity, ventilators, theaters } = location.state || {};

  return (
    <><div className='header'>
          <Navbar />
      </div><div>
              {/* Table for ICU Details */}
              <table className="icu-details-table">
                  <thead>
                      <tr>
                          <th>ICU Name</th>
                          <th>Oxygen Capacity</th>
                          <th>Ventilators</th>
                          <th>Theaters</th>
                      </tr>
                  </thead>
                  <tbody>
                      <tr>
                          <td>{name}</td>
                          <td>{oxygenCapacity || 'N/A'}</td>
                          <td>{ventilators || 'N/A'}</td>
                          <td>{theaters || 'N/A'}</td>
                      </tr>
                  </tbody>
              </table>
          </div></>
  );
}

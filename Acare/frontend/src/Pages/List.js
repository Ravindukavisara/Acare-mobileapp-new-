import React, { useEffect, useState } from 'react';
import './List.css';
import Navbar from '../components/Navbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function List() {
  const [icuData, setIcuData] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchICUData = async () => {
      const hospitalId = localStorage.getItem('hospitalId');  // Get logged-in hospital ID
      
      try {
        const response = await axios.get('http://localhost:5000/api/icu', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  // Include token
          },
        });

        // Filter out ICU data for the current logged-in hospital
        const filteredData = response.data.filter(icu => icu.name !== hospitalId);
        
        setIcuData(filteredData);
        console.log('Filtered ICU data:', filteredData);
      } catch (error) {
        console.error('Error fetching ICU data:', error);
      }
    };

    fetchICUData();
  }, []);

  const handleRequestBed = async (hospitalId) => {
    try {
      await axios.put(`http://localhost:5000/api/icu/request-bed/${hospitalId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,  // Include token
        },
      });
      setIcuData(prevIcus => {
        return prevIcus.map(icu => {
          if (icu.name === hospitalId) {
            return { ...icu, availableBeds: icu.availableBeds - 1 };
          }
          return icu;
        });
      });
    } catch (error) {
      console.error('Error requesting bed:', error);
    }
  };

  const handleViewMore = (hospitalName) => {
    navigate(`/Detail/${hospitalName}`);
  };

  return (
    <>
      <div className='header'><Navbar /></div>
      <div className="icu-list">
        {icuData.map((icu, index) => (
          <div key={index} className="icu-box">
            <h2>{icu.location}</h2>
            <div className="icu-header">
              <h3>{icu.availableBeds}</h3>
              
              <button 
                className="view-more-button"  
                onClick={() => handleViewMore(icu.name)}
              >
                View More Info
              </button>
            </div>
            <p><strong>Location:</strong> {icu.location}</p>
            <p><strong>Contact:</strong> {icu.contact}</p>
            <table>
              <thead>
                <tr>
                  <th>ICU Name</th>
                  <th>Available Beds</th>
                  <th>Request Bed</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{icu.name}</td>
                  <td>{icu.availableBeds}</td>
                  <td>
                    <button 
                      className="request-bed-button"
                      onClick={() => handleRequestBed(icu.name)}
                      disabled={icu.availableBeds === 0}
                    >
                      Request Bed
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </>
  );
}

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
      try {
        const response = await axios.get('http://localhost:5000/api/icu');
        setIcuData(response.data);
        console.log('ICU data:', response.data);
      } catch (error) {
        console.error('Error fetching ICU data:', error);
      }
    };

    fetchICUData();
  }, []);

  const handleRequestBed = async (hospitalId) => {
    try {
      await axios.put(`http://localhost:5000/api/icu/request-bed/${hospitalId}`);
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
//new
  const handleViewMore = (icu) => {
    navigate('/Detail', { state: { ...icu } });
  };
//



  return (
    <>
      <div className='header'><Navbar /></div>
      <div className="icu-list">
        {icuData.map((icu, index) => (
          <div key={index} className="icu-box">
            <h2>{icu.location}</h2>
            <div className="icu-header">
              <h3>{icu.availableBeds}</h3>
              
              <button className="view-more-button"  onClick={() => handleViewMore(icu)}
              >View More Info</button>

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
                      onClick={() => handleRequestBed(icu.name)} // Pass hospitalId
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

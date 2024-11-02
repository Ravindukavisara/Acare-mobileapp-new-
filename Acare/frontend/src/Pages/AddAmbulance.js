
// import Navbar from '../components/Navbar'
// import React, { useState } from 'react';
// import axios from 'axios';
// import './AddAmbulance.css';

// const AddAmbulance = () => {
//     const [Ambulance_no, setAmbulance_no] = useState('');
//     const [hospitalId, setHospitalId] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         console.log('Ambulance ID:', Ambulance_no);
//         console.log('Hospital ID:', hospitalId);
       
//         setAmbulance_no('');
//         setHospitalId('');
    
//     try {
//       const requestData = { Ambulance_no,hospitalId, };
//       console.log('Sending ambulance data:', requestData); 
//       const response = await axios.post('http://localhost:5000/api/Ambulance/add', requestData);
//       console.log(response.data); 
//     } catch (error) {
//       console.error('Error during adding:', error);
//     }
//   };

//     return (
//         <>
//         <div className='header'>
//             <Navbar />
            
//         </div>
        
//     <div className='.add-ambulance-page'>
        
   
//         <div className="add-ambulance-container">


//             <h2>Add Ambulance</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="Ambulance_no">Ambulance ID:</label>
//                     <input
//                         type="text"
//                         id="Ambulance_no"
//                         value={Ambulance_no}
//                         onChange={(e) => setAmbulance_no(e.target.value)}
//                         required />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="hospitalId">Hospital ID:</label>
//                     <input
//                         type="text"
//                         id="hospitalId"
//                         value={hospitalId}
//                         onChange={(e) => setHospitalId(e.target.value)}
//                         required />
//                 </div>
//                 <button type="submit" className="submit-button">Add</button>
//             </form>

            
//         </div>
//      </div>
        
//         </>
    
//     );
// };

// export default AddAmbulance;


import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import './AddAmbulance.css';
import axios from 'axios';

const AddAmbulance = () => {
    const [ambulanceNo, setAmbulanceNo] = useState('');
    const [hospitalId, setHospitalId] = useState('');
    const [driverId, setDriverId] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const requestData = { 
                Ambulance_no: ambulanceNo,
                hospitalId ,
                driverId,
            };
            const response = await axios.post('http://localhost:5000/api/Ambulance/add', requestData);
            console.log(response.data);
            
            // Clear form
            setAmbulanceNo('');
            setHospitalId('');
            setDriverId('');
        } catch (error) {
            console.error('Error during adding:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="add-ambulance-page">
                <div className="add-ambulance-card">
                    <div className="form-section">
                        <h2>Add Ambulance</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="ambulanceNo">Ambulance ID</label>
                                <input
                                    type="text"
                                    id="ambulanceNo"
                                    placeholder="Enter ambulance ID"
                                    value={ambulanceNo}
                                    onChange={(e) => setAmbulanceNo(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="hospitalId">Hospital ID</label>
                                <input
                                    type="text"
                                    id="hospitalId"
                                    placeholder="Enter hospital ID"
                                    value={hospitalId}
                                    onChange={(e) => setHospitalId(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="driverlId">Driver ID</label>
                                <input
                                    type="text"
                                    id="driverId"
                                    placeholder="Enter driver ID"
                                    value={driverId}
                                    onChange={(e) => setDriverId(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="submit-button">
                                Add Ambulance
                            </button>
                        </form>
                    </div>
                    <div className="image-section">
                        <img 
                            src="../Assets/Add_ambulance.jpg" 
                            alt="Ambulance Management"
                            className="side-image"
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default AddAmbulance;

// import Navbar from '../components/Navbar'
// import React, { useState } from 'react';
// import axios from 'axios';
// import './AddDrivers.css';

// const AddDrivers = () => {
//     const [userId, setUserId] = useState('');
//     const [driver_name, setDriver_name] = useState('')
//     const [hospitalId, setHospitalId] = useState('');
//     const [contact_no, setContact_no] = useState('');

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         console.log('Driver ID:', userId);
//         console.log('Hospital ID:', hospitalId);
//         console.log('Driver Name:', driver_name);
//         console.log('Contact No:', contact_no);

//         setUserId('');
//         setHospitalId('');
//         setDriver_name('');
//         setContact_no('');
    

//     try {
//         const requestData = { userId,hospitalId,driver_name,contact_no };
//         console.log('Sending Driver data:', requestData); 
//         const response = await axios.post('http://localhost:5000/api/Driver/add', requestData);
//         console.log(response.data); 
//       } catch (error) {
//         console.error('Error during adding:', error);
//       }
    
//     };


//     return (

//         <>
//         <div className='header'>
//             <Navbar />
            
//         </div>
        
//     <div className='.add-driver-page'>
        

//         <div className="add-driver-container">


//             <h2>Add Drivers</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                     <label htmlFor="userId">Driver ID:</label>
//                     <input
//                         type="text"
//                         id="userId"
//                         value={userId}
//                         onChange={(e) => setUserId(e.target.value)}
//                         required />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="driver_name">Driver Name:</label>
//                     <input
//                         type="text"
//                         id= "driver_name"
//                         value={driver_name}
//                         onChange={(e) => setDriver_name(e.target.value)}
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
//                 <div className="form-group">
//                     <label htmlFor="contact_no">Contact_no:</label>
//                     <input
//                         type="text"
//                         id="contact_no"
//                         value={contact_no}
//                         onChange={(e) => setContact_no(e.target.value)}
//                         required />
//                 </div>
//                 <button type="submit" className="submit-button">Add</button>
//             </form>

            
//         </div>
//      </div>
        
//         </>
    
//     );
// };

// export default AddDrivers;

import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './AddDrivers.css';

const AddDrivers = () => {
    const [userId, setUserId] = useState('');
    const [driver_name, setDriver_name] = useState('');
    const [hospitalId, setHospitalId] = useState('');
    const [contact_no, setContact_no] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const requestData = { userId, hospitalId, driver_name, contact_no };
            console.log('Sending Driver data:', requestData);
            const response = await axios.post('http://localhost:5000/api/Driver/add', requestData);
            console.log(response.data);
            
            // Clear form fields after successful submission
            setUserId('');
            setHospitalId('');
            setDriver_name('');
            setContact_no('');

            // You might want to add a success message here
        } catch (error) {
            console.error('Error during adding:', error);
            // You might want to add an error message here
        }
    };

    return (
        <>
            <Navbar />
            <main className="add-driver-page">
                <div className="add-driver-container">
                    <h2>Add Driver</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="userId">Driver ID</label>
                            <input
                                type="text"
                                id="userId"
                                value={userId}
                                onChange={(e) => setUserId(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="driver_name">Driver Name</label>
                            <input
                                type="text"
                                id="driver_name"
                                value={driver_name}
                                onChange={(e) => setDriver_name(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hospitalId">Hospital ID</label>
                            <input
                                type="text"
                                id="hospitalId"
                                value={hospitalId}
                                onChange={(e) => setHospitalId(e.target.value)}
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="contact_no">Contact Number</label>
                            <input
                                type="tel"
                                id="contact_no"
                                value={contact_no}
                                onChange={(e) => setContact_no(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="submit-button">Add Driver</button>
                    </form>
                </div>
            </main>
        </>
    );
};

export default AddDrivers;
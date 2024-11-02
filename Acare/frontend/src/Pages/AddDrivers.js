
import React, { useState } from 'react';
import { 
  UserCircle2, 
  Building, 
  Phone, 
  BadgeCheck, 
  CheckCircle2,
  AlertCircle 
} from 'lucide-react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import './AddDrivers.css';

const AddDrivers = () => {
    const [userId, setUserId] = useState('');
    const [driver_name, setDriver_name] = useState('');
    const [hospitalId, setHospitalId] = useState('');
    const [contact_no, setContact_no] = useState('');
    const [message, setMessage] = useState('');
    const [isSuccess, setIsSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        
        try {
            const requestData = { userId, hospitalId, driver_name, contact_no };
            const response = await axios.post('http://localhost:5000/api/Driver/add', requestData);
            
            setIsSuccess(true);
            setMessage('Driver added successfully!');
            
            // Reset form
            setUserId('');
            setHospitalId('');
            setDriver_name('');
            setContact_no('');
            
            setTimeout(() => {
                setMessage('');
                setIsSuccess(false);
            }, 3000);
        } catch (error) {
            setIsSuccess(false);
            setMessage('An error occurred. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="driver-registration-page">
                <div className="animated-circles">
                    <div className="circle circle-1"></div>
                    <div className="circle circle-2"></div>
                    <div className="circle circle-3"></div>
                </div>
                
                <div className="registration-container">
                    <div className="form-header">
                        <div className="header-icon">
                            <UserCircle2 size={40} />
                        </div>
                        <h2>Driver Registration</h2>
                        <p>Add a new driver to the system</p>
                    </div>

                    <form onSubmit={handleSubmit} className="registration-form">
                        <div className="form-grid">
                            <div className="input-group">
                                <div className="input-wrapper">
                                    <BadgeCheck className="field-icon" size={20} />
                                    <input
                                        type="text"
                                        value={userId}
                                        onChange={(e) => setUserId(e.target.value)}
                                        placeholder="Driver ID"
                                        required
                                    />
                                    <label>Driver ID</label>
                                </div>
                            </div>

                            <div className="input-group">
                                <div className="input-wrapper">
                                    <UserCircle2 className="field-icon" size={20} />
                                    <input
                                        type="text"
                                        value={driver_name}
                                        onChange={(e) => setDriver_name(e.target.value)}
                                        placeholder="Driver Name"
                                        required
                                    />
                                    <label>Driver Name</label>
                                </div>
                            </div>

                            <div className="input-group">
                                <div className="input-wrapper">
                                    <Building className="field-icon" size={20} />
                                    <input
                                        type="text"
                                        value={hospitalId}
                                        onChange={(e) => setHospitalId(e.target.value)}
                                        placeholder="Hospital ID"
                                        required
                                    />
                                    <label>Hospital ID</label>
                                </div>
                            </div>

                            <div className="input-group">
                                <div className="input-wrapper">
                                    <Phone className="field-icon" size={20} />
                                    <input
                                        type="tel"
                                        value={contact_no}
                                        onChange={(e) => setContact_no(e.target.value)}
                                        placeholder="Contact Number"
                                        required
                                    />
                                    <label>Contact Number</label>
                                </div>
                            </div>
                        </div>

                        <button 
                            type="submit" 
                            className={`submit-button ${isLoading ? 'loading' : ''}`}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="loading-spinner"></span>
                            ) : (
                                <>Register Driver</>
                            )}
                        </button>
                    </form>

                    {message && (
                        <div className={`notification ${isSuccess ? 'success' : 'error'}`}>
                            {isSuccess ? (
                                <CheckCircle2 size={20} />
                            ) : (
                                <AlertCircle size={20} />
                            )}
                            {message}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AddDrivers;

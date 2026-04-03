import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import './Account.css';

const Account = () => {
    const { user, updateProfile } = useAuth();
    const { showToast } = useToast();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [gender, setGender] = useState(user?.gender || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setEmail(user.email || '');
            setGender(user.gender || '');
            setPhone(user.phone || '');
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        
        // Validation
        if (phone && !/^\d{10}$/.test(phone.replace(/\D/g, ''))) {
            showToast('Please enter a valid 10-digit phone number', 'error');
            return;
        }

        if (!gender) {
            showToast('Please select your gender', 'error');
            return;
        }

        setLoading(true);
        const result = await updateProfile({ name, gender, phone });
        if (result.success) {
            showToast('Profile updated successfully!', 'success');
        } else {
            showToast(result.message || 'Update failed', 'error');
        }
        setLoading(false);
    };

    return (
        <div className="account-container">
            <div className="account-box glass-card">
                <h2>Account Details</h2>
                
                <form onSubmit={handleUpdate} className="account-form">
                    <div className="form-group">
                        <label>Full Name</label>
                        <input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)} 
                            required 
                            className="form-input" 
                        />
                    </div>
                    <div className="form-group">
                        <label>Email ID</label>
                        <input 
                            type="email" 
                            value={email} 
                            disabled 
                            className="form-input disabled" 
                        />
                    </div>
                    <div className="form-group">
                        <label>Gender</label>
                        <select 
                            value={gender} 
                            onChange={(e) => setGender(e.target.value)} 
                            className="form-input"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Phone Number</label>
                        <input 
                            type="text" 
                            value={phone} 
                            onChange={(e) => setPhone(e.target.value)} 
                            placeholder="Enter your phone number" 
                            className="form-input" 
                        />
                    </div>
                    <button type="submit" disabled={loading} className="update-button">
                        {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Account;

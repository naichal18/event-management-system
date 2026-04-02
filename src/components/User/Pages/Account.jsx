import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

const Account = () => {
    const { user, updateProfile } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [gender, setGender] = useState(user?.gender || '');
    const [phone, setPhone] = useState(user?.phone || '');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setEmail(user.email);
            setGender(user.gender);
            setPhone(user.phone);
        }
    }, [user]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        const result = await updateProfile({ name, gender, phone });
        if (result.success) {
            setMessage('Profile updated successfully!');
        } else {
            setMessage(result.message || 'Update failed');
        }
        setLoading(false);
    };

    return (
        <div className="account-container">
            <div className="account-box glass-card">
                <h2>Account Details</h2>
                {message && <div className={`message ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}
                
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
            
            <style jsx="true">{`
                .account-container {
                    padding: 40px;
                    display: flex;
                    justify-content: center;
                    min-height: 80vh;
                }
                .account-box {
                    width: 100%;
                    max-width: 500px;
                    padding: 40px;
                    background: rgba(255, 255, 255, 0.05);
                    backdrop-filter: blur(10px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 16px;
                }
                h2 {
                    color: #fff;
                    margin-bottom: 30px;
                    text-align: center;
                    font-size: 24px;
                    letter-spacing: 1px;
                }
                .account-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }
                .form-group label {
                    color: #94a3b8;
                    font-size: 14px;
                }
                .form-input {
                    padding: 12px 16px;
                    background: rgba(15, 23, 42, 0.5);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    color: #fff;
                    outline: none;
                }
                .form-input:focus {
                    border-color: #00d2ff;
                    box-shadow: 0 0 10px rgba(0, 210, 255, 0.2);
                }
                .form-input.disabled {
                    background: rgba(15, 23, 42, 0.8);
                    color: #64748b;
                    cursor: not-allowed;
                }
                .update-button {
                    margin-top: 20px;
                    padding: 14px;
                    background: linear-gradient(135deg, #06b6d4, #3b82f6);
                    color: #fff;
                    border: none;
                    border-radius: 8px;
                    font-weight: bold;
                    cursor: pointer;
                    transition: transform 0.2s;
                }
                .update-button:hover {
                    transform: translateY(-2px);
                }
                .message {
                    padding: 12px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    text-align: center;
                    font-size: 14px;
                }
                .message.success {
                    background: rgba(34, 197, 94, 0.2);
                    color: #4ade80;
                    border: 1px solid rgba(34, 197, 94, 0.3);
                }
                .message.error {
                    background: rgba(239, 68, 68, 0.2);
                    color: #f87171;
                    border: 1px solid rgba(239, 68, 68, 0.3);
                }
            `}</style>
        </div>
    );
};

export default Account;

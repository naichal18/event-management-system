import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';

const UserChangePassword = () => {
    const { changePassword } = useAuth();
    const { showToast } = useToast();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            showToast('New passwords do not match', 'error');
            return;
        }

        if (newPassword.length < 6) {
            showToast('New password must be at least 6 characters', 'error');
            return;
        }

        setLoading(true);
        const result = await changePassword(currentPassword, newPassword);
        
        if (result.success) {
            showToast('Password updated successfully!', 'success');
            setCurrentPassword('');
            setNewPassword('');
            setConfirmPassword('');
        } else {
            showToast(result.message || 'Update failed', 'error');
        }
        setLoading(false);
    };

    return (
        <div className="password-container">
            <div className="password-box glass-card">
                <h2>Change Password</h2>
                
                <form onSubmit={handleUpdate} className="password-form">
                    <div className="form-group">
                        <label>Current Password</label>
                        <input 
                            type="password" 
                            value={currentPassword} 
                            onChange={(e) => setCurrentPassword(e.target.value)} 
                            required 
                            placeholder="Enter current password"
                            className="form-input" 
                        />
                    </div>
                    <div className="form-group">
                        <label>New Password</label>
                        <input 
                            type="password" 
                            value={newPassword} 
                            onChange={(e) => setNewPassword(e.target.value)} 
                            required 
                            placeholder="Enter new password"
                            className="form-input" 
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm New Password</label>
                        <input 
                            type="password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                            placeholder="Confirm new password"
                            className="form-input" 
                        />
                    </div>
                    <button type="submit" disabled={loading} className="update-button">
                        {loading ? 'Changing...' : 'Change Password'}
                    </button>
                </form>
            </div>
            
            <style jsx="true">{`
                .password-container {
                    padding: 40px;
                    display: flex;
                    justify-content: center;
                    min-height: 80vh;
                }
                .password-box {
                    width: 100%;
                    max-width: 450px;
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
                }
                .password-form {
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

export default UserChangePassword;

import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';

const ChangePassword = () => {
  const { changePassword } = useAuth();
  const { showToast } = useToast();
  const [passwords, setPasswords] = useState({ old: '', newPass: '', confirm: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirm) {
      showToast("Passwords do not match!", 'error');
      return;
    }
    if (passwords.newPass.length < 6) {
      showToast("Password must be at least 6 characters", 'error');
      return;
    }

    setLoading(true);
    const result = await changePassword(passwords.old, passwords.newPass);
    
    if (result.success) {
      showToast("Password successfully changed!", 'success');
      setPasswords({ old: '', newPass: '', confirm: '' });
    } else {
      showToast(result.message || "Failed to change password", "error");
    }
    setLoading(false);
  };

  return (
    <div className="glass-panel" style={{ padding: '25px', maxWidth: '500px', margin: '0 auto' }}>
      <div className="page-header">
        <h3>Change Password</h3>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label className="glass-label">Old Password</label>
          <input 
            type="password" 
            value={passwords.old} 
            onChange={(e) => setPasswords({...passwords, old: e.target.value})} 
            className="glass-input" 
            required 
          />
        </div>
        <div>
          <label className="glass-label">New Password</label>
          <input 
            type="password" 
            value={passwords.newPass} 
            onChange={(e) => setPasswords({...passwords, newPass: e.target.value})} 
            className="glass-input" 
            required 
          />
        </div>
        <div>
          <label className="glass-label">Confirm Password</label>
          <input 
            type="password" 
            value={passwords.confirm} 
            onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} 
            className="glass-input" 
            required 
          />
        </div>
        <button type="submit" className="gradient-btn" disabled={loading}>
          {loading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;

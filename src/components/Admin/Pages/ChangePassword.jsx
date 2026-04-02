import React, { useState } from 'react';

const ChangePassword = () => {
  const [passwords, setPasswords] = useState({ old: '', newPass: '', confirm: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (passwords.newPass !== passwords.confirm) {
      alert("New password and confirm password do not match!");
      return;
    }
    if (passwords.newPass.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }
    alert("Password successfully changed!");
    setPasswords({ old: '', newPass: '', confirm: '' });
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
        <button type="submit" className="gradient-btn">Update Password</button>
      </form>
    </div>
  );
};

export default ChangePassword;

import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const Profile = () => {
  const { profile, setProfile } = useOutletContext();
  const [formData, setFormData] = useState({ name: profile.name, email: profile.email });
  const [preview, setPreview] = useState(profile.avatar);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    setProfile({ 
      ...profile, 
      name: formData.name, 
      email: formData.email,
      avatar: preview // Updates global state and Topbar immediately
    });
    alert('Profile updated successfully!');
  };

  return (
    <div className="glass-panel" style={{ padding: '25px', maxWidth: '500px', margin: '0 auto' }}>
      <div className="page-header">
        <h3>Admin Profile</h3>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img src={preview} alt="Profile Preview" style={{ width: '120px', height: '120px', borderRadius: '50%', border: '4px solid #0df', objectFit: 'cover' }} />
          <label className="change-img-btn" style={{ position: 'absolute', bottom: '0', right: '0', background: '#0df', color: '#000', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 2px 10px rgba(0,255,255,0.4)' }}>
            📷
            <input type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
          </label>
        </div>
      </div>

      <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div>
          <label className="glass-label">Full Name</label>
          <input 
            type="text" 
            value={formData.name} 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            className="glass-input" 
            required 
          />
        </div>
        <div>
          <label className="glass-label">Email Address</label>
          <input 
            type="email" 
            value={formData.email} 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            className="glass-input" 
            required 
          />
        </div>
        <button type="submit" className="gradient-btn">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';

const Profile = () => {
  const { user, updateProfile } = useAuth();
  const { showToast } = useToast();
  const [formData, setFormData] = useState({ name: user?.name || '', email: user?.email || '' });
  const [preview, setPreview] = useState(user?.avatar || '');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({ name: user.name, email: user.email });
      setPreview(user.avatar);
    }
  }, [user]);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await updateProfile({ 
      name: formData.name, 
      avatar: preview 
    });
    
    if (result.success) {
      showToast('Profile updated successfully!', 'success');
    } else {
      showToast(result.message || 'Update failed', 'error');
    }
    setLoading(false);
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
            disabled
            className="glass-input" 
            style={{ opacity: 0.7, cursor: 'not-allowed' }}
          />
        </div>
        <button type="submit" className="gradient-btn" disabled={loading}>
          {loading ? 'Updating...' : 'Update Profile'}
        </button>
      </form>
    </div>
  );
};

export default Profile;

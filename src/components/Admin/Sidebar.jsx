import React from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeRoute, handleLogout }) => {
  const navigate = useNavigate();

  const menuItems = [
    { id: '', label: 'User List', icon: '👥' },
    { id: 'events', label: 'Event Post', icon: '📅' },
    { id: 'categories', label: 'Post Category', icon: '📁' },
    { id: 'gallery', label: 'Add Gallery', icon: '🖼️' },
    { id: 'contacts', label: 'Contact List', icon: '📞' },
    { id: 'profile', label: 'Profile', icon: '👤' },
    { id: 'profile/password', label: 'Change Password', icon: '🔒' }
  ];

  return (
    <div className="sidebar glass-panel">
      <div className="sidebar-header">
        <span style={{fontSize: '24px'}}>⚡</span>
        <h2>ADMIN</h2>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map(item => (
          <li key={item.id}>
            <button 
              className={activeRoute === item.id || (activeRoute === 'users' && item.id === '') ? 'active' : ''}
              onClick={() => navigate(`/admin/${item.id}`)}
            >
              <span className="menu-icon">{item.icon}</span>
              {item.label}
            </button>
          </li>
        ))}
        <li style={{ marginTop: '20px' }}>
          <button onClick={handleLogout} style={{ color: '#ef4444' }}>
            <span className="menu-icon">🚪</span>
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

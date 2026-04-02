import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ profile, handleLogout }) => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);

  // Hardcoded mock notifications
  const [notifications] = useState([
    { id: 1, text: 'New booking from Alice', time: '10 mins ago' },
    { id: 2, text: 'David Lee sent a message', time: '1 hour ago' }
  ]);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="topbar glass-panel" style={{ borderRadius: '0 0 12px 12px', borderTop: 'none', borderLeft: 'none', borderRight: 'none', marginBottom: '20px' }}>
      <div className="topbar-left">
        <h3 style={{ color: '#0df', margin: 0 }}>Dashboard Overview</h3>
      </div>
      
      <div className="topbar-right">
        {/* Notifications */}
        <div className="topbar-icon-dropdown" ref={notifRef}>
          <button className="icon-btn" onClick={() => setShowNotifMenu(!showNotifMenu)}>
            🔔
            {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
          </button>
          
          {showNotifMenu && (
            <div className="dropdown-menu notif-dropdown">
              <h4>Notifications</h4>
              {notifications.length === 0 ? (
                <p className="no-data">No new notifications</p>
              ) : (
                <ul>
                  {notifications.map(notif => (
                    <li key={notif.id}>
                      <span className="notif-text">{notif.text}</span>
                      <span className="notif-time">{notif.time}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="topbar-profile" ref={profileRef} onClick={() => setShowProfileMenu(!showProfileMenu)}>
          <div className="profile-info">
            <div className="profile-name">
              {profile.name} <span className="admin-badge">ADMIN</span>
            </div>
            <div className="profile-role">Event Management Admin</div>
          </div>
          <img src={profile.avatar} alt="Admin Profile" className="topbar-avatar" />
          <span className="dropdown-arrow">▼</span>

          {showProfileMenu && (
            <div className="dropdown-menu profile-dropdown">
              <button onClick={(e) => { e.stopPropagation(); navigate('/admin/profile'); setShowProfileMenu(false);}}>
                👤 My Profile
              </button>
              <button onClick={(e) => { e.stopPropagation(); navigate('/admin/profile/password'); setShowProfileMenu(false);}}>
                🔒 Change Password
              </button>
              <div className="dropdown-divider"></div>
              <button className="logout-btn" onClick={(e) => { e.stopPropagation(); handleLogout(); }}>
                🚪 Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;

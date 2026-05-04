import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Topbar = ({ profile, handleLogout }) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const [showLangMenu, setShowLangMenu] = useState(false);

  // Hardcoded mock notifications
  const [notifications] = useState([
    { id: 1, text: 'New booking from Alice', time: '10 mins ago' },
    { id: 2, text: 'David Lee sent a message', time: '1 hour ago' }
  ]);

  const profileRef = useRef(null);
  const notifRef = useRef(null);
  const langRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifMenu(false);
      }
      if (langRef.current && !langRef.current.contains(event.target)) {
        setShowLangMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setShowLangMenu(false);
  };

  const currentLang = i18n.language || 'en';
  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'gu', name: 'ગુજરાતી', flag: '🇮🇳' }
  ];

  return (
    <div className="topbar glass-panel" style={{ borderRadius: '0 0 12px 12px', borderTop: 'none', borderLeft: 'none', borderRight: 'none', marginBottom: '20px' }}>
      <div className="topbar-left">
        <h3 style={{ color: '#0df', margin: 0 }}>{t('admin_topbar.dashboard_overview')}</h3>
      </div>
      
      <div className="topbar-right">
        {/* Language Switcher */}
        <div className="topbar-icon-dropdown" ref={langRef} style={{ marginRight: '15px' }}>
          <button className="icon-btn" onClick={() => setShowLangMenu(!showLangMenu)} style={{ fontSize: '18px' }}>
            🌐
          </button>
          
          {showLangMenu && (
            <div className="dropdown-menu lang-dropdown" style={{ minWidth: '150px' }}>
              {languages.map((lang) => (
                <button 
                  key={lang.code}
                  className={currentLang === lang.code ? 'active' : ''}
                  onClick={() => changeLanguage(lang.code)}
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '10px', 
                    width: '100%',
                    padding: '10px 15px',
                    textAlign: 'left',
                    background: currentLang === lang.code ? 'rgba(0, 255, 255, 0.1)' : 'transparent',
                    color: currentLang === lang.code ? '#0df' : '#fff',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  <span>{lang.flag}</span>
                  <span>{lang.name}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications */}
        <div className="topbar-icon-dropdown" ref={notifRef}>
          <button className="icon-btn" onClick={() => setShowNotifMenu(!showNotifMenu)}>
            🔔
            {notifications.length > 0 && <span className="badge">{notifications.length}</span>}
          </button>
          
          {showNotifMenu && (
            <div className="dropdown-menu notif-dropdown">
              <h4>{t('admin_topbar.notifications')}</h4>
              {notifications.length === 0 ? (
                <p className="no-data">{t('admin_topbar.no_notifications')}</p>
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
              {profile.name} <span className="admin-badge">{t('admin_topbar.admin_badge')}</span>
            </div>
            <div className="profile-role">{t('admin_topbar.admin_role')}</div>
          </div>
          <img src={profile.avatar} alt="Admin Profile" className="topbar-avatar" />
          <span className="dropdown-arrow">▼</span>

          {showProfileMenu && (
            <div className="dropdown-menu profile-dropdown">
              <button onClick={(e) => { e.stopPropagation(); navigate('/admin/profile'); setShowProfileMenu(false);}}>
                👤 {t('admin_topbar.my_profile')}
              </button>
              <button onClick={(e) => { e.stopPropagation(); navigate('/admin/profile/password'); setShowProfileMenu(false);}}>
                🔒 {t('admin_topbar.change_password')}
              </button>
              <div className="dropdown-divider"></div>
              <button className="logout-btn" onClick={(e) => { e.stopPropagation(); handleLogout(); }}>
                🚪 {t('admin_topbar.logout')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;

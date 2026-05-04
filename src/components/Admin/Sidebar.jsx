import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activeRoute, handleLogout }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const menuItems = [
    { id: '', label: t('admin_sidebar.user_list'), icon: '👥' },
    { id: 'pending-events', label: t('admin_sidebar.pending_events'), icon: '⏳' },
    { id: 'events', label: t('admin_sidebar.event_post'), icon: '📅' },
    { id: 'categories', label: t('admin_sidebar.post_category'), icon: '📁' },
    { id: 'gallery', label: t('admin_sidebar.add_gallery'), icon: '🖼️' },
    { id: 'contacts', label: t('admin_sidebar.contact_list'), icon: '📞' },
    { id: 'profile', label: t('admin_sidebar.profile'), icon: '👤' },
    { id: 'profile/password', label: t('admin_sidebar.change_password'), icon: '🔒' }
  ];

  return (
    <div className="sidebar glass-panel">
      <div className="sidebar-header">
        <span style={{fontSize: '24px'}}>⚡</span>
        <h2>{t('admin_sidebar.header')}</h2>
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
            {t('admin_sidebar.logout')}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;

import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './AdminDashboard.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAuth } from '../../context/AuthContext';
import { mockUsers, mockCategories, mockEvents, mockGallery, mockContacts, mockAdminProfile } from './mockData';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const location = useLocation();
  
  // Extract path to figure out "activeRoute" for Sidebar highlighting
  const activePagePath = location.pathname.split('/admin/')[1] || '';

  // Global Admin State
  const [users, setUsers] = useState(mockUsers);
  const [categories, setCategories] = useState(mockCategories);
  const [events, setEvents] = useState(mockEvents);
  const [gallery, setGallery] = useState(mockGallery);
  const [contacts] = useState(mockContacts); 
  const [profile, setProfile] = useState(user || mockAdminProfile);

  // Sync profile when user updates globally (e.g. from Profile page)
  React.useEffect(() => {
    if (user) setProfile(user);
  }, [user]);

  // We wrap all subpages inside an Outlet when using React Router
  // We'll pass the state via React Router's context feature 
  // Normally context or Redux is used, but Outlet context is elegant for routing.
  const contextValue = {
    users, setUsers,
    categories, setCategories,
    events, setEvents,
    gallery, setGallery,
    contacts,
    profile, setProfile
  };

  const handleLogoutAction = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      <Sidebar activeRoute={activePagePath} handleLogout={handleLogoutAction} />
      <div className="main-content">
        <Topbar profile={profile} handleLogout={handleLogoutAction} />
        <div className="page-container">
          <Outlet context={contextValue} />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

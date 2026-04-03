import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import './AdminDashboard.css';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useAuth } from '../../context/AuthContext';

const API_BASE = 'https://event-management-system-5wx4.onrender.com/api';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();
  const location = useLocation();
  
  const activePagePath = location.pathname.split('/admin/')[1] || '';

  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [profile, setProfile] = useState(user || {});

  const authHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };

  // Fetch all data on mount
  useEffect(() => {
    if (token) {
      fetchUsers();
      fetchCategories();
      fetchEvents();
      fetchGallery();
      fetchContacts();
    }
  }, [token]);

  // Sync profile when user updates globally
  useEffect(() => {
    if (user) setProfile(user);
  }, [user]);

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_BASE}/user`, { headers: authHeaders });
      if (res.ok) setUsers(await res.json());
    } catch (e) { console.error('Failed to fetch users', e); }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${API_BASE}/categories`);
      if (res.ok) setCategories(await res.json());
    } catch (e) { console.error('Failed to fetch categories', e); }
  };

  const fetchEvents = async () => {
    try {
      const res = await fetch(`${API_BASE}/events`);
      if (res.ok) setEvents(await res.json());
    } catch (e) { console.error('Failed to fetch events', e); }
  };

  const fetchGallery = async () => {
    try {
      const res = await fetch(`${API_BASE}/gallery`);
      if (res.ok) setGallery(await res.json());
    } catch (e) { console.error('Failed to fetch gallery', e); }
  };

  const fetchContacts = async () => {
    try {
      const res = await fetch(`${API_BASE}/messages`, { headers: authHeaders });
      console.log("Admin messages fetch response (Step 7):", res); // MANDATORY DEBUG STEP 7
      if (res.ok) {
        const data = await res.json();
        console.log("Admin messages list (Step 7):", data); // MANDATORY DEBUG STEP 7
        setContacts(data);
      }
    } catch (e) {
      console.error('Failed to fetch messages (Step 7):', e);
    }
  };

  const contextValue = {
    users, setUsers, fetchUsers,
    categories, setCategories, fetchCategories,
    events, setEvents, fetchEvents,
    gallery, setGallery, fetchGallery,
    contacts, setContacts, fetchContacts,
    profile, setProfile,
    token, authHeaders, API_BASE
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

import React, { useState, useRef, useEffect } from 'react';
import { Outlet, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTranslation } from 'react-i18next';
import Chatbot from './Common/Chatbot';
import './UserHome.css';

const UserLayout = () => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const changeLanguage = (e) => {
        const lang = e.target.value;
        i18n.changeLanguage(lang);
    };

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="user-home">
            <nav className="user-navbar">
                <div className="navbar-logo" onClick={() => navigate('/user/home')} style={{ cursor: 'pointer' }}>
                    HARMONI EVENT MANAGEMENT
                </div>
                <ul className="navbar-menu">
                    <li><Link to="/user/home" className="nav-btn">{t('navbar.home', 'Home')}</Link></li>
                    <li><Link to="/user/about" className="nav-btn">{t('navbar.about', 'About')}</Link></li>
                    <li><Link to="/user/events" className="nav-btn">{t('navbar.events', 'Events')}</Link></li>
                    <li><Link to="/user/gallery" className="nav-btn">{t('navbar.gallery', 'Gallery')}</Link></li>
                    <li><Link to="/user/contact" className="nav-btn">{t('navbar.contact', 'Contact')}</Link></li>
                    <li>
                        <Link to="/user/create-event" className="nav-btn" style={{ 
                            background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', 
                            color: '#fff', 
                            padding: '8px 16px', 
                            borderRadius: '20px',
                            fontWeight: 'bold'
                        }}>
                            {t('navbar.create_event')}
                        </Link>
                    </li>
                    <li>
                        <Link to="/user/chatbot" className="nav-btn" style={{ 
                            background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', 
                            color: '#fff', 
                            padding: '8px 16px', 
                            borderRadius: '20px',
                            fontWeight: 'bold',
                            boxShadow: '0 0 10px rgba(139, 92, 246, 0.5)',
                            marginLeft: '5px'
                        }}>
                            AI Chatbot ✨
                        </Link>
                    </li>
                </ul>

                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    {/* Language Switcher */}
                    <div className="lang-switcher">
                        <select 
                            onChange={changeLanguage} 
                            value={i18n.language}
                            style={{
                                background: 'rgba(255, 255, 255, 0.05)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                color: '#fff',
                                padding: '5px 10px',
                                borderRadius: '8px',
                                fontSize: '13px',
                                cursor: 'pointer',
                                outline: 'none'
                            }}
                        >
                            <option value="en" style={{color:'#000'}}>English</option>
                            <option value="hi" style={{color:'#000'}}>Hindi</option>
                            <option value="gu" style={{color:'#000'}}>Gujarati</option>
                        </select>
                    </div>

                    {/* Profile Section */}
                    <div className="user-profile-section" ref={dropdownRef} style={{ position: 'relative' }}>
                        <div className="user-avatar" onClick={toggleDropdown} style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                            cursor: 'pointer',
                            border: '2px solid #00d2ff',
                            boxShadow: '0 0 10px rgba(0,210,255,0.3)'
                        }}>
                            <img src={user?.avatar || 'https://i.pravatar.cc/150'} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>

                        {dropdownOpen && (
                            <div className="profile-dropdown" style={{
                                position: 'absolute',
                                top: '50px',
                                right: '0',
                                width: '200px',
                                background: 'rgba(15, 23, 42, 0.95)',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderRadius: '12px',
                                padding: '10px 0',
                                boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                                zIndex: 1000
                            }}>
                                <div className="dropdown-header" style={{ padding: '10px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '5px' }}>
                                    <p style={{ color: '#fff', fontWeight: 'bold', fontSize: '14px', margin: 0 }}>{user?.name}</p>
                                    <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>{user?.email}</p>
                                </div>
                                <button onClick={() => { navigate('/user/account'); setDropdownOpen(false); }} className="dropdown-item">{t('navbar.account')}</button>
                                <button onClick={() => { navigate('/user/create-event'); setDropdownOpen(false); }} className="dropdown-item">{t('navbar.create_event')}</button>
                                <button onClick={() => { navigate('/user/change-password'); setDropdownOpen(false); }} className="dropdown-item">Change Password</button>
                                <div style={{ height: '1px', background: 'rgba(255, 255, 255, 0.1)', margin: '10px 0' }}></div>
                                <button onClick={handleLogout} className="dropdown-item" style={{ color: '#ff4d4d' }}>{t('navbar.logout')}</button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <div className="user-content">
                <Outlet />
            </div>

            <Chatbot />

            <style>{`
                .dropdown-item {
                    display: block;
                    width: 100%;
                    background: none;
                    border: none;
                    color: #cbd5e1;
                    text-align: left;
                    font-size: 14px;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    padding: 10px 20px;
                }
                .dropdown-item:hover {
                    background: rgba(255, 255, 255, 0.05);
                    color: #00d2ff;
                }
            `}</style>
        </div>
    );
};

export default UserLayout;

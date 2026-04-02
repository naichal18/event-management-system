import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserHome.css';

const UserHome = ({ onLogout }) => {
  const navigate = useNavigate();
  // Simulated initial user data
  const [user] = useState({
    name: 'Spark User',
    avatar: 'https://i.pravatar.cc/150?u=spark'
  });

  const handleLogoutAction = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <div className="user-home">
      {/* SECTION 1: NAVBAR */}
      <nav className="user-navbar">
        <div className="navbar-logo">HARMONI EVENT MANAGEMENT</div>
        <ul className="navbar-menu">
          <li><a href="#home">HOME</a></li>
          <li><a href="#about">ABOUT</a></li>
          <li><a href="#events">EVENTS</a></li>
          <li><a href="#gallery">GALLERY</a></li>
          <li><a href="#contact">CONTACT</a></li>
        </ul>
        <div className="navbar-profile">
          <span>{user.name}</span>
          <img src={user.avatar} alt="User Avatar" className="navbar-profile-avatar" />
          <button className="navbar-logout" onClick={handleLogoutAction}>Logout</button>
        </div>
      </nav>

      {/* SECTION 2: HERO SECTION */}
      <section className="hero-section" id="home">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>One Stop Event Planet</h1>
          <p>Discover, book, and experience the greatest events crafted seamlessly by the Harmoni management platform. We deliver premium experiences for all.</p>
          
          <div className="hero-input-group">
            <input type="email" placeholder="Enter your email" className="hero-input" />
            <button className="user-gradient-btn" style={{ borderRadius: '30px' }}>Get Started</button>
          </div>

          <div className="user-avatars">
            <div className="avatars-wrapper">
              <img src="https://i.pravatar.cc/100?img=1" alt="avatar1" />
              <img src="https://i.pravatar.cc/100?img=2" alt="avatar2" />
              <img src="https://i.pravatar.cc/100?img=3" alt="avatar3" />
              <img src="https://i.pravatar.cc/100?img=4" alt="avatar4" />
            </div>
            <span style={{ color: '#cbd5e1', fontSize: '14px' }}>1600+ people requested access in the last 24 hours</span>
          </div>
        </div>
      </section>

      {/* SECTION 3: ABOUT SECTION */}
      <section className="about-section" id="about">
        <div className="about-left">
          <h2>Harmony Event Management firm & Wedding Planner...</h2>
          <p>We are a dedicated team of professionals focused on curating the most unforgettable experiences. Whether it is a corporate gathering or a breathtaking wedding, our deep roster of vendors and experts ensures perfection down to the smallest detail.</p>
        </div>
        <div className="about-right">
          <ul className="services-list">
            <li className="user-glass-card">📸 Photography</li>
            <li className="user-glass-card">🎥 Cinematography</li>
            <li className="user-glass-card">✨ Full Venue Decoration</li>
            <li className="user-glass-card">🏠 Home Decoration</li>
          </ul>
        </div>
      </section>

      {/* SECTION 4: FEATURES SECTION */}
      <section className="features-section" id="events">
        <div className="features-grid">
          <div className="feature-card user-glass-card">
            <span className="feature-icon">🤖</span>
            <h3>Chatbots</h3>
            <p>Engage with our AI-powered chatbots directly via our platform to get instant answers ensuring you never suffer delays.</p>
          </div>
          <div className="feature-card user-glass-card">
            <span className="feature-icon">📚</span>
            <h3>Knowledgebase</h3>
            <p>Access our comprehensive collection of event-planning articles, guidelines, and toolkits curated by leading experts.</p>
          </div>
          <div className="feature-card user-glass-card">
            <span className="feature-icon">🎓</span>
            <h3>Education</h3>
            <p>Participate in online modules designed to fast-track your event coordination skills and connect you to local suppliers.</p>
          </div>
        </div>
      </section>

      {/* SECTION 5: CTA SECTION */}
      <section className="cta-section" id="contact">
        <div className="cta-card user-glass-card">
          <h2>Registered Today & start exploring...</h2>
          <p style={{ color: '#cbd5e1', marginBottom: '30px' }}>Join the community of thousands creating incredible gatherings worldwide.</p>
          <button className="user-gradient-btn" style={{ fontSize: '18px', padding: '16px 40px', borderRadius: '30px' }}>GET STARTED</button>
        </div>
      </section>

    </div>
  );
};

export default UserHome;

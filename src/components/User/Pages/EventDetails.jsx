import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const res = await fetch(`https://event-management-system-5wx4.onrender.com/api/events/${id}`);
      if (res.ok) {
        const data = await res.json();
        setEvent(data);
      }
    } catch (error) {
      console.error('Failed to fetch event:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '100px', textAlign: 'center', color: '#fff' }}>Loading event details...</div>;
  if (!event) return <div style={{ padding: '100px', textAlign: 'center', color: '#ef4444' }}>Event not found.</div>;

  return (
    <div style={{ minHeight: '100vh', padding: '60px 20px', maxWidth: '1100px', margin: '0 auto' }}>
      <button
        onClick={() => navigate('/user/events')}
        style={{ background: 'none', border: '1px solid rgba(0,255,255,0.3)', color: '#0df', borderRadius: '20px', padding: '8px 20px', cursor: 'pointer', marginBottom: '30px', fontSize: '14px', transition: 'all 0.3s' }}
        onMouseOver={(e) => e.target.style.background = 'rgba(0,255,255,0.1)'}
        onMouseOut={(e) => e.target.style.background = 'none'}
      >
        ← Back to Events
      </button>

      {/* Hero Header */}
      <div style={{ position: 'relative', borderRadius: '25px', overflow: 'hidden', marginBottom: '40px', border: '1px solid rgba(0,255,255,0.2)' }}>
        <img src={event.image} alt={event.title} style={{ width: '100%', height: '450px', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11, 17, 32, 1) 0%, rgba(11, 17, 32, 0.4) 60%, transparent 100%)' }}></div>
        <div style={{ position: 'absolute', bottom: '40px', left: '40px', right: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <span style={{ display: 'inline-block', background: 'rgba(59, 130, 246, 0.3)', color: '#60a5fa', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: 700, marginBottom: '15px', border: '1px solid rgba(59, 130, 246, 0.5)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {event.category}
            </span>
            <h1 style={{ fontSize: '3rem', fontWeight: 900, color: '#fff', marginBottom: '10px', textShadow: '2px 2px 20px rgba(0,0,0,0.5)' }}>{event.title}</h1>
          </div>
          <div style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', color: '#fff', padding: '10px 25px', borderRadius: '20px', fontSize: '18px', fontWeight: 800, boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.5)' }}>
            ₹{event.price.toLocaleString()} / ticket
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.3fr) minmax(0, 1fr)', gap: '35px', alignItems: 'start' }}>
        
        {/* LEFT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Main Details */}
          <div className="user-glass-card" style={{ padding: '35px' }}>
            <h3 style={{ color: '#0df', marginBottom: '25px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '15px', fontSize: '1.5rem', fontWeight: 700 }}>Event Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {[
                { icon: '📅', label: 'Date', value: event.date },
                { icon: '🕒', label: 'Time', value: event.time || '7:00 PM' },
                { icon: '📍', label: 'Location', value: event.location, span: '2' },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '15px', alignItems: 'flex-start', gridColumn: item.span ? `span ${item.span}` : 'auto' }}>
                  <div style={{ width: '45px', height: '45px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    {item.icon}
                  </div>
                  <div>
                    <p style={{ color: '#64748b', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{item.label}</p>
                    <p style={{ color: '#f8fafc', fontWeight: 600, fontSize: '15px' }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* About Event */}
          <div className="user-glass-card" style={{ padding: '35px' }}>
            <h3 style={{ color: '#0df', marginBottom: '20px', fontSize: '1.5rem', fontWeight: 700 }}>About This Event</h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '15px' }}>This is a premier {event.category} event happening in {event.location}. Experience the best of {event.title} with fellow enthusiasts. Get ready for an unforgettable time filled with excitement, networking, and premium entertainment tailored exclusively for our guests.</p>
          </div>

          {/* Why Attend */}
          <div className="user-glass-card" style={{ padding: '35px' }}>
            <h3 style={{ color: '#0df', marginBottom: '20px', fontSize: '1.5rem', fontWeight: 700 }}>🔥 Why Attend</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {[
                'Experience electrifying live atmosphere',
                'Meet like-minded people and network',
                'Enjoy premium entertainment & luxury arrangements',
                'Unique, once-in-a-lifetime event experience'
              ].map((reason, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#cbd5e1', fontSize: '15px' }}>
                  <span style={{ color: '#3b82f6', fontSize: '16px' }}>✔</span> {reason}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* RIGHT COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Smart Recommendation Panel */}
          <div className="user-glass-card" style={{ padding: '30px', background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.9), rgba(6, 182, 212, 0.15))', border: '1px solid rgba(0, 210, 255, 0.4)', position: 'relative', boxShadow: '0 0 20px rgba(6, 182, 212, 0.15)', transition: 'all 0.3s ease' }} onMouseOver={(e) => e.currentTarget.style.boxShadow = '0 0 30px rgba(6, 182, 212, 0.3)'} onMouseOut={(e) => e.currentTarget.style.boxShadow = '0 0 20px rgba(6, 182, 212, 0.15)'}>
            <div style={{ position: 'absolute', top: '-12px', right: '20px', background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', boxShadow: '0 4px 10px rgba(6, 182, 212, 0.4)' }}>
              Recommended for You
            </div>
            <h3 style={{ color: '#0df', marginBottom: '20px', fontSize: '1.2rem', fontWeight: 800, textShadow: '0 0 10px rgba(0, 210, 255, 0.3)' }}>
              Why This Event is Perfect for You
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { icon: '🎯', text: `Matches your interest in ${event.category || 'this category'}` },
                { icon: '📍', text: 'Great location accessibility' },
                { icon: '🔥', text: 'Popular trending event' },
                { icon: '💰', text: 'Budget friendly option' },
                { icon: '✨', text: 'Highly engaging experience' }
              ].map((reason, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '12px 15px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.2s' }} onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(0, 210, 255, 0.1)'; e.currentTarget.style.borderColor = 'rgba(0, 210, 255, 0.3)'; }} onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)'; }}>
                  <span style={{ fontSize: '18px' }}>{reason.icon}</span>
                  <span style={{ color: '#e2e8f0', fontSize: '14px', fontWeight: 500 }}>{reason.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Event Highlights */}
          <div className="user-glass-card" style={{ padding: '30px' }}>
            <h3 style={{ color: '#0df', marginBottom: '20px', fontSize: '1.2rem', fontWeight: 700 }}>🎯 Event Highlights</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {['Live Music / DJ', 'Food & Drinks', 'Special Guests', 'Parking Available', 'Security & Safety'].map((tag, i) => (
                <span key={i} style={{ background: 'rgba(59, 130, 246, 0.1)', border: '1px solid rgba(59, 130, 246, 0.3)', color: '#93c5fd', padding: '6px 14px', borderRadius: '20px', fontSize: '13px', fontWeight: 600 }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Nearby Facilities */}
          <div className="user-glass-card" style={{ padding: '30px' }}>
            <h3 style={{ color: '#0df', marginBottom: '20px', fontSize: '1.2rem', fontWeight: 700 }}>📍 Nearby Facilities</h3>
            <div style={{ display: 'grid', gap: '12px' }}>
              {[
                { icon: '🚗', text: 'Parking Available' },
                { icon: '🍽️', text: 'Restaurants Nearby' },
                { icon: '🚇', text: 'Public Transport Access' },
                { icon: '🏨', text: 'Hotels Nearby' }
              ].map((facility, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ fontSize: '18px' }}>{facility.icon}</span>
                  <span style={{ color: '#cbd5e1', fontSize: '14px', fontWeight: 500 }}>{facility.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Organizer Info */}
          <div className="user-glass-card" style={{ padding: '30px' }}>
            <h3 style={{ color: '#0df', marginBottom: '20px', fontSize: '1.2rem', fontWeight: 700 }}>👤 Organizer Info</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
                <span style={{ color: '#94a3b8', fontSize: '13px' }}>Organizer Name</span>
                <span style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>Harmoni Events</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '10px' }}>
                <span style={{ color: '#94a3b8', fontSize: '13px' }}>Contact Number</span>
                <span style={{ color: '#fff', fontSize: '14px', fontWeight: 600 }}>+91 9876543210</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#94a3b8', fontSize: '13px' }}>Email Support</span>
                <span style={{ color: '#3b82f6', fontSize: '14px', fontWeight: 600, cursor: 'pointer' }}>contact@harmoni.com</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EventDetails;

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

// 🚀 UNIQUE IMAGE MAPPING BY EVENT TITLE
const EVENT_UNIQUE_IMAGES = {
  'IPL Fan Fest': 'https://images.unsplash.com/photo-1540747913346-19212a4b74a5?auto=format&fit=crop&w=1200&q=80',
  'City Cricket League': 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&w=1200&q=80',
  'Night Cricket Tournament': 'https://images.unsplash.com/photo-1508341595083-fcd34d8cc142?auto=format&fit=crop&w=1200&q=80',
  'Corporate Cricket Cup': 'https://images.unsplash.com/photo-1542393545-10f5cde2c810?auto=format&fit=crop&w=1200&q=80'
};

const CATEGORY_FALLBACKS = {
  Concert: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
  Festival: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae',
  Corporate: 'https://images.unsplash.com/photo-1511578314322-379afb476865',
  Party: 'https://images.unsplash.com/photo-1533777857889-4be7c70b33f7'
};

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { API_BASE } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const SERVER_URL = API_BASE.replace('/api', '');

  const handleImageError = (e, title, category) => {
    e.target.onerror = null;
    e.target.src = EVENT_UNIQUE_IMAGES[title] || CATEGORY_FALLBACKS[category] || 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&w=1200&q=80';
  };

  const getImageUrl = (imagePath, title, category) => {
    if (EVENT_UNIQUE_IMAGES[title]) return EVENT_UNIQUE_IMAGES[title];
    if (!imagePath) return CATEGORY_FALLBACKS[category] || 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&w=1200&q=80';
    if (imagePath.startsWith('http')) return imagePath;
    return `${SERVER_URL}${imagePath}`;
  };

  useEffect(() => {
    fetch(`${API_BASE}/events/${id}`)
      .then(res => res.json())
      .then(data => { setEvent(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id, API_BASE]);

  if (loading) return <div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>Loading...</div>;
  if (!event) return <div style={{ color: '#ef4444', textAlign: 'center', padding: '100px' }}>Event Not Found</div>;

  return (
    <div style={{ minHeight: '100vh', padding: '60px 20px', maxWidth: '1100px', margin: '0 auto', background: '#0b1120', color: '#fff' }}>
      <button onClick={() => navigate('/user/events')} style={{ background: 'transparent', border: '1px solid #0df', color: '#0df', padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', marginBottom: '30px' }}>← Back to Events</button>
      
      <div style={{ position: 'relative', borderRadius: '30px', overflow: 'hidden', height: '500px', marginBottom: '40px' }}>
        <img src={getImageUrl(event.image, event.title, event.category)} alt={event.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => handleImageError(e, event.title, event.category)} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0b1120 0%, transparent 70%)' }}></div>
        <div style={{ position: 'absolute', bottom: '40px', left: '40px' }}>
          <span style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#0df', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: 800 }}>{event.category}</span>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginTop: '10px' }}>{event.title}</h1>
        </div>
      </div>

      <div style={{ background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.05)' }}>
        <h3 style={{ color: '#0df', fontSize: '1.5rem', marginBottom: '20px' }}>Event Overview</h3>
        <p style={{ color: '#94a3b8', lineHeight: 1.8 }}>{event.description || `Join us for ${event.title}, a premier ${event.category} event in ${event.location}.`}</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '30px' }}>
           <div><span style={{ color: '#64748b', fontSize: '12px' }}>DATE</span><p style={{ fontSize: '18px', fontWeight: 700 }}>{event.date}</p></div>
           <div><span style={{ color: '#64748b', fontSize: '12px' }}>LOCATION</span><p style={{ fontSize: '18px', fontWeight: 700 }}>{event.location}</p></div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

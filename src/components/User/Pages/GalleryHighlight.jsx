import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useTranslation } from 'react-i18next';

const FALLBACK = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80';

const GalleryHighlight = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { API_BASE } = useAuth();
  const SERVER_URL = API_BASE.replace('/api', '');
  
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return FALLBACK;
    if (imagePath.startsWith('http')) return imagePath;
    return `${SERVER_URL}${imagePath}`;
  };

  useEffect(() => {
    fetch(`${API_BASE}/gallery`)
      .then(res => res.json())
      .then(data => {
        const found = data.find(g => g._id === id);
        setItem(found);
      })
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id, API_BASE]);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center', color: '#fff' }}>{t('common.loading')}</div>;

  if (!item) {
    return (
      <div style={{ padding: '120px 40px', textAlign: 'center', minHeight: '100vh' }}>
        <h2 style={{ color: '#ef4444', marginBottom: '20px' }}>Memory not found.</h2>
        <button className="user-gradient-btn" onClick={() => navigate('/user/gallery')}>← Back to Gallery</button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '100px', background: '#0b1120' }}>

      {/* 1. HERO BANNER */}
      <div style={{ position: 'relative', height: '600px' }}>
        <img
          src={getImageUrl(item.imageUrl)}
          alt={item.title}
          onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK; }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(to top, #0b1120 0%, rgba(11,17,32,0.6) 50%, rgba(11,17,32,0.3) 100%)' 
        }}></div>

        <button
          onClick={() => navigate('/user/gallery')}
          style={{ position: 'absolute', top: '30px', left: '40px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,255,255,0.3)', color: '#0df', borderRadius: '30px', padding: '10px 25px', cursor: 'pointer', fontSize: '14px', fontWeight: 600, backdropFilter: 'blur(10px)', zIndex: 10 }}
        >
          ← Back to Visual History
        </button>

        <div style={{ position: 'absolute', bottom: '60px', left: '60px', right: '60px' }}>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <span style={{ background: '#0df', color: '#000', padding: '5px 15px', borderRadius: '20px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase' }}>PAST EVENT</span>
            <span style={{ color: '#94a3b8', fontWeight: 600 }}>📍 {item.location}</span>
            <span style={{ color: '#94a3b8', fontWeight: 600 }}>📅 {item.date}</span>
          </div>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 900, color: '#fff', marginBottom: '15px', lineHeight: 1.1, letterSpacing: '-1px' }}>
            {item.title}
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1.2rem', maxWidth: '800px', lineHeight: 1.6 }}>{item.description.substring(0, 150)}...</p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 60px' }}>
        
        {/* 2. STORY & HIGHLIGHTS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '50px', marginTop: '-40px', position: 'relative', zIndex: 5 }}>
          <div className="user-glass-card" style={{ padding: '50px', borderRadius: '30px' }}>
            <h2 style={{ color: '#0df', fontSize: '1.8rem', fontWeight: 800, marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              📖 The Event Story
            </h2>
            <p style={{ color: '#cbd5e1', fontSize: '1.15rem', lineHeight: 1.8, marginBottom: '30px' }}>
              {item.description}
            </p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              {item.highlights && item.highlights.map((h, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.03)', padding: '15px 20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)', color: '#fff', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ color: '#0df', fontSize: '20px' }}>✦</span> {h}
                </div>
              ))}
            </div>
          </div>

          {/* TIMELINE SIDEBAR */}
          <div className="user-glass-card" style={{ padding: '40px', borderRadius: '30px', height: 'fit-content' }}>
            <h2 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 800, marginBottom: '30px' }}>⏱ Event Schedule</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              {item.timeline && item.timeline.map((step, i) => (
                <div key={i} style={{ display: 'flex', gap: '20px' }}>
                  <div style={{ minWidth: '80px', color: '#0df', fontWeight: 800, fontSize: '14px' }}>{step.time}</div>
                  <div style={{ color: '#fff', fontWeight: 600 }}>{step.activity}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 3. PHOTO GALLERY */}
        <div style={{ marginTop: '100px' }}>
          <h2 style={{ color: '#fff', fontSize: '2.5rem', fontWeight: 900, marginBottom: '50px', textAlign: 'center' }}>
            🖼 Photo <span style={{ color: '#0df' }}>Gallery</span>
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '30px' 
          }}>
            {item.images && item.images.map((img, i) => (
              <div 
                key={i} 
                style={{ 
                  height: '250px', 
                  borderRadius: '20px', 
                  overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.1)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  transition: 'all 0.3s'
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              >
                <img src={getImageUrl(img)} alt={`Gallery ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
            {/* If no images, show the cover image as fallback */}
            {(!item.images || item.images.length === 0) && (
              <div style={{ height: '250px', borderRadius: '20px', overflow: 'hidden' }}>
                <img src={getImageUrl(item.imageUrl)} alt="Cover" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default GalleryHighlight;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/AuthContext';

const FALLBACK = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80';

const Gallery = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { API_BASE } = useAuth();
  const SERVER_URL = API_BASE.replace('/api', '');
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return FALLBACK;
    if (imagePath.startsWith('http')) return imagePath;
    return `${SERVER_URL}${imagePath}`;
  };

  useEffect(() => {
    fetch(`${API_BASE}/gallery`)
      .then(res => res.ok ? res.json() : [])
      .then(data => setItems(data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, [API_BASE]);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center', color: '#fff' }}>{t('gallery_page.loading')}</div>;

  return (
    <div style={{ padding: '60px 50px', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '2.8rem', fontWeight: 800, color: '#fff', marginBottom: '15px' }}>
          {t('gallery_page.title')}
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>{t('gallery_page.subtitle')}</p>
        <div style={{ height: '4px', width: '70px', background: 'linear-gradient(to right, #06b6d4, #3b82f6)', margin: '20px auto 0', borderRadius: '2px' }}></div>
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#64748b', padding: '80px 0', fontSize: '1.1rem' }}>
          <p>{t('gallery_page.no_images')}</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))',
          gap: '40px',
          maxWidth: '1400px',
          margin: '0 auto'
        }}>
          {items.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/user/gallery/${item._id}`)}
              style={{
                cursor: 'pointer',
                borderRadius: '32px',
                overflow: 'hidden',
                position: 'relative',
                background: 'rgba(15, 23, 42, 0.4)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                height: '480px'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-15px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 30px 70px rgba(0,210,255,0.25)';
                e.currentTarget.style.borderColor = 'rgba(0,210,255,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.3)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              {/* Image Container */}
              <div style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={getImageUrl(item.imageUrl)}
                  alt={item.title}
                  onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK; }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
                  className="gallery-card-img"
                />
                <div style={{
                  position: 'absolute',
                  top: '25px',
                  right: '25px',
                  background: 'rgba(0,0,0,0.7)',
                  backdropFilter: 'blur(10px)',
                  padding: '8px 18px',
                  borderRadius: '30px',
                  fontSize: '12px',
                  fontWeight: 800,
                  color: '#0df',
                  border: '1px solid rgba(0,255,255,0.4)',
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  boxShadow: '0 4px 15px rgba(0,210,255,0.3)'
                }}>
                  SUCCESSFUL
                </div>
                {/* Category Badge overlay */}
                <div style={{ position: 'absolute', bottom: '20px', left: '25px', background: 'rgba(0,210,255,0.8)', color: '#000', padding: '4px 12px', borderRadius: '8px', fontSize: '11px', fontWeight: 900, textTransform: 'uppercase' }}>
                  {item.eventType || 'Event'}
                </div>
              </div>

              {/* Content Container */}
              <div style={{ padding: '30px', display: 'flex', flexDirection: 'column', height: '180px', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ color: '#fff', fontWeight: 900, fontSize: '1.6rem', marginBottom: '10px', lineHeight: '1.1', letterSpacing: '-0.5px' }}>
                    {item.title}
                  </h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px', color: '#94a3b8', fontSize: '14px', fontWeight: 600 }}>
                    <span>📍 {item.location}</span>
                    <span>📅 {item.date}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '15px' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <span style={{ fontSize: '11px', background: 'rgba(0,210,255,0.1)', padding: '5px 12px', borderRadius: '12px', color: '#0df', fontWeight: 700 }}>
                      {item.guestCount}
                    </span>
                  </div>
                  <span style={{ color: '#0df', fontWeight: 800, fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    Read Story <span style={{ fontSize: '18px' }}>→</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;

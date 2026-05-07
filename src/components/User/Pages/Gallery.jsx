import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/AuthContext';

const FALLBACK = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80';

const Gallery = () => {
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
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '40px',
          maxWidth: '1300px',
          margin: '0 auto'
        }}>
          {items.map((item) => (
            <div
              key={item._id}
              onClick={() => navigate(`/user/gallery/${item._id}`)}
              style={{
                cursor: 'pointer',
                borderRadius: '24px',
                overflow: 'hidden',
                position: 'relative',
                background: 'rgba(15, 23, 42, 0.6)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                height: '420px'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,210,255,0.2)';
                e.currentTarget.style.borderColor = 'rgba(0,210,255,0.4)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.4)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              {/* Image Container */}
              <div style={{ height: '260px', overflow: 'hidden', position: 'relative' }}>
                <img
                  src={getImageUrl(item.imageUrl)}
                  alt={item.title}
                  onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK; }}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }}
                  className="gallery-card-img"
                />
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  background: 'rgba(0,0,0,0.6)',
                  backdropFilter: 'blur(10px)',
                  padding: '6px 14px',
                  borderRadius: '20px',
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#0df',
                  border: '1px solid rgba(0,255,255,0.3)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  COMPLETED
                </div>
              </div>

              {/* Content Container */}
              <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', height: '160px', justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ color: '#fff', fontWeight: 800, fontSize: '1.4rem', marginBottom: '8px', lineHeight: '1.2' }}>
                    {item.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '15px', color: '#94a3b8', fontSize: '13px', fontWeight: 500 }}>
                    <span>📍 {item.location}</span>
                    <span>📅 {item.date}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '15px' }}>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    {item.highlights && item.highlights.slice(0, 2).map((h, i) => (
                      <span key={i} style={{ fontSize: '10px', background: 'rgba(255,255,255,0.05)', padding: '4px 8px', borderRadius: '4px', color: '#64748b' }}>
                        #{h.split(' ')[0]}
                      </span>
                    ))}
                  </div>
                  <span style={{ color: '#0df', fontWeight: 700, fontSize: '12px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    View Story →
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

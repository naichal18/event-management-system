import React, { useState, useEffect } from 'react';

const API_BASE = 'https://event-management-system-5wx4.onrender.com/api';
const FALLBACK = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80';

const Gallery = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/gallery`)
      .then(res => res.ok ? res.json() : [])
      .then(data => setItems(data))
      .catch(() => setItems([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={{ padding: '100px', textAlign: 'center', color: '#fff' }}>Loading gallery...</div>;

  return (
    <div style={{ padding: '60px 50px', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '2.8rem', fontWeight: 800, color: '#fff', marginBottom: '15px' }}>
          Event Gallery
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>A showcase of memorable moments curated by Harmoni</p>
        <div style={{ height: '4px', width: '70px', background: 'linear-gradient(to right, #06b6d4, #3b82f6)', margin: '20px auto 0', borderRadius: '2px' }}></div>
      </div>

      {items.length === 0 ? (
        <div style={{ textAlign: 'center', color: '#64748b', padding: '80px 0', fontSize: '1.1rem' }}>
          <p>No gallery images yet. Admin can add images from the dashboard.</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '30px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {items.map((item) => (
            <div
              key={item._id}
              style={{
                cursor: 'default',
                borderRadius: '16px',
                overflow: 'hidden',
                position: 'relative',
                border: '1px solid rgba(255,255,255,0.08)',
                transition: 'all 0.35s ease',
                boxShadow: '0 4px 20px rgba(0,0,0,0.3)'
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'scale(1.04)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,200,255,0.3)';
                e.currentTarget.style.borderColor = 'rgba(0,200,255,0.5)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
              }}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK; }}
                style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }}
              />

              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(11,17,32,0.95) 0%, rgba(11,17,32,0.2) 60%, transparent 100%)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '20px'
              }}>
                <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem', marginBottom: '4px', letterSpacing: '0.5px' }}>
                  {item.title}
                </h3>
                <p style={{ color: '#94a3b8', fontSize: '12px', marginBottom: '4px' }}>{item.description}</p>
                <p style={{ color: '#0df', fontSize: '11px', fontWeight: 600, letterSpacing: '1px' }}>
                  {new Date(item.timestamp).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;

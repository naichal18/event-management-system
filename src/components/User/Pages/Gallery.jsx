import React from 'react';
import { useNavigate } from 'react-router-dom';
import { galleryData } from './galleryData';

const FALLBACK = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80';

const Gallery = () => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: '60px 50px', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontSize: '2.8rem', fontWeight: 800, color: '#fff', marginBottom: '15px' }}>
          Event Gallery
        </h2>
        <p style={{ color: '#94a3b8', fontSize: '1.1rem' }}>Click any highlight to relive the best moments</p>
        <div style={{ height: '4px', width: '70px', background: 'linear-gradient(to right, #06b6d4, #3b82f6)', margin: '20px auto 0', borderRadius: '2px' }}></div>
      </div>

      {/* Gallery Grid — 3 per row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {galleryData.map((item) => (
          <div
            key={item.name}
            onClick={() => navigate(`/user/gallery/${item.name}`)}
            style={{
              cursor: 'pointer',
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
            {/* Image */}
            <img
              src={item.image}
              alt={item.label}
              onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK; }}
              style={{ width: '100%', height: '250px', objectFit: 'cover', display: 'block' }}
            />

            {/* Overlay on hover */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(11,17,32,0.95) 0%, rgba(11,17,32,0.2) 60%, transparent 100%)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: '20px'
            }}>
              <h3 style={{ color: '#fff', fontWeight: 700, fontSize: '1.2rem', marginBottom: '6px', letterSpacing: '0.5px' }}>
                {item.label}
              </h3>
              <p style={{ color: '#0df', fontSize: '12px', fontWeight: 600, letterSpacing: '1px' }}>
                VIEW HIGHLIGHTS →
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;

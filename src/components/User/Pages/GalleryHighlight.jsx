import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { galleryData } from './galleryData';

const FALLBACK = 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80';

const GalleryHighlight = () => {
  const { eventName } = useParams();
  const navigate = useNavigate();
  const item = galleryData.find(g => g.name === eventName);

  if (!item) {
    return (
      <div style={{ padding: '80px', textAlign: 'center' }}>
        <h2 style={{ color: '#ef4444', marginBottom: '20px' }}>Gallery item not found.</h2>
        <button className="user-gradient-btn" onClick={() => navigate('/user/gallery')}>← Back to Gallery</button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '80px' }}>

      {/* 1. Large Banner */}
      <div style={{ position: 'relative', height: '450px' }}>
        <img
          src={item.image}
          alt={item.label}
          onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK; }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11,17,32,1) 0%, rgba(11,17,32,0.5) 60%, rgba(11,17,32,0.2) 100%)' }}></div>

        {/* Back button */}
        <button
          onClick={() => navigate('/user/gallery')}
          style={{ position: 'absolute', top: '20px', left: '20px', background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,255,255,0.3)', color: '#0df', borderRadius: '20px', padding: '8px 20px', cursor: 'pointer', fontSize: '13px', backdropFilter: 'blur(8px)' }}
        >
          ← Back to Gallery
        </button>

        {/* Title overlaid on banner */}
        <div style={{ position: 'absolute', bottom: '40px', left: '50px', right: '50px' }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 900,
            background: 'linear-gradient(to right, #fff, #94a3b8)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: '10px',
            lineHeight: 1.1
          }}>
            {item.label} Highlights
          </h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>🏆 Harmoni Events — Curated Memories</p>
        </div>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '60px 50px 0' }}>

        {/* 2. Description */}
        <div className="user-glass-card" style={{ padding: '40px', marginBottom: '50px' }}>
          <h2 style={{ color: '#0df', marginBottom: '20px', fontSize: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '12px' }}>
            📸 Event Story
          </h2>
          <p style={{ color: '#cbd5e1', lineHeight: 1.9, fontSize: '1.05rem' }}>
            {item.description}
          </p>
        </div>

        {/* 3. Timeline */}
        <div>
          <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800, marginBottom: '40px', textAlign: 'center' }}>
            ⏱ Event Timeline
          </h2>

          <div style={{ position: 'relative' }}>
            {/* Central vertical line */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '2px',
              background: 'linear-gradient(to bottom, #06b6d4, #3b82f6)',
              transform: 'translateX(-50%)'
            }}></div>

            {item.timeline.map((step, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: isLeft ? 'flex-start' : 'flex-end',
                    marginBottom: '40px',
                    position: 'relative'
                  }}
                >
                  <div
                    className="user-glass-card"
                    style={{
                      width: '42%',
                      padding: '20px 25px',
                      borderRadius: '12px',
                      marginRight: isLeft ? '0' : '50px',
                      marginLeft: isLeft ? '50px' : '0',
                      transition: 'all 0.3s'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,200,255,0.2)'; e.currentTarget.style.borderColor = 'rgba(0,200,255,0.4)'; }}
                    onMouseLeave={e => { e.currentTarget.style.boxShadow = ''; e.currentTarget.style.borderColor = ''; }}
                  >
                    <p style={{
                      color: '#0df',
                      fontWeight: 800,
                      fontSize: '1rem',
                      marginBottom: '6px',
                      letterSpacing: '0.5px'
                    }}>
                      🕒 {step.time}
                    </p>
                    <p style={{ color: '#fff', fontWeight: 600, fontSize: '1rem' }}>{step.event}</p>
                  </div>

                  {/* Circle on timeline */}
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #06b6d4, #3b82f6)',
                    border: '3px solid #0b1120',
                    boxShadow: '0 0 10px rgba(0,200,255,0.6)',
                    zIndex: 2
                  }}></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryHighlight;

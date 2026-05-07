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

  if (loading) return (
    <div style={{ padding: '100px', textAlign: 'center', color: '#fff', background: '#0b1120', minHeight: '100vh' }}>
      <div className="loader"></div>
      <p style={{ marginTop: '20px' }}>Loading Event Memories...</p>
    </div>
  );

  if (!item) {
    return (
      <div style={{ padding: '120px 40px', textAlign: 'center', minHeight: '100vh', background: '#0b1120' }}>
        <h2 style={{ color: '#ef4444', marginBottom: '20px' }}>Memory not found.</h2>
        <button className="user-gradient-btn" onClick={() => navigate('/user/gallery')}>← Back to Gallery</button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '120px', background: '#0b1120', color: '#fff' }}>

      {/* SECTION 1 — HERO EVENT BANNER */}
      <div style={{ position: 'relative', height: '75vh', minHeight: '600px', overflow: 'hidden' }}>
        <img
          src={getImageUrl(item.imageUrl)}
          alt={item.title}
          onError={(e) => { e.target.onerror = null; e.target.src = FALLBACK; }}
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
        />
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(to top, #0b1120 0%, rgba(11,17,32,0.4) 60%, rgba(11,17,32,0.2) 100%)' 
        }}></div>

        {/* Floating Header Info */}
        <div style={{ position: 'absolute', top: '30px', left: '40px', right: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
          <button
            onClick={() => navigate('/user/gallery')}
            style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid rgba(0,255,255,0.3)', color: '#0df', borderRadius: '30px', padding: '10px 25px', cursor: 'pointer', fontSize: '14px', fontWeight: 600, backdropFilter: 'blur(10px)' }}
          >
            ← Back to Gallery
          </button>
          <div style={{ background: 'rgba(0,210,255,0.2)', border: '1px solid #0df', color: '#0df', padding: '8px 20px', borderRadius: '30px', fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>
            ● Completed Event
          </div>
        </div>

        <div style={{ position: 'absolute', bottom: '80px', left: '60px', right: '60px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginBottom: '25px' }}>
            <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '10px 20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ display: 'block', fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800 }}>Date</span>
              <span style={{ fontSize: '15px', fontWeight: 700 }}>{item.date}</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '10px 20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ display: 'block', fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800 }}>Location</span>
              <span style={{ fontSize: '15px', fontWeight: 700 }}>{item.location}</span>
            </div>
            <div style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', padding: '10px 20px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.1)' }}>
              <span style={{ display: 'block', fontSize: '10px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800 }}>Attendance</span>
              <span style={{ fontSize: '15px', fontWeight: 700 }}>{item.guestCount}</span>
            </div>
          </div>
          <h1 style={{ fontSize: '5rem', fontWeight: 900, color: '#fff', marginBottom: '10px', lineHeight: 1, letterSpacing: '-2px' }}>
            {item.title}
          </h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.25rem', maxWidth: '900px', lineHeight: 1.6 }}>{item.description}</p>
        </div>
      </div>

      <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '0 60px' }}>
        
        {/* SECTION 2 — EVENT INFO BOXES */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '-50px', position: 'relative', zIndex: 10 }}>
          {[
            { label: 'Event Name', value: item.title },
            { label: 'Category', value: item.eventType || 'Event' },
            { label: 'Organized By', value: item.organizedBy || 'Harmoni Events' },
            { label: 'Atmosphere', value: item.atmosphere || 'Professional' }
          ].map((box, i) => (
            <div key={i} className="user-glass-card" style={{ padding: '25px', borderRadius: '20px', textAlign: 'center' }}>
              <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800, marginBottom: '8px', letterSpacing: '1px' }}>{box.label}</span>
              <span style={{ fontSize: '16px', fontWeight: 700, color: '#0df' }}>{box.value}</span>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '60px', marginTop: '80px' }}>
          
          {/* Left Column */}
          <div>
            {/* SECTION 3 — DYNAMIC EVENT TIMELINE */}
            <div style={{ marginBottom: '80px' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <span style={{ color: '#0df' }}>⏱</span> Event Timeline
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '40px', position: 'relative', paddingLeft: '40px' }}>
                {/* Vertical Line */}
                <div style={{ position: 'absolute', left: '10px', top: '10px', bottom: '10px', width: '2px', background: 'linear-gradient(to bottom, #0df, transparent)' }}></div>
                
                {item.timeline && item.timeline.map((step, i) => (
                  <div key={i} style={{ position: 'relative' }}>
                    {/* Dot */}
                    <div style={{ position: 'absolute', left: '-36px', top: '5px', width: '14px', height: '14px', borderRadius: '50%', background: '#0df', border: '4px solid #0b1120', boxShadow: '0 0 15px #0df', zIndex: 5 }}></div>
                    
                    <div style={{ display: 'flex', gap: '30px' }}>
                      <span style={{ minWidth: '90px', color: '#0df', fontWeight: 800, fontSize: '1.1rem' }}>{step.time}</span>
                      <div>
                        <h4 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '8px', color: '#fff' }}>{step.activity}</h4>
                        <p style={{ color: '#94a3b8', lineHeight: 1.6, fontSize: '1.05rem' }}>{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 4 — EVENT GALLERY GRID */}
            <div style={{ marginBottom: '80px' }}>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '40px' }}>
                📸 Event <span style={{ color: '#0df' }}>Visuals</span>
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                {item.images && item.images.map((img, i) => (
                  <div key={i} style={{ height: '350px', borderRadius: '25px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 15px 40px rgba(0,0,0,0.5)' }}>
                    <img src={getImageUrl(img)} alt={`Event Pic ${i}`} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'} />
                  </div>
                ))}
                {(!item.images || item.images.length === 0) && (
                   <div style={{ gridColumn: 'span 2', height: '400px', borderRadius: '25px', overflow: 'hidden' }}>
                      <img src={getImageUrl(item.imageUrl)} alt="Fallback" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                   </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column (Sidebar) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            
            {/* SECTION 5 — EVENT HIGHLIGHTS */}
            <div className="user-glass-card" style={{ padding: '40px', borderRadius: '30px' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '25px', color: '#fff' }}>🏆 Key Highlights</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {item.highlights && item.highlights.map((h, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '15px', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <span style={{ color: '#0df', fontSize: '20px' }}>✦</span>
                    <span style={{ fontWeight: 600 }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION 6 — ORGANIZER NOTES */}
            <div className="user-glass-card" style={{ padding: '40px', borderRadius: '30px', background: 'linear-gradient(135deg, rgba(0,210,255,0.1), rgba(15,23,42,0.8))' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px' }}>📝 Organizer Notes</h3>
              <div style={{ color: '#cbd5e1', lineHeight: 1.8, fontStyle: 'italic', fontSize: '1.1rem' }}>
                "{item.organizerNotes || 'An exceptionally successful event with great feedback from all stakeholders. The atmosphere was perfectly aligned with the client vision.'}"
              </div>
              <div style={{ marginTop: '25px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#0df', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: '#000' }}>H</div>
                <div>
                   <span style={{ display: 'block', fontWeight: 700, fontSize: '14px' }}>{item.organizedBy || 'Harmoni Planner'}</span>
                   <span style={{ fontSize: '12px', color: '#94a3b8' }}>Lead Event Manager</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default GalleryHighlight;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

// 🚀 EVENT-SPECIFIC UNIQUE IMAGE POOLS
const CRICKET_POOLS = {
  'Night Cricket League Finals': [
    'https://images.unsplash.com/photo-1531415074968-036ba1b575da',
    'https://images.unsplash.com/photo-1540747913346-19212a4b74a5',
    'https://images.unsplash.com/photo-1508341595083-fcd34d8cc142',
    'https://images.unsplash.com/photo-1624880357913-a8539238245b'
  ],
  'City Cricket Championship': [
    'https://images.unsplash.com/photo-1531415074968-036ba1b575da?v=1',
    'https://images.unsplash.com/photo-1542393545-10f5cde2c810',
    'https://images.unsplash.com/photo-151271901372c-531498a6e27b',
    'https://images.unsplash.com/photo-1562077772-3bd90403f7f0'
  ],
  'Corporate T20 Cup': [
    'https://images.unsplash.com/photo-1540747913346-19212a4b74a5?v=2',
    'https://images.unsplash.com/photo-1593341646782-e0b495cff86d',
    'https://images.unsplash.com/photo-1508341595083-fcd34d8cc142?v=2',
    'https://images.unsplash.com/photo-1511578314322-379afb476865'
  ]
};

const CATEGORY_FALLBACKS = {
  Wedding: ['https://images.unsplash.com/photo-1519741497674-611481863552', 'https://images.unsplash.com/photo-1583939003579-730e3918a45a', 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622', 'https://images.unsplash.com/photo-1519225421980-715cb0215aed'],
  Festival: ['https://images.unsplash.com/photo-1605000797499-95a51c5269ae', 'https://images.unsplash.com/photo-1561414927-6d86591d0c4f', 'https://images.unsplash.com/photo-1514525253361-bee1a31f440a', 'https://images.unsplash.com/photo-1531058020387-3be344556be6'],
  Party: ['https://images.unsplash.com/photo-1533777857889-4be7c70b33f7', 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf', 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30', 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1']
};

const GalleryHighlight = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { API_BASE } = useAuth();
  const SERVER_URL = API_BASE.replace('/api', '');
  
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);

  const getEventSpecificPool = (title, category) => {
    if (CRICKET_POOLS[title]) return CRICKET_POOLS[title];
    if (category?.toLowerCase().includes('cricket')) return CRICKET_POOLS['Night Cricket League Finals'];
    const catKey = Object.keys(CATEGORY_FALLBACKS).find(c => category?.includes(c)) || 'Wedding';
    return CATEGORY_FALLBACKS[catKey];
  };

  const handleImageError = (e, title, category, index) => {
    e.target.onerror = null;
    const pool = getEventSpecificPool(title, category);
    e.target.src = (pool[index % pool.length] || pool[0]) + '?auto=format&fit=crop&w=800&q=80';
  };

  const getImageUrl = (imagePath, title, category, index = 0) => {
    if (!imagePath || imagePath.includes('placeholder')) {
      const pool = getEventSpecificPool(title, category);
      return (pool[index % pool.length] || pool[0]) + '?auto=format&fit=crop&w=1200&q=80';
    }
    if (imagePath.startsWith('http')) return imagePath;
    return `${SERVER_URL}${imagePath}`;
  };

  useEffect(() => {
    fetch(`${API_BASE}/gallery`)
      .then(res => res.json())
      .then(data => {
        let found = data.find(g => g._id === id);
        if (found) {
          setItem(found);
        } else {
          const title = id.replace(/-/g, ' ');
          const pool = getEventSpecificPool(title, 'Cricket');
          setItem({
            title: title || 'Cricket Event',
            eventType: 'Cricket',
            imageUrl: pool[0],
            organizedBy: 'Harmoni Team',
            atmosphere: 'High Energy',
            description: 'A magnificent experience captured in its full glory.',
            highlights: ['Great Energy', 'Seamless Planning', 'Perfect Execution'],
            timeline: [
              { time: '4:00 PM', activity: 'Fan Zone Kickoff', description: 'Initial fans gathering.', imageUrl: pool[0] },
              { time: '6:30 PM', activity: 'Match Start', description: 'Peak stadium action.', imageUrl: pool[1] },
              { time: '8:30 PM', activity: 'Innings Break', description: 'Halftime entertainment.', imageUrl: pool[2] },
              { time: '10:30 PM', activity: 'Trophy Ceremony', description: 'Celebration finale.', imageUrl: pool[3] }
            ]
          });
        }
      })
      .catch(() => navigate('/user/gallery'))
      .finally(() => setLoading(false));
  }, [id, API_BASE, navigate]);

  if (loading) return <div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>Loading Storyboard...</div>;

  return (
    <div style={{ minHeight: '100vh', background: '#060b18', color: '#fff', padding: '40px 60px', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => navigate('/user/gallery')} style={{ background: 'transparent', border: 'none', color: '#0df', cursor: 'pointer', fontSize: '14px', fontWeight: 600 }}>
          ← Back to Gallery
        </button>
      </div>

      <div style={{ maxWidth: '1500px', margin: '0 auto' }}>
        <div style={{ background: '#0f172a', borderRadius: '32px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '30px' }}>
          <div style={{ position: 'relative', height: '500px' }}>
            <img 
              src={getImageUrl(item.imageUrl, item.title, item.eventType, 0)} 
              alt={item.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              onError={(e) => handleImageError(e, item.title, item.eventType, 0)}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0f172a 0%, transparent 60%)' }}></div>
            <div style={{ position: 'absolute', bottom: '40px', left: '50px' }}>
               <h1 style={{ fontSize: '3.5rem', fontWeight: 900 }}>{item.title}</h1>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '30px' }}>
          
          {/* LEFT: Visual Storyboard */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            <div style={{ background: '#0f172a', padding: '35px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
               <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '25px' }}>📸 Event Visual Storyboard</h3>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                  {item.timeline && item.timeline.map((step, i) => (
                    <div key={i} style={{ position: 'relative', height: '280px', borderRadius: '24px', overflow: 'hidden' }}>
                      <img 
                        src={getImageUrl(step.imageUrl, item.title, item.eventType, i)} 
                        alt={step.activity} 
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                        onError={(e) => handleImageError(e, item.title, item.eventType, i)}
                      />
                      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', background: 'linear-gradient(to top, rgba(15,23,42,0.95), transparent)' }}>
                         <span style={{ fontSize: '11px', fontWeight: 800, color: '#0df' }}>{step.time}</span>
                         <h4 style={{ fontSize: '16px', fontWeight: 700 }}>{step.activity}</h4>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          {/* RIGHT: Timeline & Notes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Timeline Section RESTORED */}
            <div style={{ background: '#0f172a', padding: '40px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                 <span style={{ color: '#a855f7' }}>🕒</span> Detailed Journey
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', paddingLeft: '20px', position: 'relative' }}>
                 <div style={{ position: 'absolute', left: '4px', top: '5px', bottom: '5px', width: '2px', background: 'linear-gradient(to bottom, #a855f7, transparent)' }}></div>
                 {item.timeline && item.timeline.map((step, i) => (
                   <div key={i} style={{ position: 'relative' }}>
                      <div style={{ position: 'absolute', left: '-22px', top: '5px', width: '12px', height: '12px', borderRadius: '50%', background: '#a855f7', border: '3px solid #0f172a' }}></div>
                      <div style={{ display: 'flex', gap: '20px' }}>
                         <span style={{ minWidth: '80px', fontSize: '13px', fontWeight: 800, color: '#a855f7' }}>{step.time}</span>
                         <div>
                            <h4 style={{ fontSize: '15px', fontWeight: 800 }}>{step.activity}</h4>
                            <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '5px' }}>{step.description}</p>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
            </div>

            <div style={{ background: '#0f172a', padding: '40px', borderRadius: '32px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px' }}>📝 Organizer's Note</h3>
              <p style={{ fontSize: '14px', color: '#94a3b8', lineHeight: 1.7 }}>{item.organizerNotes || "A perfectly executed journey."}</p>
            </div>

            <div style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(15,23,42,0.4))', padding: '35px', borderRadius: '32px', border: '1px solid rgba(6,182,212,0.2)' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '20px' }}>✨ Event Highlights</h3>
              {item.highlights && item.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                  <span style={{ color: '#0df' }}>✦</span>
                  <span style={{ fontSize: '14px', fontWeight: 600 }}>{h}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryHighlight;

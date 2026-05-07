import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';

// 🚀 SEMANTIC CONTENT GENERATOR BY CATEGORY
const getEventContext = (category, title) => {
  const context = {
    Cricket: {
      whatHappen: 'A high-intensity match featuring top-tier players, live commentary, and multiple innings of thrilling action. The stadium will be buzzing with live fan interaction zones and match rituals.',
      whySpecial: 'Experience the electric atmosphere of a live stadium match, the roar of the crowd, and the prestigious trophy ceremony that concludes the championship.',
      highlights: ['Live Stadium Match', 'Fan Interaction Zones', 'Trophy Ceremony', 'Professional Commentary']
    },
    Concert: {
      whatHappen: 'An immersive musical journey with state-of-the-art sound systems, explosive light shows, and back-to-back performances by world-class DJs and singers.',
      whySpecial: 'Unmatched energy, massive stage productions, and an environment designed to celebrate the spirit of music and rhythm.',
      highlights: ['Stage Light Show', 'World-Class DJ Set', 'High-Fidelity Sound', 'Live Crowd Energy']
    },
    Corporate: {
      whatHappen: 'A strategic gathering focused on innovation, featuring insightful keynote sessions, startup pitch showcases, and structured networking modules.',
      whySpecial: 'Connect with industry leaders, gain exclusive market insights, and participate in high-level business discussions in a premium setting.',
      highlights: ['Keynote Sessions', 'Investor Networking', 'Startup Pitches', 'Strategic Insights']
    },
    Wedding: {
      whatHappen: 'A grand celebration of love and tradition, featuring beautiful rituals, elegant reception decor, and a magnificent multi-cuisine dinner experience.',
      whySpecial: 'A perfectly curated blend of royal heritage, emotional ceremonies, and premium hospitality that makes every moment unforgettable.',
      highlights: ['Traditional Rituals', 'Royal Reception', 'Gourmet Dining', 'Elegant Decor']
    },
    Festival: {
      whatHappen: 'A vibrant celebration of culture with non-stop Garba rounds, Dandiya fusion performances, and authentic traditional food stalls.',
      whySpecial: 'Immerse yourself in the rich colors and energy of the festive season, celebrating tradition with community spirit.',
      highlights: ['Garba & Dandiya', 'Cultural Stalls', 'Traditional Attire', 'Community Festive Vibes']
    },
    Party: {
      whatHappen: 'A high-energy social event with live music, thematic neon decor, and a curated selection of food and drinks to keep the vibes going all night.',
      whySpecial: 'The perfect mix of social networking, celebration, and fun in a premium, high-energy environment.',
      highlights: ['Live Music', 'Neon Theme', 'Social Mixers', 'Premium Catering']
    }
  };
  return context[category] || context['Corporate'];
};

const EVENT_UNIQUE_IMAGES = {
  'IPL Fan Fest': 'https://images.unsplash.com/photo-1540747913346-19212a4b74a5',
  'City Cricket League': 'https://images.unsplash.com/photo-1531415074968-036ba1b575da',
  'Night Cricket Tournament': 'https://images.unsplash.com/photo-1508341595083-fcd34d8cc142',
  'Corporate Cricket Cup': 'https://images.unsplash.com/photo-1542393545-10f5cde2c810'
};

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { API_BASE } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const SERVER_URL = API_BASE.replace('/api', '');

  useEffect(() => {
    fetch(`${API_BASE}/events/${id}`)
      .then(res => res.json())
      .then(data => { setEvent(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id, API_BASE]);

  if (loading) return <div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>Loading Event...</div>;
  if (!event) return <div style={{ color: '#ef4444', textAlign: 'center', padding: '100px' }}>Event Not Found</div>;

  const context = getEventContext(event.category, event.title);

  return (
    <div style={{ minHeight: '100vh', padding: '60px 20px', maxWidth: '1200px', margin: '0 auto', background: '#0b1120', color: '#fff', fontFamily: "'Inter', sans-serif" }}>
      <button onClick={() => navigate('/user/events')} style={{ background: 'transparent', border: '1px solid #0df', color: '#0df', padding: '10px 25px', borderRadius: '30px', cursor: 'pointer', marginBottom: '40px', fontWeight: 600 }}>← Back to Events</button>
      
      {/* 🖼️ MAIN BANNER */}
      <div style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', height: '550px', marginBottom: '50px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
        <img 
           src={EVENT_UNIQUE_IMAGES[event.title] || (event.image?.startsWith('http') ? event.image : `${SERVER_URL}${event.image}`)} 
           alt={event.title} 
           style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0b1120 0%, transparent 60%)' }}></div>
        <div style={{ position: 'absolute', bottom: '50px', left: '50px' }}>
          <span style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#0df', padding: '8px 20px', borderRadius: '30px', fontSize: '13px', fontWeight: 800, border: '1px solid rgba(0,255,255,0.2)', backdropFilter: 'blur(10px)' }}>{event.category}</span>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 900, marginTop: '15px', letterSpacing: '-2px' }}>{event.title}</h1>
          <div style={{ display: 'flex', gap: '30px', marginTop: '20px', color: '#94a3b8' }}>
             <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>📍 {event.location}</span>
             <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>🗓️ {event.date}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '40px' }}>
        
        {/* 📝 LEFT CONTENT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '50px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ color: '#0df', fontSize: '1.8rem', marginBottom: '25px', fontWeight: 800 }}>Event Overview</h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.9, fontSize: '16px' }}>{event.description || `Join us for an unforgettable experience at the ${event.title} in ${event.location}. This event is curated to provide the highest level of engagement and professional management.`}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
             <div style={{ background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h4 style={{ color: '#a855f7', fontSize: '1.2rem', marginBottom: '15px', fontWeight: 800 }}>What will happen?</h4>
                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.7 }}>{context.whatHappen}</p>
             </div>
             <div style={{ background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h4 style={{ color: '#ec4899', fontSize: '1.2rem', marginBottom: '15px', fontWeight: 800 }}>Why is it special?</h4>
                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.7 }}>{context.whySpecial}</p>
             </div>
          </div>

        </div>

        {/* ⚡ RIGHT SIDEBAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          <div style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(15,23,42,0.4))', padding: '40px', borderRadius: '40px', border: '1px solid rgba(0,255,255,0.1)' }}>
             <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '25px', color: '#fff' }}>✨ Key Highlights</h3>
             {context.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                   <div style={{ width: '8px', height: '8px', background: '#0df', borderRadius: '50%' }}></div>
                   <span style={{ fontSize: '15px', fontWeight: 600, color: '#f1f5f9' }}>{h}</span>
                </div>
             ))}
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
             <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 800 }}>ENTRY PASS PRICE</span>
             <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0df', marginTop: '10px' }}>₹{event.price || 'Free'}</h2>
             <button style={{ width: '100%', marginTop: '30px', background: '#0df', color: '#000', border: 'none', padding: '15px', borderRadius: '20px', fontWeight: 800, cursor: 'pointer' }}>Book Now</button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default EventDetails;

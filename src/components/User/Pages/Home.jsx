import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await fetch('http://localhost:5001/api/events');
      if (res.ok) {
        const data = await res.json();
        setEvents(data.slice(0, 3)); // Show top 3 on dashboard
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/600x400?text=Event+Image';
    if (imagePath.startsWith('http')) return imagePath;
    return `http://localhost:5001${imagePath}`;
  };

  return (
    <div style={{ color: '#fff' }}>
      {/* Hero Section */}
      <section style={{ height: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(to bottom, rgba(11, 17, 32, 0.6), #0b1120), url("https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1600&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', padding: '0 20px' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 800, marginBottom: '20px', letterSpacing: '-2px' }}>
            {t('home_page.hero_title_1')}<span style={{ color: '#0df' }}>{t('home_page.hero_title_highlight')}</span>{t('home_page.hero_title_2')}
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#94a3b8', marginBottom: '40px', lineHeight: '1.6' }}>{t('home_page.hero_subtitle')}</p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
            <button className="user-gradient-btn" onClick={() => navigate('/user/events')} style={{ padding: '15px 40px', fontSize: '1.1rem' }}>{t('home_page.explore_btn')}</button>
            <button style={{ padding: '15px 40px', fontSize: '1.1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#fff', borderRadius: '30px', cursor: 'pointer' }}>{t('home_page.story_btn')}</button>
          </div>
        </div>
      </section>

      {/* Featured Events */}
      <section style={{ padding: '100px 50px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px' }}>
          <div>
            <h2 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '10px' }}>
              {t('home_page.highlights_title')}<span style={{ color: '#0df' }}>{t('home_page.highlights_highlight')}</span>
            </h2>
            <p style={{ color: '#64748b' }}>{t('home_page.highlights_subtitle')}</p>
          </div>
          <button onClick={() => navigate('/user/events')} style={{ color: '#0df', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600, fontSize: '1.1rem' }}>{t('common.view_all')}</button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px', color: '#94a3b8' }}>{t('home_page.loading_highlights')}</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '30px' }}>
            {events.map(event => (
              <div key={event._id} className="user-glass-card" style={{ overflow: 'hidden', transition: 'transform 0.3s' }}>
                <img src={getImageUrl(event.image)} alt={event.title} style={{ width: '100%', height: '240px', objectFit: 'cover' }} />
                <div style={{ padding: '25px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <span style={{ color: '#0df', fontSize: '14px', fontWeight: 700 }}>{event.category}</span>
                    <span style={{ color: '#64748b', fontSize: '14px' }}>{event.date}</span>
                  </div>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '15px' }}>{event.title}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ background: 'rgba(59, 130, 246, 0.15)', border: '1px solid rgba(59, 130, 246, 0.4)', color: '#93c5fd', padding: '4px 10px', borderRadius: '12px', fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px', display: 'flex', alignItems: 'center', gap: '4px' }}>⭐ {t('event_card.limited_seats')}</span>
                    <button className="user-gradient-btn" onClick={() => navigate(`/user/event/${event._id}`)} style={{ padding: '8px 20px', borderRadius: '10px', fontSize: '14px' }}>{t('event_card.view_details')}</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Stats Section */}
      <section style={{ padding: '100px 50px', background: 'rgba(255,255,255,0.02)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '40px', textAlign: 'center' }}>
          {[
            { label: t('home_page.stats.total_events'), val: '500+' },
            { label: t('home_page.stats.happy_customers'), val: '50k+' },
            { label: t('home_page.stats.cities_covered'), val: '25+' },
            { label: t('home_page.stats.global_artists'), val: '100+' },
          ].map(stat => (
            <div key={stat.label}>
              <h4 style={{ fontSize: '3rem', fontWeight: 800, marginBottom: '5px', color: '#0df' }}>{stat.val}</h4>
              <p style={{ color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '12px' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

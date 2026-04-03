import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../Common/SearchBar';

const Events = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const res = await fetch('https://event-management-system-5wx4.onrender.com/api/events');
            if (res.ok) {
                const data = await res.json();
                setEvents(data);
            }
        } catch (error) {
            console.error('Failed to fetch events:', error);
        } finally {
            setLoading(false);
        }
    };

    const categories = ['All', 'Cricket', 'Concert', 'Festival', 'Cultural', 'Party'];

    const filteredEvents = events.filter(event => {
        const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              event.location.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div style={{ padding: '60px 40px', minHeight: '100vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: 800, color: '#fff', marginBottom: '15px' }}>Upcoming <span style={{ color: '#0df' }}>Events</span></h1>
                <p style={{ color: '#94a3b8', fontSize: '1.1rem', marginBottom: '40px' }}>Secure your tickets for the most anticipated events across the country</p>
                
                {/* ADVANCED SEARCH SYSTEM */}
                <SearchBar 
                    value={searchQuery} 
                    onChange={setSearchQuery} 
                    placeholder="Search by title, team, or venue..." 
                />
            </div>

            {/* Category Filter */}
            <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '50px' }}>
                {categories.map(cat => (
                    <button
                        key={cat}
                        onClick={() => setSelectedCategory(cat)}
                        style={{
                            padding: '10px 25px', borderRadius: '30px', cursor: 'pointer',
                            fontSize: '14px', fontWeight: 600, transition: 'all 0.3s',
                            background: selectedCategory === cat ? 'linear-gradient(135deg, #06b6d4, #3b82f6)' : 'rgba(255,255,255,0.05)',
                            border: `1px solid ${selectedCategory === cat ? '#0df' : 'rgba(255,255,255,0.1)'}`,
                            color: '#fff',
                            boxShadow: selectedCategory === cat ? '0 10px 20px rgba(6, 182, 212, 0.3)' : 'none'
                        }}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {loading ? (
                <div style={{ textAlign: 'center', padding: '100px', color: '#94a3b8' }}>Discovering events...</div>
            ) : (
                <>
                    {filteredEvents.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '100px 20px' }} className="user-glass-card">
                            <h2 style={{ color: '#fff', marginBottom: '10px' }}>No Events Found</h2>
                            <p style={{ color: '#64748b' }}>We couldn't find any events matching "{searchQuery}" in {selectedCategory}.</p>
                            <button 
                                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                                style={{ marginTop: '20px', background: 'none', border: '1px solid #0df', color: '#0df', padding: '10px 20px', borderRadius: '10px', cursor: 'pointer' }}
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '40px', maxWidth: '1400px', margin: '0 auto' }}>
                            {filteredEvents.map((event) => (
                                <div key={event._id} className="user-glass-card" style={{ overflow: 'hidden', transition: 'transform 0.3s' }}>
                                    <div style={{ position: 'relative' }}>
                                        <img 
                                    src={event.image || 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&w=800&q=80'} 
                                    alt={event.title} 
                                    style={{ width: '100%', height: '220px', objectFit: 'cover' }} 
                                    onError={(e) => {
                                        e.target.onerror = null; 
                                        e.target.src = 'https://images.unsplash.com/photo-1459749411177-042180ce673c?auto=format&fit=crop&w=800&q=80';
                                    }}
                                />
                                        <span style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)', color: '#0df', padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700, border: '1px solid rgba(0,255,255,0.3)' }}>
                                            {event.category}
                                        </span>
                                    </div>
                                    <div style={{ padding: '25px' }}>
                                        <h3 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 700, marginBottom: '10px' }}>{event.title}</h3>
                                        <div style={{ marginBottom: '20px', fontSize: '14px', color: '#94a3b8' }}>
                                            <p style={{ marginBottom: '5px' }}>📍 {event.location}</p>
                                            <p>📅 {event.date}</p>
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px' }}>
                                            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0df' }}>₹{event.price.toLocaleString()}</span>
                                            <button className="user-gradient-btn" onClick={() => navigate(`/user/event/${event._id}`)} style={{ padding: '9px 22px', borderRadius: '10px', fontSize: '14px', fontWeight: 600 }}>Book Tickets</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default Events;

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = useAuth();
  const { showToast } = useToast();
  
  const [event, setEvent] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const res = await fetch(`http://localhost:5001/api/events/${id}`);
      if (res.ok) {
        const data = await res.json();
        setEvent(data);
      }
    } catch (error) {
      console.error('Failed to fetch event:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!paymentMethod) {
      showToast('Please select a payment method', 'error');
      return;
    }
    
    setBookingLoading(true);

    try {
      const res = await fetch('http://localhost:5001/api/bookings', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          eventId: event._id,
          title: event.title,
          price: event.price,
          location: event.location,
          date: event.date,
          time: event.time,
          image: event.image
        })
      });

      if (res.ok) {
        showToast('Booking successful!', 'success');
        navigate('/user/mybooking');
      } else {
        const error = await res.json();
        showToast(error.message || 'Booking failed', 'error');
      }
    } catch (error) {
      showToast('Server error during booking', 'error');
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) return <div style={{ padding: '100px', textAlign: 'center', color: '#fff' }}>Loading event details...</div>;
  if (!event) return <div style={{ padding: '100px', textAlign: 'center', color: '#ef4444' }}>Event not found.</div>;

  return (
    <div style={{ minHeight: '100vh', padding: '60px 50px', maxWidth: '1000px', margin: '0 auto' }}>
      <button
        onClick={() => navigate('/user/events')}
        style={{ background: 'none', border: '1px solid rgba(0,255,255,0.3)', color: '#0df', borderRadius: '20px', padding: '8px 20px', cursor: 'pointer', marginBottom: '30px', fontSize: '14px' }}
      >
        ← Back to Events
      </button>

      <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', marginBottom: '40px', border: '1px solid rgba(0,255,255,0.2)' }}>
        <img src={event.image} alt={event.title} style={{ width: '100%', height: '400px', objectFit: 'cover', display: 'block' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(11, 17, 32, 0.95), transparent)' }}></div>
        <div style={{ position: 'absolute', bottom: '30px', left: '30px' }}>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>{event.title}</h1>
          <span style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', color: '#fff', padding: '6px 16px', borderRadius: '20px', fontSize: '13px', fontWeight: 600 }}>
            ₹{event.price.toLocaleString()} / ticket
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 370px', gap: '30px' }}>
        <div>
          <div className="user-glass-card" style={{ padding: '30px', marginBottom: '25px' }}>
            <h3 style={{ color: '#0df', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>Event Details</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: '📅', label: 'Date', value: event.date },
                { icon: '🕒', label: 'Time', value: event.time || '7:00 PM' },
                { icon: '📍', label: 'Location', value: event.location },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <span style={{ fontSize: '20px' }}>{item.icon}</span>
                  <div>
                    <p style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px' }}>{item.label}</p>
                    <p style={{ color: '#fff', fontWeight: 600 }}>{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="user-glass-card" style={{ padding: '30px' }}>
            <h3 style={{ color: '#0df', marginBottom: '15px' }}>About This Event</h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.8 }}>This is a premier {event.category} event happening in {event.location}. Experience the best of {event.title} with fellow enthusiasts.</p>
          </div>
        </div>

        <div>
          <div className="user-glass-card" style={{ padding: '30px', position: 'sticky', top: '100px' }}>
            <h3 style={{ color: '#fff', marginBottom: '5px', fontSize: '1.4rem' }}>Book Your Ticket</h3>
            <p style={{ color: '#64748b', marginBottom: '25px', fontSize: '13px' }}>Select payment method & confirm</p>
            <div style={{ marginBottom: '25px' }}>
              <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Payment Method</p>
              {[
                { id: 'UPI', label: '📲 UPI Payment' },
                { id: 'Card', label: '💳 Debit / Credit Card' },
                { id: 'NetBanking', label: '🏦 Net Banking' },
              ].map(method => (
                <label key={method.id} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  padding: '12px 16px', marginBottom: '10px', cursor: 'pointer',
                  borderRadius: '10px',
                  border: `1px solid ${paymentMethod === method.id ? '#0df' : 'rgba(255,255,255,0.1)'}`,
                  background: paymentMethod === method.id ? 'rgba(0,255,255,0.05)' : 'transparent',
                  transition: 'all 0.2s'
                }}>
                  <input type="radio" name="payment" value={method.id} checked={paymentMethod === method.id} onChange={() => setPaymentMethod(method.id)} style={{ accentColor: '#0df' }} />
                  <span style={{ color: '#fff', fontSize: '14px' }}>{method.label}</span>
                </label>
              ))}
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '20px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ color: '#94a3b8' }}>Ticket Price</span>
                <span style={{ color: '#fff' }}>₹{event.price.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#94a3b8' }}>Platform Fee</span>
                <span style={{ color: '#0df' }}>Free (Demo)</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '15px', fontSize: '1.2rem', fontWeight: 700 }}>
                <span style={{ color: '#fff' }}>Total</span>
                <span style={{ color: '#0df' }}>₹{event.price.toLocaleString()}</span>
              </div>
            </div>
            <button className="user-gradient-btn" disabled={bookingLoading} style={{ width: '100%', padding: '14px', fontSize: '16px', fontWeight: 700, borderRadius: '10px' }} onClick={handleBooking}>
              {bookingLoading ? 'Processing...' : '🎟 Confirm & Pay'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import { QRCodeSVG } from 'qrcode.react';

const MyBookings = () => {
  const { token, user } = useAuth();
  const { showToast } = useToast();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = 'https://event-management-system-5wx4.onrender.com/api';

  useEffect(() => {
    if (token) fetchBookings();
  }, [token]);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API_BASE}/bookings/user`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setBookings(data);
      }
    } catch (error) {
      showToast('Failed to fetch bookings', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to cancel this booking?')) return;
    
    try {
      const res = await fetch(`${API_BASE}/bookings/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setBookings(bookings.filter(b => b._id !== id));
        showToast('Booking cancelled successfully', 'success');
      } else {
        const data = await res.json();
        showToast(data.message || 'Cancellation failed', 'error');
      }
    } catch (error) {
      showToast('Server error during cancellation', 'error');
    }
  };

  if (loading) {
    return <div style={{ padding: '100px', textAlign: 'center', color: '#fff' }}>Loading your bookings...</div>;
  }

  return (
    <div style={{ padding: '60px 50px', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>My Bookings</h2>
        <p style={{ color: '#94a3b8' }}>Your digital ticket wallet powered by MongoDB Atlas</p>
        <div style={{ height: '4px', width: '60px', background: 'linear-gradient(to right, #06b6d4, #3b82f6)', margin: '15px auto 0', borderRadius: '2px' }}></div>
      </div>

      {bookings.length === 0 ? (
        <div className="user-glass-card" style={{ padding: '60px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ fontSize: '1.2rem', color: '#64748b', marginBottom: '20px' }}>You haven't booked any events yet.</p>
          <button className="user-gradient-btn" onClick={() => window.location.href='/user/events'}>Explore Events</button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(380px, 1fr))', gap: '30px', maxWidth: '1200px', margin: '0 auto' }}>
          {bookings.map((booking) => (
            <div key={booking._id} className="user-glass-card" style={{ padding: '25px', display: 'flex', gap: '20px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ flexShrink: 0, width: '120px', height: '120px', background: '#fff', padding: '10px', borderRadius: '12px' }}>
                <QRCodeSVG value={JSON.stringify({ id: booking.ticketId, user: user.email })} size={100} level="H" />
              </div>

              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ color: '#fff', fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px' }}>{booking.eventId?.title || 'Event Removed'}</h3>
                  <span style={{ fontSize: '10px', color: '#64748b', fontWeight: 700 }}>{booking.ticketId}</span>
                </div>
                <p style={{ color: '#0df', fontSize: '12px', fontWeight: 600, marginBottom: '12px' }}>💰 ₹{booking.eventId?.price?.toLocaleString() || '0'}</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: '#94a3b8' }}>
                  <span>📍 {booking.eventId?.location || 'Unknown'}</span>
                  <span>📅 {booking.eventId?.date || 'N/A'}</span>
                  <span style={{ marginTop: '5px', color: '#475569' }}>Booked on: {booking.bookingDate}</span>
                </div>
              </div>

              <button 
                onClick={() => handleDelete(booking._id)}
                style={{ 
                  position: 'absolute', bottom: '20px', right: '20px', 
                  background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', 
                  color: '#f87171', padding: '6px 12px', borderRadius: '6px', fontSize: '11px', cursor: 'pointer' 
                }}
              >
                Cancel
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;

import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const EventPost = () => {
  const { events, fetchEvents, categories, token, API_BASE } = useOutletContext();
  const [formData, setFormData] = useState({
    title: '', date: '', time: '', price: '',
    category: '', location: '', description: ''
  });
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...formData,
          image: imageUrl || 'https://via.placeholder.com/600x400?text=Event+Image',
          price: parseFloat(formData.price) || 0
        })
      });

      if (res.ok) {
        alert('Event posted successfully!');
        setFormData({ title: '', date: '', time: '', price: '', category: '', location: '', description: '' });
        setImageUrl('');
        fetchEvents(); // Refresh events list from DB
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to post event');
      }
    } catch (e) {
      alert('Server error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    setDeleteLoading(id);
    try {
      const res = await fetch(`${API_BASE}/events/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchEvents();
      } else {
        alert('Failed to delete event');
      }
    } catch (e) {
      alert('Server error');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="glass-panel" style={{ padding: '25px', maxWidth: '800px', margin: '0 auto 30px' }}>
        <div className="page-header">
          <h3>Post New Event</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-full">
            <label className="glass-label">Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="glass-input"
            />
          </div>
          
          <div className="form-full">
            <label className="glass-label">Event Title</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="glass-input" required />
          </div>
          
          <div>
            <label className="glass-label">Date</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} className="glass-input" required />
          </div>

          <div>
            <label className="glass-label">Price (₹)</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="glass-input" />
          </div>

          <div>
            <label className="glass-label">Time</label>
            <input type="time" name="time" value={formData.time} onChange={handleChange} className="glass-input" />
          </div>

          <div>
            <label className="glass-label">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="glass-input" style={{ appearance: 'none' }} required>
              <option value="">Select Category</option>
              {categories.map(c => <option key={c._id} style={{color:'#000'}} value={c.name}>{c.name}</option>)}
            </select>
          </div>

          <div className="form-full">
            <label className="glass-label">Location</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className="glass-input" required />
          </div>

          <div className="form-full">
            <label className="glass-label">Description</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="glass-input glass-textarea" required></textarea>
          </div>

          <div className="form-full">
            <button type="submit" className="gradient-btn" style={{ width: '100%' }} disabled={loading}>
              {loading ? 'Posting...' : 'Post Event'}
            </button>
          </div>
        </form>
      </div>

      {/* Events List */}
      <div className="glass-panel" style={{ padding: '25px' }}>
        <div className="page-header"><h3>All Events ({events.length})</h3></div>
        <div className="glass-table-container">
          <table className="glass-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event._id}>
                  <td>{index + 1}</td>
                  <td><img src={event.image} alt={event.title} style={{width: '60px', height: '40px', borderRadius: '6px', objectFit: 'cover'}} /></td>
                  <td>{event.title}</td>
                  <td>{event.category}</td>
                  <td>{event.date}</td>
                  <td>{event.location}</td>
                  <td>
                    <button
                      className="gradient-btn gradient-btn-danger"
                      onClick={() => handleDelete(event._id)}
                      disabled={deleteLoading === event._id}
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      {deleteLoading === event._id ? '...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>No events found. Post one above!</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventPost;

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useOutletContext, useNavigate } from 'react-router-dom';

const EventPost = () => {
  const { t } = useTranslation();
  const { events, fetchEvents, categories, token, API_BASE } = useOutletContext();
  const SERVER_URL = API_BASE.replace('/api', '');
  const [formData, setFormData] = useState({
    title: '', date: '', time: '', price: '',
    category: '', location: '', description: ''
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/600x400?text=Event+Image';
    if (imagePath.startsWith('http')) return imagePath;
    return `${SERVER_URL}${imagePath}`;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });
      if (image) {
        formDataToSend.append('image', image);
      }

      const res = await fetch(`${API_BASE}/events`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      if (res.ok) {
        alert(t('event_post.alerts.success'));
        setFormData({ title: '', date: '', time: '', price: '', category: '', location: '', description: '' });
        setImage(null);
        setPreview(null);
        fetchEvents(); // Refresh events list from DB
      } else {
        const err = await res.json();
        alert(err.message || t('event_post.alerts.fail'));
      }
    } catch (e) {
      alert(t('event_post.alerts.server_error'));
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(t('event_post.actions.confirm_delete'))) return;
    setDeleteLoading(id);
    try {
      const res = await fetch(`${API_BASE}/events/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchEvents();
      } else {
        alert(t('event_post.alerts.delete_fail'));
      }
    } catch (e) {
      alert(t('event_post.alerts.server_error'));
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
          <h3>{t('event_post.title')}</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="form-grid">
          <div className="form-full">
            <label className="glass-label">{t('event_post.form.image')}</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="glass-input"
            />
            {preview && (
              <div style={{ marginTop: '10px' }}>
                <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '200px', borderRadius: '10px', objectFit: 'cover' }} />
              </div>
            )}
          </div>
          
          <div className="form-full">
            <label className="glass-label">{t('event_post.form.title')}</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} className="glass-input" required />
          </div>
          
          <div>
            <label className="glass-label">{t('event_post.form.date')}</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} className="glass-input" required />
          </div>

          <div>
            <label className="glass-label">{t('event_post.form.price')}</label>
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="glass-input" />
          </div>

          <div>
            <label className="glass-label">{t('event_post.form.time')}</label>
            <input type="time" name="time" value={formData.time} onChange={handleChange} className="glass-input" />
          </div>

          <div>
            <label className="glass-label">{t('event_post.form.category')}</label>
            <select name="category" value={formData.category} onChange={handleChange} className="glass-input" style={{ appearance: 'none' }} required>
              <option value="">{t('event_post.form.select_category')}</option>
              {categories.map(c => <option key={c._id} style={{color:'#000'}} value={c.name}>{c.name}</option>)}
            </select>
          </div>

          <div className="form-full">
            <label className="glass-label">{t('event_post.form.location')}</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} className="glass-input" required />
          </div>

          <div className="form-full">
            <label className="glass-label">{t('event_post.form.description')}</label>
            <textarea name="description" value={formData.description} onChange={handleChange} className="glass-input glass-textarea" required></textarea>
          </div>

          <div className="form-full">
            <button type="submit" className="gradient-btn" style={{ width: '100%' }} disabled={loading}>
              {loading ? t('event_post.form.posting') : t('event_post.form.post_btn')}
            </button>
          </div>
        </form>
      </div>

      {/* Events List */}
      <div className="glass-panel" style={{ padding: '25px' }}>
        <div className="page-header"><h3>{t('event_post.all_events')} ({events.length})</h3></div>
        <div className="glass-table-container">
          <table className="glass-table">
            <thead>
              <tr>
                <th>{t('event_post.table.no')}</th>
                <th>{t('event_post.table.image')}</th>
                <th>{t('event_post.table.title')}</th>
                <th>{t('event_post.table.category')}</th>
                <th>{t('event_post.table.date')}</th>
                <th>{t('event_post.table.location')}</th>
                <th>{t('event_post.table.status')}</th>
                <th>{t('event_post.table.action')}</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => (
                <tr key={event._id}>
                  <td>{index + 1}</td>
                  <td><img src={getImageUrl(event.image)} alt={event.title} style={{width: '60px', height: '40px', borderRadius: '6px', objectFit: 'cover'}} /></td>
                  <td>{event.title}</td>
                  <td>{event.category}</td>
                  <td>{event.date}</td>
                  <td>{event.location}</td>
                  <td>
                    <span className={`status-badge status-${event.status || 'approved'}`}>
                      {event.status ? t(`pending_events.status.${event.status}`) : t('pending_events.status.approved')}
                    </span>
                  </td>
                  <td>
                    <button
                      className="gradient-btn gradient-btn-danger"
                      onClick={() => handleDelete(event._id)}
                      disabled={deleteLoading === event._id}
                      style={{ padding: '6px 12px', fontSize: '12px' }}
                    >
                      {deleteLoading === event._id ? '...' : t('event_post.actions.delete')}
                    </button>
                  </td>
                </tr>
              ))}
              {events.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>{t('event_post.no_events')}</td>
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

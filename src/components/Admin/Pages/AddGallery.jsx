import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const AddGallery = () => {
  const { gallery, fetchGallery, token, API_BASE } = useOutletContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!title || !imageUrl || !description) {
      alert('Please fill in all fields including image URL.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/gallery`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, description, imageUrl })
      });

      if (res.ok) {
        setTitle('');
        setDescription('');
        setImageUrl('');
        fetchGallery();
        alert('Image added to gallery!');
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to add image');
      }
    } catch (e) {
      alert('Server error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Remove this image?')) return;
    try {
      const res = await fetch(`${API_BASE}/gallery/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchGallery();
      } else {
        alert('Failed to delete image');
      }
    } catch (e) {
      alert('Server error');
    }
  };

  return (
    <div className="glass-panel" style={{ padding: '25px' }}>
      <div className="page-header">
        <h3>Add to Gallery</h3>
      </div>

      <form onSubmit={handleAdd} className="form-grid" style={{ marginBottom: '30px', maxWidth: '700px' }}>
        <div className="form-full">
          <label className="glass-label">Image URL</label>
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="glass-input"
            required
          />
        </div>
        <div>
          <label className="glass-label">Image Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="glass-input" required />
        </div>
        <div>
          <label className="glass-label">Description</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="glass-input" required />
        </div>
        <div className="form-full">
          <button type="submit" className="gradient-btn" disabled={loading}>
            {loading ? 'Uploading...' : 'Add to Gallery'}
          </button>
        </div>
      </form>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '30px 0' }} />

      <h4>Gallery Images ({gallery.length})</h4>
      <div className="gallery-grid">
        {gallery.map(item => (
          <div key={item._id} className="gallery-item" style={{ position: 'relative' }}>
            <img src={item.imageUrl} alt={item.title} />
            <div className="gallery-item-name">{item.title}</div>
            <button
              onClick={() => handleDelete(item._id)}
              style={{
                position: 'absolute', top: '6px', right: '6px',
                background: 'rgba(239,68,68,0.8)', border: 'none', color: '#fff',
                borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer',
                fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
            >✕</button>
          </div>
        ))}
        {gallery.length === 0 && <p style={{color: '#cbd5e1'}}>No images uploaded yet.</p>}
      </div>
    </div>
  );
};

export default AddGallery;

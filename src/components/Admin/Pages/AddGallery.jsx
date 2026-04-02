import React, { useState } from 'react';

import { useOutletContext } from 'react-router-dom';

const AddGallery = () => {
  const { gallery, setGallery } = useOutletContext();
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name || !imageFile) {
        alert("Please provide both name and image.");
        return;
    }
    const newItem = {
      id: Date.now(),
      image: URL.createObjectURL(imageFile),
      name
    };
    setGallery([...gallery, newItem]);
    setName('');
    setImageFile(null);
  };

  return (
    <div className="glass-panel" style={{ padding: '25px' }}>
      <div className="page-header">
        <h3>Add to Gallery</h3>
      </div>

      <form onSubmit={handleAdd} className="form-grid" style={{ marginBottom: '30px', maxWidth: '600px' }}>
        <div>
          <label className="glass-label">Upload Image</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="glass-input" required />
        </div>
        <div>
          <label className="glass-label">Image Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="glass-input" required />
        </div>
        <div className="form-full">
          <button type="submit" className="gradient-btn">Upload to Gallery</button>
        </div>
      </form>

      <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '30px 0' }} />

      <h4>Uploaded Images</h4>
      <div className="gallery-grid">
        {gallery.map(item => (
          <div key={item.id} className="gallery-item">
            <img src={item.image} alt={item.name} />
            <div className="gallery-item-name">{item.name}</div>
          </div>
        ))}
        {gallery.length === 0 && <p style={{color: '#cbd5e1'}}>No images uploaded yet.</p>}
      </div>
    </div>
  );
};

export default AddGallery;

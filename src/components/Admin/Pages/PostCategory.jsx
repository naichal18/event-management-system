import React, { useState } from 'react';

import { useOutletContext } from 'react-router-dom';

const PostCategory = () => {
  const { categories, setCategories } = useOutletContext();
  const [name, setName] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!name) return;
    const newCat = {
      id: Date.now(),
      image: imageFile ? URL.createObjectURL(imageFile) : 'https://via.placeholder.com/100?text=No+Img',
      name
    };
    setCategories([...categories, newCat]);
    setName('');
    setImageFile(null);
  };

  const handleDelete = (id) => {
    setCategories(categories.filter(c => c.id !== id));
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
      <div className="glass-panel" style={{ padding: '25px', height: 'max-content' }}>
        <div className="page-header">
          <h3>Add Category</h3>
        </div>
        <form onSubmit={handleAdd}>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label className="glass-label">Category Image</label>
            <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} className="glass-input" />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="glass-label">Category Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="glass-input" required />
          </div>
          <button type="submit" className="gradient-btn" style={{ width: '100%' }}>Add</button>
        </form>
      </div>

      <div className="glass-panel" style={{ padding: '25px' }}>
        <div className="page-header">
          <h3>Category List</h3>
        </div>
        <div className="glass-table-container">
          <table className="glass-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Image</th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, idx) => (
                <tr key={cat.id}>
                  <td>{idx + 1}</td>
                  <td><img src={cat.image} alt={cat.name} style={{width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover'}} /></td>
                  <td>{cat.name}</td>
                  <td>
                    <button className="gradient-btn gradient-btn-danger" onClick={() => handleDelete(cat.id)} style={{ padding: '6px 12px', fontSize: '12px' }}>Delete</button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '20px' }}>No categories found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PostCategory;

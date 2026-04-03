import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

const PostCategory = () => {
  const { categories, fetchCategories, token, API_BASE } = useOutletContext();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name || !description) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ name, description })
      });

      if (res.ok) {
        setName('');
        setDescription('');
        fetchCategories();
      } else {
        const err = await res.json();
        alert(err.message || 'Failed to add category');
      }
    } catch (e) {
      alert('Server error');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this category?')) return;
    try {
      const res = await fetch(`${API_BASE}/categories/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchCategories();
      } else {
        alert('Failed to delete category');
      }
    } catch (e) {
      alert('Server error');
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '30px' }}>
      <div className="glass-panel" style={{ padding: '25px', height: 'max-content' }}>
        <div className="page-header">
          <h3>Add Category</h3>
        </div>
        <form onSubmit={handleAdd}>
          <div className="form-group" style={{ marginBottom: '15px' }}>
            <label className="glass-label">Category Name</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="glass-input" required />
          </div>
          <div className="form-group" style={{ marginBottom: '20px' }}>
            <label className="glass-label">Description</label>
            <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className="glass-input" required />
          </div>
          <button type="submit" className="gradient-btn" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Adding...' : 'Add'}
          </button>
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
                <th>Name</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, idx) => (
                <tr key={cat._id}>
                  <td>{idx + 1}</td>
                  <td>{cat.name}</td>
                  <td>{cat.description}</td>
                  <td>
                    <button className="gradient-btn gradient-btn-danger" onClick={() => handleDelete(cat._id)} style={{ padding: '6px 12px', fontSize: '12px' }}>Delete</button>
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

import React, { useState } from 'react';

import { useOutletContext } from 'react-router-dom';

const EventPost = () => {
  const { events, setEvents, categories } = useOutletContext();
  const [formData, setFormData] = useState({
    title: '', date: '', startTime: '', endTime: '', 
    price: '', category: categories.length > 0 ? categories[0].name : '', 
    location: '', description: ''
  });
  const [imageFile, setImageFile] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: Date.now(),
      image: imageFile ? URL.createObjectURL(imageFile) : 'https://via.placeholder.com/300x200?text=No+Image',
      ...formData
    };
    setEvents([...events, newEvent]);
    // Reset form
    setFormData({ title: '', date: '', startTime: '', endTime: '', price: '', category: categories.length > 0 ? categories[0].name : '', location: '', description: '' });
    setImageFile(null);
    alert('Event added successfully!');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="glass-panel" style={{ padding: '25px', maxWidth: '800px', margin: '0 auto' }}>
      <div className="page-header">
        <h3>Post New Event</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-full">
          <label className="glass-label">Event Image</label>
          <input 
            type="file" 
            accept="image/*" 
            onChange={(e) => setImageFile(e.target.files[0])} 
            className="glass-input" 
          />
        </div>
        
        <div className="form-full">
          <label className="glass-label">Event Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} className="glass-input" required />
        </div>
        
        <div>
          <label className="glass-label">Start / End Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} className="glass-input" required />
        </div>

        <div>
          <label className="glass-label">Price ($)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} className="glass-input" required />
        </div>

        <div>
          <label className="glass-label">Start Time</label>
          <input type="time" name="startTime" value={formData.startTime} onChange={handleChange} className="glass-input" required />
        </div>

        <div>
          <label className="glass-label">End Time</label>
          <input type="time" name="endTime" value={formData.endTime} onChange={handleChange} className="glass-input" required />
        </div>

        <div>
          <label className="glass-label">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} className="glass-input" style={{ appearance: 'none' }} required>
            {categories.map(c => <option key={c.id} style={{color:'#000'}} value={c.name}>{c.name}</option>)}
          </select>
        </div>

        <div>
          <label className="glass-label">Location</label>
          <input type="text" name="location" value={formData.location} onChange={handleChange} className="glass-input" required />
        </div>

        <div className="form-full">
          <label className="glass-label">Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} className="glass-input glass-textarea" required></textarea>
        </div>

        <div className="form-full">
          <button type="submit" className="gradient-btn" style={{ width: '100%' }}>Post Event</button>
        </div>
      </form>
    </div>
  );
};

export default EventPost;

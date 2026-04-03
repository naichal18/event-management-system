import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const inputBase = {
  width: '100%',
  padding: '13px 16px',
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(0,200,255,0.2)',
  borderRadius: '10px',
  color: '#fff',
  fontSize: '14px',
  outline: 'none',
  transition: 'all 0.3s',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
};

const inputErrorBase = {
  ...inputBase,
  border: '1px solid rgba(239,68,68,0.6)',
};

const Contact = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [focusField, setFocusField] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!form.phone.trim()) {
      newErrors.phone = 'Phone is required.';
    } else if (!/^\d{10}$/.test(form.phone.trim())) {
      newErrors.phone = 'Phone must be exactly 10 digits.';
    }
    if (!form.message.trim()) newErrors.message = 'Message is required.';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const API_BASE = 'https://event-management-system-5wx4.onrender.com/api'; // Verify API_BASE (Step 2)
    
    console.log("Sending message (Step 1):", form); // MANDATORY DEBUG STEP 1 
    
    fetch(`${API_BASE}/messages`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
    .then(async res => {
      console.log("Response (Step 3):", res); // MANDATORY DEBUG STEP 3
      if (res.ok) {
        console.log("SUCCESS: Message submitted to DB."); 
        setSuccess(true);
        setForm({ name: '', email: '', phone: '', message: '' });
        setErrors({});
        setTimeout(() => setSuccess(false), 5000);
      } else {
        const errData = await res.json().catch(() => ({}));
        console.error('SERVER ERROR (Step 3):', res.status, errData);
      }
    })
    .catch(err => {
      console.error('NETWORK ERROR (Step 3):', err); // MANDATORY DEBUG STEP 3
    });
  };

  const getInputStyle = (field) => ({
    ...(errors[field] ? inputErrorBase : inputBase),
    boxShadow: focusField === field ? '0 0 12px rgba(0,200,255,0.35)' : 'none',
    borderColor: errors[field]
      ? 'rgba(239,68,68,0.6)'
      : focusField === field
      ? '#0df'
      : 'rgba(0,200,255,0.2)',
  });

  return (
    <div style={{ minHeight: '100vh' }}>

      {/* Top Banner */}
      <div style={{
        position: 'relative',
        height: '350px',
        backgroundImage: 'url("https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        borderBottom: '1px solid rgba(0,255,255,0.15)',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(11,17,32,0.85)' }}></div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 900,
            background: 'linear-gradient(to right, #00f2fe, #4facfe)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: '10px',
            letterSpacing: '2px',
          }}>
            CONTACT US NOW
          </h1>
          <h2 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 600, marginBottom: '15px' }}>
            KEEP IN TOUCH
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>
            <span
              style={{ cursor: 'pointer', color: '#0df' }}
              onClick={() => navigate('/user/home')}
            >Home</span>
            <span style={{ margin: '0 12px', color: '#475569' }}>|</span>
            <span style={{ color: '#fff' }}>Contact Us</span>
          </p>
        </div>
      </div>

      {/* Centered Form Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '50px',
        padding: '70px 40px',
        flexWrap: 'wrap',
      }}>

        {/* Glass Form Card */}
        <div style={{
          background: 'rgba(255,255,255,0.05)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          border: '1px solid rgba(0,200,255,0.2)',
          borderRadius: '18px',
          padding: '40px',
          width: '100%',
          maxWidth: '480px',
          boxShadow: '0 8px 40px rgba(0,0,0,0.4), 0 0 40px rgba(0,200,255,0.05)',
        }}>
          <h3 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 700, marginBottom: '6px' }}>
            Send Us a Message
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '30px' }}>
            Fill out the form below and our team will get back to you.
          </p>

          {/* Success message */}
          {success && (
            <div style={{
              background: 'rgba(34,197,94,0.15)',
              border: '1px solid rgba(34,197,94,0.4)',
              borderRadius: '10px',
              padding: '14px 18px',
              marginBottom: '25px',
              color: '#22c55e',
              fontWeight: 600,
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              ✅ Message sent successfully! We will contact you shortly.
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {/* Name */}
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '13px', marginBottom: '8px', fontWeight: 600 }}>
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                onFocus={() => setFocusField('name')}
                onBlur={() => setFocusField('')}
                style={getInputStyle('name')}
              />
              {errors.name && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '5px' }}>⚠ {errors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '13px', marginBottom: '8px', fontWeight: 600 }}>
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={handleChange}
                onFocus={() => setFocusField('email')}
                onBlur={() => setFocusField('')}
                style={getInputStyle('email')}
              />
              {errors.email && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '5px' }}>⚠ {errors.email}</p>}
            </div>

            {/* Phone */}
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '13px', marginBottom: '8px', fontWeight: 600 }}>
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="10-digit mobile number"
                value={form.phone}
                onChange={handleChange}
                onFocus={() => setFocusField('phone')}
                onBlur={() => setFocusField('')}
                style={getInputStyle('phone')}
              />
              {errors.phone && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '5px' }}>⚠ {errors.phone}</p>}
            </div>

            {/* Message */}
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '13px', marginBottom: '8px', fontWeight: 600 }}>
                Message
              </label>
              <textarea
                name="message"
                rows="5"
                placeholder="Write your message here..."
                value={form.message}
                onChange={handleChange}
                onFocus={() => setFocusField('message')}
                onBlur={() => setFocusField('')}
                style={{
                  ...getInputStyle('message'),
                  resize: 'none',
                }}
              />
              {errors.message && <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '5px' }}>⚠ {errors.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="user-gradient-btn"
              style={{ padding: '14px', fontSize: '16px', fontWeight: 700, borderRadius: '10px', marginTop: '5px', width: '100%' }}
            >
              📤 Send Message
            </button>
          </form>
        </div>

        {/* Contact Info Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '320px', paddingTop: '10px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700, marginBottom: '5px' }}>Get in Touch</h3>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.7 }}>
            We are always happy to hear from you! Whether it's a business inquiry, booking request, or just a message — we'll respond promptly.
          </p>

          {[
            { icon: '📞', label: 'Phone', value: '+91 98765 43210' },
            { icon: '📧', label: 'Email', value: 'support@harmoni.com' },
            { icon: '📍', label: 'Location', value: 'Harmoni HQ, Ahmedabad, Gujarat' },
            { icon: '🕒', label: 'Working Hours', value: 'Mon–Sat, 9:00 AM – 7:00 PM' },
          ].map((info) => (
            <div
              key={info.label}
              style={{
                display: 'flex',
                gap: '15px',
                alignItems: 'flex-start',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(0,200,255,0.15)',
                borderRadius: '12px',
                padding: '18px',
              }}
            >
              <span style={{ fontSize: '22px', flexShrink: 0 }}>{info.icon}</span>
              <div>
                <p style={{ color: '#64748b', fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{info.label}</p>
                <p style={{ color: '#e2e8f0', fontWeight: 600, fontSize: '14px' }}>{info.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;

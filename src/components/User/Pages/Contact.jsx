import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [focusField, setFocusField] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = t('contact_page.errors.name');
    if (!form.email.trim()) {
      newErrors.email = t('contact_page.errors.email');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t('contact_page.errors.email_invalid');
    }
    if (!form.phone.trim()) {
      newErrors.phone = t('contact_page.errors.phone');
    } else if (!/^\d{10}$/.test(form.phone.trim())) {
      newErrors.phone = t('contact_page.errors.phone_invalid');
    }
    if (!form.message.trim()) newErrors.message = t('contact_page.errors.message');
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

    const API_BASE = 'http://localhost:5001/api';
    
    fetch(`${API_BASE}/messages`, { 
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
    .then(async res => {
      if (res.ok) {
        setSuccess(true);
        setForm({ name: '', email: '', phone: '', message: '' });
        setErrors({});
        setTimeout(() => setSuccess(false), 5000);
      }
    })
    .catch(err => {
      console.error('NETWORK ERROR:', err);
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
            {t('contact_page.banner_title')}
          </h1>
          <h2 style={{ color: '#fff', fontSize: '1.6rem', fontWeight: 600, marginBottom: '15px' }}>
            {t('contact_page.banner_subtitle')}
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>
            <span
              style={{ cursor: 'pointer', color: '#0df' }}
              onClick={() => navigate('/user/home')}
            >{t('navbar.home')}</span>
            <span style={{ margin: '0 12px', color: '#475569' }}>|</span>
            <span style={{ color: '#fff' }}>{t('navbar.contact')}</span>
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
            {t('contact_page.form_title')}
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '30px' }}>
            {t('contact_page.form_subtitle')}
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
              ✅ {t('contact_page.success_msg')}
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {/* Name */}
            <div>
              <label style={{ display: 'block', color: '#cbd5e1', fontSize: '13px', marginBottom: '8px', fontWeight: 600 }}>
                {t('contact_page.name_label')}
              </label>
              <input
                type="text"
                name="name"
                placeholder={t('contact_page.name_placeholder')}
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
                {t('contact_page.email_label')}
              </label>
              <input
                type="email"
                name="email"
                placeholder={t('contact_page.email_placeholder')}
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
                {t('contact_page.phone_label')}
              </label>
              <input
                type="tel"
                name="phone"
                placeholder={t('contact_page.phone_placeholder')}
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
                {t('contact_page.message_label')}
              </label>
              <textarea
                name="message"
                rows="5"
                placeholder={t('contact_page.message_placeholder')}
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
              📤 {t('contact_page.send_btn')}
            </button>
          </form>
        </div>

        {/* Contact Info Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '320px', paddingTop: '10px' }}>
          <h3 style={{ color: '#fff', fontSize: '1.4rem', fontWeight: 700, marginBottom: '5px' }}>{t('contact_page.get_in_touch')}</h3>
          <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.7 }}>
            {t('contact_page.touch_desc')}
          </p>

          {[
            { icon: '📞', label: t('contact_page.info.phone'), value: '+91 98765 43210' },
            { icon: '📧', label: t('contact_page.info.email'), value: 'support@harmoni.com' },
            { icon: '📍', label: t('contact_page.info.location'), value: 'Harmoni HQ, Ahmedabad, Gujarat' },
            { icon: '🕒', label: t('contact_page.info.hours'), value: t('contact_page.info.hours_val') },
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

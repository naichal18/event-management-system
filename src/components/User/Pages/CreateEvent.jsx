import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const CreateEvent = () => {
    const { t } = useTranslation();
    const { token, API_BASE } = useAuth();
    const { showToast } = useToast();
    const navigate = useNavigate();
    console.log("CreateEvent Loaded");
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        eventType: '',
        location: '',
        budget: '',
        guests: '',
        date: '',
        time: '19:00',
        description: ''
    });

    const [loading, setLoading] = useState(false);
    const [aiLoading, setAiLoading] = useState(false);
    const [recommendations, setRecommendations] = useState(null);
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const res = await fetch(`${API_BASE}/categories`);
            if (res.ok) {
                const data = await res.json();
                setCategories(data);
            }
        } catch (e) {
            console.error('Failed to fetch categories:', e);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                showToast(t('create_event.form.image_error') || 'Image size should be less than 2MB', 'error');
                return;
            }
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const generateAISuggestions = () => {
        if (!formData.eventType || !formData.budget || !formData.guests) {
            showToast(t('create_event.form.ai_error') || 'Please fill in Event Type, Budget, and Guests for AI planning!', 'error');
            return;
        }

        setAiLoading(true);
        // Simulate AI Processing Delay
        setTimeout(() => {
            const type = formData.eventType;
            const budget = parseInt(formData.budget);
            
            let food, theme, music, breakdown;

            if (type === 'Wedding') {
                theme = 'Royal Gold & White Elegance';
                food = 'Grand Indian Buffet with Live Counters and Fusion Desserts';
                music = 'Live String Quartet for Reception, DJ for Party';
                breakdown = {
                    venue: budget * 0.4,
                    catering: budget * 0.3,
                    decor: budget * 0.2,
                    entertainment: budget * 0.1
                };
            } else if (type === 'Birthday') {
                theme = 'Neon Glow / Retro Disco';
                food = 'Finger Foods, Sliders, Cocktails, and Designer Cake';
                music = 'High-Energy Pop DJ with Interactive LED Floor';
                breakdown = {
                    venue: budget * 0.2,
                    catering: budget * 0.4,
                    decor: budget * 0.3,
                    entertainment: budget * 0.1
                };
            } else {
                theme = 'Modern Minimalist / Corporate Chic';
                food = 'Gourmet Plated Dinner or Premium Canapés';
                music = 'Ambient Jazz Band or Professional Audio Setup';
                breakdown = {
                    venue: budget * 0.5,
                    catering: budget * 0.2,
                    decor: budget * 0.15,
                    entertainment: budget * 0.15
                };
            }

            setRecommendations({
                theme,
                food,
                music,
                breakdown: `Venue: ₹${breakdown.venue.toLocaleString()}, Food: ₹${breakdown.catering.toLocaleString()}, Decor: ₹${breakdown.decor.toLocaleString()}, Entertainment: ₹${breakdown.entertainment.toLocaleString()}`
            });
            setAiLoading(false);
            showToast(t('create_event.form.ai_success') || 'AI Suggestions Generated!', 'success');
        }, 1500);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!recommendations) {
            showToast(t('create_event.form.ai_error'), 'error');
            return;
        }

        setLoading(true);
        try {
            console.log('Frontend: Submitting event to:', `${API_BASE}/events`);
            
            const eventData = new FormData();
            eventData.append('title', formData.title);
            eventData.append('category', formData.eventType);
            eventData.append('date', formData.date);
            eventData.append('time', formData.time);
            eventData.append('location', formData.location);
            eventData.append('description', formData.description);
            eventData.append('price', formData.budget);
            eventData.append('attendees', formData.guests);
            eventData.append('ai_suggestions', JSON.stringify(recommendations));
            
            if (image) {
                eventData.append('image', image);
            }

            const res = await fetch(`${API_BASE}/events`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: eventData
            });

            const data = await res.json();
            console.log('Frontend: API Response:', data);

            if (res.ok) {
                showToast(t('common.success'), 'success');
                navigate('/user/home');
            } else {
                showToast(data.message || t('common.error'), 'error');
            }
        } catch (e) {
            console.error('Frontend: Submission Error:', e);
            showToast(t('common.error'), 'error');
        } finally {
            setLoading(false);
        }
    };

    if (!formData) return <div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>Loading...</div>;

    return (
        <div style={{ padding: '60px 40px', minHeight: '100vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>{t('create_event.title', 'AI Event Planner')}</h2>
                <p style={{ color: '#94a3b8' }}>{t('create_event.subtitle', 'Our AI will help you plan the perfect event based on your budget')}</p>
                <div style={{ height: '4px', width: '60px', background: 'linear-gradient(to right, #06b6d4, #3b82f6)', margin: '15px auto 0', borderRadius: '2px' }}></div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center' }}>
                {/* Form Section */}
                <div className="user-glass-card" style={{ flex: '1 1 450px', maxWidth: '650px', padding: '40px' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '14px' }}>{t('create_event.form.event_title')}</label>
                            <input 
                                type="text" 
                                name="title" 
                                value={formData?.title || ""} 
                                onChange={handleChange} 
                                placeholder={t('create_event.form.title_placeholder')}
                                required
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff' }}
                            />
                        </div>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '14px' }}>{t('create_event.form.event_type')}</label>
                                <select 
                                    name="eventType" 
                                    value={formData?.eventType || ""} 
                                    onChange={handleChange} 
                                    required
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff' }}
                                >
                                    <option value="" disabled>{t('create_event.form.select_type')}</option>
                                    {categories.map(cat => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
                                    <option value="Wedding">Wedding</option>
                                    <option value="Birthday">Birthday</option>
                                    <option value="Corporate">Corporate</option>
                                </select>
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '14px' }}>{t('create_event.form.location')}</label>
                                <input 
                                    type="text" 
                                    name="location" 
                                    value={formData?.location || ""} 
                                    onChange={handleChange} 
                                    placeholder={t('create_event.form.location_placeholder')}
                                    required
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '14px' }}>{t('create_event.form.budget')}</label>
                                <input 
                                    type="number" 
                                    name="budget" 
                                    value={formData?.budget || ""} 
                                    onChange={handleChange} 
                                    placeholder={t('create_event.form.budget_placeholder')}
                                    required
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff' }}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '14px' }}>{t('create_event.form.attendees')}</label>
                                <input 
                                    type="number" 
                                    name="guests" 
                                    value={formData?.guests || ""} 
                                    onChange={handleChange} 
                                    placeholder={t('create_event.form.attendees_placeholder')}
                                    required
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff' }}
                                />
                            </div>
                        </div>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '14px' }}>{t('create_event.form.date')}</label>
                                <input 
                                    type="date" 
                                    name="date" 
                                    value={formData?.date || ""} 
                                    onChange={handleChange} 
                                    required
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff' }}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '14px' }}>{t('create_event.form.time')}</label>
                                <input 
                                    type="time" 
                                    name="time" 
                                    value={formData?.time || "19:00"} 
                                    onChange={handleChange} 
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff' }}
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '14px' }}>{t('create_event.form.image')}</label>
                            <input 
                                type="file" 
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0] || null;
                                    setImage(file);
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => setPreview(reader.result);
                                        reader.readAsDataURL(file);
                                    } else {
                                        setPreview(null);
                                    }
                                }}
                                style={{ width: '100%', padding: '10px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff', marginBottom: '10px' }}
                            />
                            {preview && (
                                <div style={{ marginTop: '10px', borderRadius: '8px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
                                    <img src={preview} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover' }} />
                                </div>
                            )}
                        </div>

                        <div>
                            <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '14px' }}>{t('create_event.form.description')}</label>
                            <textarea 
                                name="description" 
                                value={formData?.description || ""} 
                                onChange={handleChange} 
                                placeholder={t('create_event.form.description_placeholder')}
                                rows="3"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff', resize: 'none' }}
                            ></textarea>
                        </div>

                        <div style={{ display: 'flex', gap: '15px' }}>
                            <button 
                                type="button" 
                                onClick={generateAISuggestions} 
                                disabled={aiLoading}
                                className="user-gradient-btn" 
                                style={{ flex: 1, padding: '14px', background: 'linear-gradient(135deg, #7c3aed, #4f46e5)' }}
                            >
                                {aiLoading ? t('create_event.form.ai_loading') : t('create_event.form.ai_btn')}
                            </button>
                            <button 
                                type="submit" 
                                disabled={loading || !recommendations}
                                className="user-gradient-btn" 
                                style={{ flex: 1, padding: '14px' }}
                            >
                                {loading ? t('create_event.form.submit_loading') : t('create_event.form.submit_btn')}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Results Section */}
                {recommendations && (
                    <div className="user-glass-card" style={{ flex: '1 1 400px', maxWidth: '500px', padding: '40px', background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(59, 130, 246, 0.1))', border: '1px solid rgba(139, 92, 246, 0.3)' }}>
                        <h3 style={{ color: '#a78bfa', fontSize: '1.5rem', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span>✨</span> {t('create_event.ai_plan.title')}
                        </h3>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className="ai-suggestion-item">
                                <p style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>{t('create_event.ai_plan.theme')}</p>
                                <p style={{ fontSize: '16px', color: '#fff', fontWeight: 600 }}>{recommendations.theme}</p>
                            </div>
                            
                            <div className="ai-suggestion-item">
                                <p style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>{t('create_event.ai_plan.food')}</p>
                                <p style={{ fontSize: '16px', color: '#fff', fontWeight: 600 }}>{recommendations.food}</p>
                            </div>
                            
                            <div className="ai-suggestion-item">
                                <p style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>{t('create_event.ai_plan.music')}</p>
                                <p style={{ fontSize: '16px', color: '#fff', fontWeight: 600 }}>{recommendations.music}</p>
                            </div>
                            
                            <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px', border: '1px solid rgba(167, 139, 250, 0.2)' }}>
                                <p style={{ fontSize: '12px', color: '#a78bfa', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>{t('create_event.ai_plan.budget')}</p>
                                <p style={{ fontSize: '14px', color: '#cbd5e1', lineHeight: '1.6' }}>{recommendations.breakdown}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateEvent;

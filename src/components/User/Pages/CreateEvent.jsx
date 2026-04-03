import React, { useState } from 'react';

const CreateEvent = () => {
    const [formData, setFormData] = useState({
        eventType: '',
        location: '',
        vibe: '',
        budget: '',
        guests: ''
    });

    const [recommendations, setRecommendations] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const getRecommendations = (type, vibe) => {
        let venue = "Sleek Indoor Hall";
        let decoration = "Minimalist Elegance";
        let music = "Acoustic / Lounge";
        let food = "Gourmet Buffet";

        if (type === 'Birthday') {
            venue = "Open Terrace / Club House";
            if (vibe === 'Party') {
                decoration = "LED Lights, Neon Signs, Balloons";
                music = "DJ Mix, Upbeat Tracks";
                food = "Finger Foods, Cocktails, Cake Station";
            } else if (vibe === 'Chill') {
                decoration = "Fairy Lights, Floor Cushions";
                music = "Indie Pop, Lo-Fi";
                food = "BBQ, Craft Beer, Comfort Food";
            }
        } else if (type === 'Wedding') {
            venue = "Luxury Banquet / Resort";
            if (vibe === 'Traditional') {
                decoration = "Grand Mandap, Marigold Flowers";
                music = "Classical, Shehnai, Folk";
                food = "Elaborate Thali, Live Sweets";
            } else if (vibe === 'Modern') {
                decoration = "Crystal Chandeliers, Pastel Florals";
                music = "Live Band, Soft Jazz";
                food = "Fusion Cuisine, Live Counters";
            }
        } else if (type === 'Concert' || type === 'Festival') {
            venue = "Outdoor Arena / Stadium";
            decoration = "Massive Stage, Laser Shows";
            music = "Live Artists, Heavy Bass";
            food = "Food Trucks, Quick Bites";
        } else if (type === 'Corporate') {
            venue = "Premium Convention Center";
            decoration = "Branded Backdrops, Sleek Setup";
            music = "Subtle Instrumental";
            food = "Formal Seated Dinner, Canapés";
        }

        return {
            venue,
            decoration,
            music,
            food
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.eventType || !formData.vibe) {
            alert('Please select an Event Type and Vibe to get recommendations!');
            return;
        }

        const recs = getRecommendations(formData.eventType, formData.vibe);
        
        let estBudget = formData.guests ? parseInt(formData.guests) * (formData.vibe === 'Luxury' ? 5000 : 2000) : 'Variable based on choices';
        if(formData.budget && !isNaN(parseInt(formData.budget))) {
             estBudget = `Max ${parseInt(formData.budget).toLocaleString()}`;
        } else if (typeof estBudget === 'number') {
             estBudget = `Approx ₹${estBudget.toLocaleString()}`;
        }

        setRecommendations({
            ...recs,
            estimatedBudget: estBudget
        });
    };

    return (
        <div style={{ padding: '60px 40px', minHeight: '100vh' }}>
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>Build Your Own Event</h2>
                <p style={{ color: '#94a3b8' }}>Customize your dream event and get instant recommendations</p>
                <div style={{ height: '4px', width: '60px', background: 'linear-gradient(to right, #06b6d4, #3b82f6)', margin: '15px auto 0', borderRadius: '2px' }}></div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', justifyContent: 'center' }}>
                {/* Form Section */}
                <div className="user-glass-card" style={{ flex: '1 1 400px', maxWidth: '600px', padding: '40px' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '14px' }}>Event Type *</label>
                            <select 
                                name="eventType" 
                                value={formData.eventType} 
                                onChange={handleChange} 
                                required
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff' }}
                            >
                                <option value="" disabled>Select Type</option>
                                <option value="Wedding">Wedding</option>
                                <option value="Birthday">Birthday</option>
                                <option value="Concert">Concert</option>
                                <option value="Festival">Festival</option>
                                <option value="Corporate">Corporate</option>
                            </select>
                        </div>
                        
                        <div>
                            <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '14px' }}>Location</label>
                            <input 
                                type="text" 
                                name="location" 
                                value={formData.location} 
                                onChange={handleChange} 
                                placeholder="e.g. Mumbai, Beach, Hotel"
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff' }}
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '14px' }}>Vibe *</label>
                            <select 
                                name="vibe" 
                                value={formData.vibe} 
                                onChange={handleChange} 
                                required
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff' }}
                            >
                                <option value="" disabled>Select Vibe</option>
                                <option value="Chill">Chill</option>
                                <option value="Party">Party</option>
                                <option value="Luxury">Luxury</option>
                                <option value="Traditional">Traditional</option>
                                <option value="Modern">Modern</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', gap: '20px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '14px' }}>Budget (₹)</label>
                                <input 
                                    type="number" 
                                    name="budget" 
                                    value={formData.budget} 
                                    onChange={handleChange} 
                                    placeholder="Optional"
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff' }}
                                />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'block', color: '#cbd5e1', marginBottom: '8px', fontSize: '14px' }}>Guests</label>
                                <input 
                                    type="number" 
                                    name="guests" 
                                    value={formData.guests} 
                                    onChange={handleChange} 
                                    placeholder="Optional"
                                    style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(15, 23, 42, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#fff' }}
                                />
                            </div>
                        </div>

                        <button type="submit" className="user-gradient-btn" style={{ marginTop: '10px', padding: '14px', fontSize: '16px', fontWeight: 'bold' }}>
                            Generate Setup
                        </button>
                    </form>
                </div>

                {/* Results Section */}
                {recommendations && (
                    <div className="user-glass-card" style={{ flex: '1 1 400px', maxWidth: '500px', padding: '40px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05), rgba(59, 130, 246, 0.1))', border: '1px solid rgba(0, 210, 255, 0.2)' }}>
                        <h3 style={{ color: '#0df', fontSize: '1.5rem', marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>
                            ✨ Recommended Setup
                        </h3>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div>
                                <p style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Suggested Venue Type</p>
                                <p style={{ fontSize: '18px', color: '#fff', fontWeight: 600 }}>{recommendations.venue}</p>
                            </div>
                            
                            <div>
                                <p style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Decoration Style</p>
                                <p style={{ fontSize: '18px', color: '#fff', fontWeight: 600 }}>{recommendations.decoration}</p>
                            </div>
                            
                            <div>
                                <p style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Music Recommendation</p>
                                <p style={{ fontSize: '18px', color: '#fff', fontWeight: 600 }}>{recommendations.music}</p>
                            </div>
                            
                            <div>
                                <p style={{ fontSize: '12px', color: '#64748b', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Food Type</p>
                                <p style={{ fontSize: '18px', color: '#fff', fontWeight: 600 }}>{recommendations.food}</p>
                            </div>

                            <div style={{ marginTop: '20px', padding: '15px', background: 'rgba(0,0,0,0.3)', borderRadius: '10px' }}>
                                <p style={{ fontSize: '12px', color: '#0df', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Estimated Budget</p>
                                <p style={{ fontSize: '20px', color: '#fff', fontWeight: 800 }}>{recommendations.estimatedBudget}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CreateEvent;

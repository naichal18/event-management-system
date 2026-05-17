import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext';

// 🚀 SEMANTIC CONTENT GENERATOR BY CATEGORY
const getEventContext = (category, title) => {
  const context = {
    Cricket: {
      whatHappen: 'A high-intensity match featuring top-tier players, live commentary, and multiple innings of thrilling action. The stadium will be buzzing with live fan interaction zones and match rituals.',
      whySpecial: 'Experience the electric atmosphere of a live stadium match, the roar of the crowd, and the prestigious trophy ceremony that concludes the championship.',
      highlights: ['Live Stadium Match', 'Fan Interaction Zones', 'Trophy Ceremony', 'Professional Commentary']
    },
    Concert: {
      whatHappen: 'An immersive musical journey with state-of-the-art sound systems, explosive light shows, and back-to-back performances by world-class DJs and singers.',
      whySpecial: 'Unmatched energy, massive stage productions, and an environment designed to celebrate the spirit of music and rhythm.',
      highlights: ['Stage Light Show', 'World-Class DJ Set', 'High-Fidelity Sound', 'Live Crowd Energy']
    },
    Corporate: {
      whatHappen: 'A strategic gathering focused on innovation, featuring insightful keynote sessions, startup pitch showcases, and structured networking modules.',
      whySpecial: 'Connect with industry leaders, gain exclusive market insights, and participate in high-level business discussions in a premium setting.',
      highlights: ['Keynote Sessions', 'Investor Networking', 'Startup Pitches', 'Strategic Insights']
    },
    Wedding: {
      whatHappen: 'A grand celebration of love and tradition, featuring beautiful rituals, elegant reception decor, and a magnificent multi-cuisine dinner experience.',
      whySpecial: 'A perfectly curated blend of royal heritage, emotional ceremonies, and premium hospitality that makes every moment unforgettable.',
      highlights: ['Traditional Rituals', 'Royal Reception', 'Gourmet Dining', 'Elegant Decor']
    },
    Festival: {
      whatHappen: 'A vibrant celebration of culture with non-stop Garba rounds, Dandiya fusion performances, and authentic traditional food stalls.',
      whySpecial: 'Immerse yourself in the rich colors and energy of the festive season, celebrating tradition with community spirit.',
      highlights: ['Garba & Dandiya', 'Cultural Stalls', 'Traditional Attire', 'Community Festive Vibes']
    },
    Party: {
      whatHappen: 'A high-energy social event with live music, thematic neon decor, and a curated selection of food and drinks to keep the vibes going all night.',
      whySpecial: 'The perfect mix of social networking, celebration, and fun in a premium, high-energy environment.',
      highlights: ['Live Music', 'Neon Theme', 'Social Mixers', 'Premium Catering']
    }
  };
  return context[category] || context['Corporate'];
};

const EVENT_UNIQUE_IMAGES = {
  'IPL Fan Fest': 'https://images.unsplash.com/photo-1540747913346-19212a4b74a5',
  'City Cricket League': 'https://images.unsplash.com/photo-1531415074968-036ba1b575da',
  'Night Cricket Tournament': 'https://images.unsplash.com/photo-1508341595083-fcd34d8cc142',
  'Corporate Cricket Cup': 'https://images.unsplash.com/photo-1542393545-10f5cde2c810'
};

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { API_BASE, user } = useAuth();
  const { showToast } = useToast();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);
  const SERVER_URL = API_BASE.replace('/api', '');

  const loadExternalScripts = async () => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.onload = () => resolve();
        script.onerror = (err) => reject(err);
        document.body.appendChild(script);
      });
    };

    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js');
    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js');
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url)
      .then(() => {
        showToast('Link copied to clipboard!', 'success');
      })
      .catch((err) => {
        console.error('Could not copy text: ', err);
        showToast('Failed to copy link.', 'error');
      });
  };

  const handleDownloadPDF = async () => {
    try {
      showToast('Generating brochure PDF...', 'info');
      await loadExternalScripts();
      
      const printContainer = document.createElement('div');
      printContainer.id = 'pdf-print-container';
      printContainer.style.position = 'fixed';
      printContainer.style.left = '-9999px';
      printContainer.style.top = '-9999px';
      printContainer.style.width = '794px';
      printContainer.style.background = '#ffffff';
      printContainer.style.color = '#1e293b';
      printContainer.style.fontFamily = "'Inter', sans-serif";
      printContainer.style.padding = '40px';
      printContainer.style.boxSizing = 'border-box';
      
      const uniqueVerificationId = `HRM-VAL-${event._id.substring(18).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const currentDateString = new Date().toLocaleString('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short'
      });
      
      const userName = user?.name || 'Guest User';
      const userEmail = user?.email || 'guest@harmoni.com';

      const bannerSrc = EVENT_UNIQUE_IMAGES[event.title] || (event.image?.startsWith('http') ? event.image : `${SERVER_URL}${event.image}`);

      printContainer.innerHTML = `
        <div style="border: 4px solid #0f172a; padding: 25px; border-radius: 15px; background: #f8fafc; position: relative; min-height: 1050px; display: flex; flex-direction: column; justify-content: space-between; box-sizing: border-box;">
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 25px;">
              <div>
                <h1 style="margin: 0; font-size: 28px; font-weight: 900; color: #0f172a; letter-spacing: -1px;">HARMONI</h1>
                <span style="font-size: 11px; font-weight: 800; color: #06b6d4; letter-spacing: 2px; text-transform: uppercase;">Event Management System</span>
              </div>
              <div style="text-align: right;">
                <span style="background: #e0f2fe; color: #0369a1; font-size: 11px; padding: 6px 12px; border-radius: 30px; font-weight: 800; border: 1px solid #bae6fd;">🛡️ OFFICIAL VERIFIED DOCUMENT</span>
                <div style="font-size: 10px; color: #64748b; margin-top: 5px;">ID: ${uniqueVerificationId}</div>
              </div>
            </div>

            <div style="position: relative; height: 260px; border-radius: 12px; overflow: hidden; margin-bottom: 25px; background: #0f172a;">
              <img src="${bannerSrc}" style="width: 100%; height: 100%; object-fit: cover;" />
              <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(to top, rgba(0,0,0,0.8), transparent); padding: 20px; color: white;">
                <span style="background: #06b6d4; color: black; font-size: 10px; font-weight: 800; padding: 4px 8px; border-radius: 4px; text-transform: uppercase;">${event.category}</span>
                <h2 style="margin: 5px 0 0 0; font-size: 24px; font-weight: 800; text-shadow: 0 2px 4px rgba(0,0,0,0.5);">${event.title}</h2>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px; margin-bottom: 30px; background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 15px;">
              <div style="border-right: 1px solid #f1f5f9; padding: 5px 10px;">
                <span style="font-size: 10px; color: #94a3b8; font-weight: 700; text-transform: uppercase;">Date & Time</span>
                <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-top: 4px;">📅 ${event.date}</div>
                <div style="font-size: 12px; color: #64748b; margin-top: 2px;">🕒 ${event.time || '7:00 PM'}</div>
              </div>
              <div style="border-right: 1px solid #f1f5f9; padding: 5px 10px;">
                <span style="font-size: 10px; color: #94a3b8; font-weight: 700; text-transform: uppercase;">Location</span>
                <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-top: 4px;">📍 ${event.location}</div>
              </div>
              <div style="padding: 5px 10px;">
                <span style="font-size: 10px; color: #94a3b8; font-weight: 700; text-transform: uppercase;">Organizer</span>
                <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-top: 4px;">👥 ${userName}</div>
              </div>
            </div>

            <div style="margin-bottom: 30px;">
              <h3 style="font-size: 16px; font-weight: 800; color: #0f172a; margin-bottom: 10px; border-left: 4px solid #06b6d4; padding-left: 10px;">Event Overview</h3>
              <p style="font-size: 13px; color: #475569; line-height: 1.6; margin: 0;">${event.description || `Join us for an unforgettable experience at the ${event.title} in ${event.location}. This event is curated to provide the highest level of engagement and professional management.`}</p>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
              <div style="background: #f1f5f9; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0;">
                <h4 style="margin: 0 0 10px 0; color: #6b21a8; font-weight: 800; font-size: 13px; text-transform: uppercase;">What Will Happen</h4>
                <p style="margin: 0; font-size: 12px; color: #475569; line-height: 1.6;">${context.whatHappen}</p>
              </div>
              <div style="background: #fdf2f8; padding: 20px; border-radius: 12px; border: 1px solid #fbcfe8;">
                <h4 style="margin: 0 0 10px 0; color: #9d174d; font-weight: 800; font-size: 13px; text-transform: uppercase;">Why This Event Is Special</h4>
                <p style="margin: 0; font-size: 12px; color: #475569; line-height: 1.6;">${context.whySpecial}</p>
              </div>
            </div>

            <div style="margin-bottom: 30px;">
              <h4 style="margin: 0 0 10px 0; font-size: 13px; font-weight: 800; color: #0f172a; text-transform: uppercase;">✨ Event Highlights</h4>
              <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                ${context.highlights.map(h => `
                  <span style="background: #ffffff; border: 1px solid #cbd5e1; border-radius: 30px; padding: 6px 14px; font-size: 11px; font-weight: 700; color: #334155;">
                    🎯 ${h}
                  </span>
                `).join('')}
              </div>
            </div>
          </div>

          <div style="border-top: 2px dashed #cbd5e1; padding-top: 20px; margin-top: 30px; box-sizing: border-box;">
            <div style="display: flex; justify-content: space-between; align-items: flex-end;">
              <div>
                <div style="font-size: 10px; color: #64748b; font-weight: 700; text-transform: uppercase;">Document Generated For:</div>
                <div style="font-size: 13px; font-weight: 800; color: #0f172a; margin-top: 4px;">👤 ${userName}</div>
                <div style="font-size: 11px; color: #475569; margin-top: 2px;">✉️ ${userEmail}</div>
              </div>
              <div style="text-align: center; border: 1px solid #cbd5e1; border-radius: 8px; padding: 5px 15px; background: #fff;">
                <div style="font-size: 8px; color: #94a3b8; font-weight: 800; text-transform: uppercase;">Verified By</div>
                <div style="font-size: 11px; font-weight: 800; color: #0f172a; margin-top: 2px;">Harmoni Events</div>
                <div style="font-size: 8px; color: #10b981; font-weight: 800; margin-top: 2px;">✓ SECURE & VERIFIED</div>
              </div>
              <div style="text-align: right;">
                <div style="font-size: 9px; color: #94a3b8; font-weight: 700;">GENERATED ON</div>
                <div style="font-size: 11px; color: #475569; font-weight: 800; margin-top: 2px;">${currentDateString}</div>
                <div style="font-size: 9px; color: #64748b; margin-top: 5px; font-style: italic;">Thank you for planning with Harmoni.</div>
              </div>
            </div>
          </div>
        </div>
      `;
      
      document.body.appendChild(printContainer);

      setTimeout(async () => {
        try {
          const canvas = await html2canvas(printContainer, {
            scale: 2,
            useCORS: true,
            allowTaint: true,
            backgroundColor: '#ffffff'
          });
          
          document.body.removeChild(printContainer);
          
          const imgData = canvas.toDataURL('image/jpeg', 0.95);
          
          const { jsPDF } = window.jspdf;
          const pdf = new jsPDF('p', 'mm', 'a4');
          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          
          pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight);
          pdf.save(`Harmoni-${event.title.replace(/\s+/g, '-')}-Brochure.pdf`);
          
          showToast('Brochure PDF downloaded successfully!', 'success');
        } catch (err) {
          console.error(err);
          showToast('Failed to render canvas.', 'error');
          const checkNode = document.getElementById('pdf-print-container');
          if (checkNode) {
            document.body.removeChild(checkNode);
          }
        }
      }, 500);
    } catch (e) {
      console.error(e);
      showToast('Failed to generate PDF.', 'error');
    }
  };

  useEffect(() => {
    fetch(`${API_BASE}/events/${id}`)
      .then(res => res.json())
      .then(data => { setEvent(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id, API_BASE]);

  if (loading) return <div style={{ color: '#fff', textAlign: 'center', padding: '100px' }}>Loading Event...</div>;
  if (!event) return <div style={{ color: '#ef4444', textAlign: 'center', padding: '100px' }}>Event Not Found</div>;

  const context = getEventContext(event.category, event.title);

  return (
    <div style={{ minHeight: '100vh', padding: '60px 20px', maxWidth: '1200px', margin: '0 auto', background: '#0b1120', color: '#fff', fontFamily: "'Inter', sans-serif" }}>
      <button onClick={() => navigate('/user/events')} style={{ background: 'transparent', border: '1px solid #0df', color: '#0df', padding: '10px 25px', borderRadius: '30px', cursor: 'pointer', marginBottom: '40px', fontWeight: 600 }}>← Back to Events</button>
      
      {/* 🖼️ MAIN BANNER */}
      <div style={{ position: 'relative', borderRadius: '40px', overflow: 'hidden', height: '550px', marginBottom: '50px', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)' }}>
        <img 
           src={EVENT_UNIQUE_IMAGES[event.title] || (event.image?.startsWith('http') ? event.image : `${SERVER_URL}${event.image}`)} 
           alt={event.title} 
           style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0b1120 0%, transparent 60%)' }}></div>
        <div style={{ position: 'absolute', bottom: '50px', left: '50px' }}>
          <span style={{ background: 'rgba(6, 182, 212, 0.2)', color: '#0df', padding: '8px 20px', borderRadius: '30px', fontSize: '13px', fontWeight: 800, border: '1px solid rgba(0,255,255,0.2)', backdropFilter: 'blur(10px)' }}>{event.category}</span>
          <h1 style={{ fontSize: '4.5rem', fontWeight: 900, marginTop: '15px', letterSpacing: '-2px' }}>{event.title}</h1>
          <div style={{ display: 'flex', gap: '30px', marginTop: '20px', color: '#94a3b8' }}>
             <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>📍 {event.location}</span>
             <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>🗓️ {event.date}</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1fr', gap: '40px' }}>
        
        {/* 📝 LEFT CONTENT */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
          
          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '50px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h3 style={{ color: '#0df', fontSize: '1.8rem', marginBottom: '25px', fontWeight: 800 }}>Event Overview</h3>
            <p style={{ color: '#94a3b8', lineHeight: 1.9, fontSize: '16px' }}>{event.description || `Join us for an unforgettable experience at the ${event.title} in ${event.location}. This event is curated to provide the highest level of engagement and professional management.`}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
             <div style={{ background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h4 style={{ color: '#a855f7', fontSize: '1.2rem', marginBottom: '15px', fontWeight: 800 }}>What will happen?</h4>
                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.7 }}>{context.whatHappen}</p>
             </div>
             <div style={{ background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '35px', border: '1px solid rgba(255,255,255,0.05)' }}>
                <h4 style={{ color: '#ec4899', fontSize: '1.2rem', marginBottom: '15px', fontWeight: 800 }}>Why is it special?</h4>
                <p style={{ color: '#94a3b8', fontSize: '14px', lineHeight: 1.7 }}>{context.whySpecial}</p>
             </div>
          </div>

        </div>

        {/* ⚡ RIGHT SIDEBAR */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          <div style={{ background: 'linear-gradient(135deg, rgba(6,182,212,0.1), rgba(15,23,42,0.4))', padding: '40px', borderRadius: '40px', border: '1px solid rgba(0,255,255,0.1)' }}>
             <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '25px', color: '#fff' }}>✨ Key Highlights</h3>
             {context.highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
                   <div style={{ width: '8px', height: '8px', background: '#0df', borderRadius: '50%' }}></div>
                   <span style={{ fontSize: '15px', fontWeight: 600, color: '#f1f5f9' }}>{h}</span>
                </div>
             ))}
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '40px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
             <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 800 }}>ENTRY PASS PRICE</span>
             <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: '#0df', marginTop: '10px' }}>₹{event.price || 'Free'}</h2>
             <button style={{ width: '100%', marginTop: '30px', background: '#0df', color: '#000', border: 'none', padding: '15px', borderRadius: '20px', fontWeight: 800, cursor: 'pointer' }}>Book Now</button>

             {event.ai_suggestions && (
                <div style={{ marginTop: '25px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                   <div style={{ height: '1px', background: 'rgba(255,255,255,0.08)', margin: '10px 0' }}></div>
                   
                   <button 
                     onClick={() => setShowShareModal(true)}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.background = 'rgba(6, 182, 212, 0.2)';
                       e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 255, 0.2)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.background = 'rgba(6, 182, 212, 0.1)';
                       e.currentTarget.style.boxShadow = 'none';
                     }}
                     style={{ 
                       width: '100%', 
                       background: 'rgba(6, 182, 212, 0.1)', 
                       color: '#0df', 
                       border: '1px solid rgba(0, 255, 255, 0.3)', 
                       padding: '12px', 
                       borderRadius: '15px', 
                       fontWeight: 700, 
                       cursor: 'pointer',
                       transition: 'all 0.3s',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       gap: '10px'
                     }}
                   >
                     📢 Share Event
                   </button>

                   <button 
                     onClick={handleDownloadPDF}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.background = 'rgba(168, 85, 247, 0.2)';
                       e.currentTarget.style.boxShadow = '0 0 15px rgba(168, 85, 247, 0.2)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.background = 'rgba(168, 85, 247, 0.1)';
                       e.currentTarget.style.boxShadow = 'none';
                     }}
                     style={{ 
                       width: '100%', 
                       background: 'rgba(168, 85, 247, 0.1)', 
                       color: '#d8b4fe', 
                       border: '1px solid rgba(168, 85, 247, 0.3)', 
                       padding: '12px', 
                       borderRadius: '15px', 
                       fontWeight: 700, 
                       cursor: 'pointer',
                       transition: 'all 0.3s',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       gap: '10px'
                     }}
                   >
                     📥 Download PDF Brochure
                   </button>

                   <button 
                     onClick={handleCopyLink}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                       e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                       e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                     }}
                     style={{ 
                       width: '100%', 
                       background: 'rgba(255, 255, 255, 0.02)', 
                       color: '#cbd5e1', 
                       border: '1px solid rgba(255, 255, 255, 0.1)', 
                       padding: '12px', 
                       borderRadius: '15px', 
                       fontWeight: 700, 
                       cursor: 'pointer',
                       transition: 'all 0.3s',
                       display: 'flex',
                       alignItems: 'center',
                       justifyContent: 'center',
                       gap: '10px'
                     }}
                   >
                     🔗 Copy Shareable Link
                   </button>
                </div>
             )}
          </div>

        </div>

      </div>

      {showShareModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 99999
        }}>
          <div style={{
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(0, 255, 255, 0.2)',
            padding: '40px',
            borderRadius: '30px',
            maxWidth: '500px',
            width: '90%',
            boxShadow: '0 25px 50px rgba(0, 255, 255, 0.1)',
            position: 'relative'
          }}>
            <button 
              onClick={() => setShowShareModal(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                fontSize: '20px',
                cursor: 'pointer',
                transition: 'color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.color = '#fff'}
              onMouseOut={(e) => e.target.style.color = '#94a3b8'}
            >
              ✕
            </button>

            <h3 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#fff', marginBottom: '10px', textAlign: 'center' }}>
              Share Event
            </h3>
            <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '30px', fontSize: '14px' }}>
              Spread the word about this amazing event!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', marginBottom: '30px' }}>
              <a 
                href={`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this event: ${event.title} - ${window.location.href}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'rgba(37, 211, 102, 0.1)',
                  color: '#25D366',
                  border: '1px solid rgba(37, 211, 102, 0.3)',
                  padding: '12px',
                  borderRadius: '15px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  justifyContent: 'center',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(37, 211, 102, 0.2)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(37, 211, 102, 0.1)'}
              >
                💚 WhatsApp
              </a>

              <a 
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this awesome event: ${event.title}`)}&url=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  color: '#fff',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  padding: '12px',
                  borderRadius: '15px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  justifyContent: 'center',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.05)'}
              >
                𝕏 Twitter / X
              </a>

              <a 
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'rgba(24, 119, 242, 0.1)',
                  color: '#1877F2',
                  border: '1px solid rgba(24, 119, 242, 0.3)',
                  padding: '12px',
                  borderRadius: '15px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  justifyContent: 'center',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(24, 119, 242, 0.2)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(24, 119, 242, 0.1)'}
              >
                💙 Facebook
              </a>

              <a 
                href={`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(`Check out this event: ${event.title}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  background: 'rgba(0, 136, 204, 0.1)',
                  color: '#0088cc',
                  border: '1px solid rgba(0, 136, 204, 0.3)',
                  padding: '12px',
                  borderRadius: '15px',
                  textDecoration: 'none',
                  fontWeight: 600,
                  fontSize: '14px',
                  justifyContent: 'center',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.target.style.background = 'rgba(0, 136, 204, 0.2)'}
                onMouseOut={(e) => e.target.style.background = 'rgba(0, 136, 204, 0.1)'}
              >
                ✈️ Telegram
              </a>
            </div>

            <div style={{
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '15px',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '10px'
            }}>
              <span style={{
                color: '#94a3b8',
                fontSize: '12px',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: '70%'
              }}>
                {window.location.href}
              </span>
              <button 
                onClick={handleCopyLink}
                style={{
                  background: '#0df',
                  color: '#000',
                  border: 'none',
                  padding: '6px 12px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '12px',
                  cursor: 'pointer'
                }}
              >
                Copy
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EventDetails;

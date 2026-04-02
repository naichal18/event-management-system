import React from 'react';
import { useNavigate } from 'react-router-dom';

const About = () => {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* 1. Top Banner */}
      <div className="about-banner" style={{
        position: 'relative',
        height: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: 'url("https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1920&q=80")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        textAlign: 'center',
        borderBottom: '1px solid rgba(0, 255, 255, 0.2)'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(11, 17, 32, 0.85)', zIndex: 1 }}></div>
        <div style={{ position: 'relative', zIndex: 2 }}>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            background: 'linear-gradient(to right, #00f2fe, #4facfe)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
            margin: '0 0 10px 0',
            letterSpacing: '1px'
          }}>
            ALL YOU NEED TO KNOW
          </h1>
          <h1 style={{
            fontSize: '3.5rem',
            fontWeight: 800,
            color: '#fff',
            margin: '0 0 20px 0'
          }}>ABOUT HARMONI</h1>
          <p style={{ color: '#cbd5e1', fontSize: '1.2rem' }}>
            Home <span style={{ margin: '0 10px', color: '#0df' }}>|</span> About Us
          </p>
        </div>
      </div>

      <div style={{ padding: '80px 50px', maxWidth: '1200px', margin: '0 auto', flex: 1, width: '100%' }}>
        
        {/* Mission & Vision */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2.5rem', color: '#fff', marginBottom: '15px' }}>No.1 Events Management</h2>
          <div style={{ height: '4px', width: '60px', background: 'linear-gradient(to right, #06b6d4, #3b82f6)', margin: '0 auto', borderRadius: '2px' }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px', marginBottom: '100px' }}>
          <div className="user-glass-card" style={{ padding: '40px' }}>
            <h3 style={{ fontSize: '1.8rem', color: '#0df', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>Our Mission</h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '1.1rem' }}>
              To seamlessly execute events that spark joy, foster connection, and create unforgettable memories for thousands. We strive to pioneer the ultimate cross-platform ecosystem where planners, vendors, and clients converge in perfect harmony.
            </p>
          </div>
          <div className="user-glass-card" style={{ padding: '40px' }}>
            <h3 style={{ fontSize: '1.8rem', color: '#0df', marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '10px' }}>Our Vision</h3>
            <p style={{ color: '#cbd5e1', lineHeight: 1.8, fontSize: '1.1rem' }}>
              Becoming the world's most trusted and automated event management network. We envision a future where complex gatherings, from massive festivals to intimate weddings, can be manifested directly through advanced digital infrastructure.
            </p>
          </div>
        </div>

        {/* 2. Why Choose Us */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '15px' }}>Why Choose Harmoni?</h2>
          <div style={{ height: '3px', width: '50px', background: '#0df', margin: '0 auto', borderRadius: '2px' }}></div>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '30px', marginBottom: '100px' }}>
          {[
            { icon: '⭐', title: 'Professional Team', text: 'Our team consists of highly skilled planners and designers.' },
            { icon: '💡', title: 'Creative Ideas', text: 'We bring innovative and unique concepts to every event.' },
            { icon: '🕒', title: '24/7 Support', text: 'We are always available to assist you anytime.' },
            { icon: '🤝', title: 'Trusted by Clients', text: 'Thousands of happy clients trust our services.' },
          ].map((item, idx) => (
            <div key={idx} className="user-glass-card feature-card" style={{ padding: '30px', textAlign: 'center' }}>
              <span className="feature-icon">{item.icon}</span>
              <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '10px' }}>{item.title}</h4>
              <p style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: '1.6' }}>{item.text}</p>
            </div>
          ))}
        </div>

        {/* 3. Our Services Section */}
        <div style={{ padding: '60px', background: 'rgba(255,255,255,0.02)', borderRadius: '20px', marginBottom: '100px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '15px' }}>Our Services</h2>
            <div style={{ height: '3px', width: '50px', background: '#0df', margin: '0 auto', borderRadius: '2px' }}></div>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '30px' }}>
            {[
              { icon: '💍', title: 'Wedding Planning', desc: 'Full-service execution for your dream wedding.' },
              { icon: '🏢', title: 'Corporate Events', desc: 'Professional conferences, galas, and keynotes.' },
              { icon: '🎂', title: 'Birthday Parties', desc: 'Memorable milestones spanning all ages.' },
              { icon: '🎸', title: 'Concert Management', desc: 'Large scale stages and technical operations.' },
              { icon: '🍽️', title: 'Catering Services', desc: 'Premium menus curated for heavy volumes.' },
              { icon: '✨', title: 'Venue Decoration', desc: 'Transforming empty halls into visual spectacles.' },
            ].map((srv, idx) => (
              <div key={idx} className="user-glass-card" style={{ padding: '25px', display: 'flex', gap: '15px', alignItems: 'center', transition: 'all 0.3s' }}>
                <span style={{ fontSize: '30px', background: 'rgba(0, 255, 255, 0.1)', padding: '15px', borderRadius: '12px' }}>{srv.icon}</span>
                <div>
                  <h4 style={{ color: '#fff', marginBottom: '5px' }}>{srv.title}</h4>
                  <p style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{srv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Our Team Section */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '15px' }}>Meet Our Team</h2>
          <div style={{ height: '3px', width: '50px', background: '#0df', margin: '0 auto', borderRadius: '2px' }}></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '50px', marginBottom: '100px', flexWrap: 'wrap' }}>
          {[
            { img: 'https://i.pravatar.cc/200?img=11', name: 'Alina Stark', role: 'Event Manager' },
            { img: 'https://i.pravatar.cc/200?img=12', name: 'Marcus Vane', role: 'Lead Designer' },
            { img: 'https://i.pravatar.cc/200?img=5', name: 'Sophia Chen', role: 'Network Coordinator' },
          ].map((member, idx) => (
            <div key={idx} className="user-glass-card feature-card" style={{ padding: '40px', textAlign: 'center', minWidth: '250px' }}>
              <img src={member.img} alt={member.name} style={{ width: '120px', height: '120px', borderRadius: '50%', border: '3px solid #0df', marginBottom: '20px', objectFit: 'cover' }} />
              <h3 style={{ color: '#fff', marginBottom: '5px' }}>{member.name}</h3>
              <p style={{ color: '#0df', fontSize: '0.9rem', fontWeight: '500' }}>{member.role}</p>
            </div>
          ))}
        </div>

        {/* 5. Stats Section */}
        <div className="user-glass-card" style={{ padding: '60px', marginBottom: '100px', background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1), rgba(15, 23, 42, 0.8))' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '15px' }}>Our Achievements</h2>
            <div style={{ height: '3px', width: '50px', background: '#0df', margin: '0 auto', borderRadius: '2px' }}></div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: '20px' }}>
            {[
              { val: '500+', label: 'Events Completed' },
              { val: '1000+', label: 'Happy Clients' },
              { val: '50+', label: 'Professional Team' },
              { val: '10+', label: 'Years Experience' },
            ].map((stat, idx) => (
              <div key={idx} style={{ textAlign: 'center' }}>
                <h3 style={{ fontSize: '3rem', color: '#fff', fontWeight: '800', marginBottom: '5px' }}>{stat.val}</h3>
                <p style={{ color: '#0df', fontSize: '1.1rem', fontWeight: '600', letterSpacing: '1px' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 6. Testimonial Section */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.2rem', color: '#fff', marginBottom: '15px' }}>What Our Clients Say</h2>
          <div style={{ height: '3px', width: '50px', background: '#0df', margin: '0 auto', borderRadius: '2px' }}></div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '100px' }}>
          {[
            { client: 'Eleanor J.', review: '"Harmoni completely transformed my wedding. Their venue decoration and strict scheduling ensured everything moved beautifully without any stress. Best team ever!"' },
            { client: 'David Harrison.', review: '"We hired Harmoni for our tech summit catering and logistics. They handled 5,000+ attendees flawlessly. Highly professional and their 24/7 support is real."' },
          ].map((t, idx) => (
            <div key={idx} className="user-glass-card" style={{ padding: '40px', position: 'relative' }}>
              <span style={{ position: 'absolute', top: '10px', right: '20px', fontSize: '60px', color: 'rgba(0, 255, 255, 0.1)' }}>"</span>
              <p style={{ color: '#cbd5e1', fontSize: '1.05rem', lineHeight: '1.7', fontStyle: 'italic', marginBottom: '25px', position: 'relative', zIndex: '2' }}>
                {t.review}
              </p>
              <h4 style={{ color: '#0df', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '15px' }}>— {t.client}</h4>
            </div>
          ))}
        </div>

        {/* 7. Call To Action */}
        <div className="user-glass-card" style={{ padding: '80px 40px', textAlign: 'center' }}>
            <h2 style={{ fontSize: '3rem', color: '#fff', marginBottom: '30px' }}>Ready to Plan Your Next Event?</h2>
            <button 
              className="user-gradient-btn" 
              style={{ fontSize: '1.2rem', padding: '18px 50px', borderRadius: '30px' }}
              onClick={() => navigate('/user/contact')}
            >
              Contact Us
            </button>
        </div>

      </div>
    </div>
  );
};

export default About;

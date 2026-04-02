import React from 'react';

const SearchBar = ({ value, onChange, placeholder }) => {
  return (
    <div style={{
      position: 'relative',
      maxWidth: '600px',
      margin: '0 auto 40px',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div style={{
        position: 'absolute',
        left: '20px',
        color: '#94a3b8',
        display: 'flex',
        alignItems: 'center'
      }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || "Search events by title or location..."}
        style={{
          width: '100%',
          padding: '16px 20px 16px 60px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '20px',
          color: '#fff',
          fontSize: '16px',
          outline: 'none',
          transition: 'all 0.3s ease',
          backdropFilter: 'blur(10px)',
          fontWeight: '500',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)'
        }}
        onFocus={(e) => {
          e.target.style.border = '1px solid rgba(0, 255, 255, 0.4)';
          e.target.style.boxShadow = '0 0 20px rgba(0, 255, 255, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.border = '1px solid rgba(255, 255, 255, 0.1)';
          e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.2)';
        }}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          style={{
            position: 'absolute',
            right: '20px',
            background: 'none',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            fontSize: '18px',
            display: 'flex',
            alignItems: 'center',
            padding: '5px',
            borderRadius: '50%',
            transition: 'color 0.2s'
          }}
          onMouseOver={(e) => e.target.style.color = '#ef4444'}
          onMouseOut={(e) => e.target.style.color = '#64748b'}
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default SearchBar;

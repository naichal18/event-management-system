import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const { showToast } = useToast();
  
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('User');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (isRegister) {
      const result = await register({ name, email, password });
      if (result.success) {
        showToast('Registration successful!', 'success');
        navigate('/user/home');
      } else {
        showToast(result.message || 'Registration failed', 'error');
      }
    } else {
      const result = await login(email, password);
      if (result.success && result.user) {
        showToast(`Welcome back, ${result.user.name}!`, 'success');
        if (result.user.role === 'Admin') {
          navigate('/admin');
        } else {
          navigate('/user/home');
        }
      } else if (!result.success) {
        showToast(result.message || 'Login failed', 'error');
      }
    }
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-overlay"></div>
      <div className="login-box">
        <div className="login-header">
          <svg className="lock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0110 0v4"></path>
          </svg>
          <h2>{isRegister ? 'REGISTER' : 'LOGIN'}</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {!isRegister && (
            <div className="form-group">
              <label>Login As</label>
              <div className="select-wrapper">
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)}
                  className="form-input select-input"
                >
                  <option value="Admin">Admin</option>
                  <option value="User">User</option>
                </select>
              </div>
            </div>
          )}

          {isRegister && (
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                required 
                className="form-input"
              />
            </div>
          )}

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required 
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required 
              className="form-input"
            />
          </div>

          <button type="submit" disabled={loading} className="login-button">
            {loading ? 'Processing...' : (isRegister ? 'Register' : 'Log in')}
          </button>
        </form>

        <div className="login-footer" style={{ marginTop: '20px', textAlign: 'center' }}>
          <p style={{ color: '#fff', fontSize: '14px' }}>
            {isRegister ? 'Already have an account?' : "Don't have an account?"} 
            <button 
              onClick={() => setIsRegister(!isRegister)} 
              style={{ background: 'none', border: 'none', color: '#00d2ff', cursor: 'pointer', marginLeft: '5px', fontWeight: 'bold' }}
            >
              {isRegister ? 'Login' : 'Register'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { API_ENDPOINTS } from '../../utils/api';
import './SigninCard.css';
import { useNavigate } from 'react-router-dom';

const SigninCard = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (newEmail === '') {
      setEmailError('');
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(newEmail)) {
      setEmailError('Please enter a valid email address.');
    } else {
      setEmailError('');
    }
  };

  const isFormValid = email && password && !emailError;

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      console.log('Login URL:', API_ENDPOINTS.LOGIN);
      const response = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('user', JSON.stringify(data.user));
        navigate('/account-settings');
      } else {
        // Handle login error
      }
    } catch {
      // Handle network error
    }
  };

  return (
    <div className="signin-card">
      <div className="signin-text">
        <h1 className="signin-title">Signin to your PopX account</h1>
        <p className="signin-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
      <form className="signin-form">
        <label className="input-label">
          Email Address
          <input
            type="email"
            className={`input-field ${emailError ? 'input-error' : ''}`}
            placeholder="Enter email address"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </label>
        <label className="input-label">
          Password
          <div className="password-wrapper">
            <input
              key={showPassword ? 'text-input' : 'password-input'}
              type={showPassword ? 'text' : 'password'}
              className="input-field"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
            />
            {password && (
              <span
                className="eye-icon"
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={0}
                role="button"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  // Eye open SVG
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 10C1 10 4.5 4 10 4C15.5 4 19 10 19 10C19 10 15.5 16 10 16C4.5 16 1 10 1 10Z" stroke="#6C47FF" strokeWidth="2"/>
                    <circle cx="10" cy="10" r="3" stroke="#6C47FF" strokeWidth="2"/>
                  </svg>
                ) : (
                  // Eye closed SVG
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M1 10C1 10 4.5 4 10 4C15.5 4 19 10 19 10C19 10 15.5 16 10 16C4.5 16 1 10 1 10Z" stroke="#6C47FF" strokeWidth="2"/>
                    <path d="M4 4L16 16" stroke="#6C47FF" strokeWidth="2"/>
                  </svg>
                )}
              </span>
            )}
          </div>
        </label>
        <button
          className={`login-btn ${isFormValid ? 'login-btn-active' : ''}`}
          disabled={!isFormValid}
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default SigninCard; 
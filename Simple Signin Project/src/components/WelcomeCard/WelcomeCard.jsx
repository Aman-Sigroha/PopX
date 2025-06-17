import React from 'react';
import { useNavigate } from 'react-router-dom';
import './WelcomeCard.css';

const WelcomeCard = () => {
  const navigate = useNavigate();
  return (
    <div className="welcome-card">
      <div className="welcome-text">
        <h1 className="welcome-title">Welcome to PopX</h1>
        <p className="welcome-subtitle">Lorem ipsum dolor sit amet, consectetur adipiscing elit,</p>
      </div>
      <button className="primary-btn" onClick={() => navigate('/register')}>Create Account</button>
      <button className="secondary-btn" onClick={() => navigate('/signin')}>Already Registered? Login</button>
    </div>
  );
};

export default WelcomeCard;

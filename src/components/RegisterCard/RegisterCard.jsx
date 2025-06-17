import React, { useState } from 'react';
import './RegisterCard.css';

const RegisterCard = () => {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isAgency, setIsAgency] = useState(null); // Use null to indicate no selection yet

  const handlePhoneNumberChange = (e) => {
    const newNumber = e.target.value;
    setPhoneNumber(newNumber);
    // Basic phone number validation (e.g., 10 digits, or adjust regex for international)
    if (newNumber === '') {
      setPhoneNumberError('');
    } else if (!/^\d{10}$/.test(newNumber)) { // Example: exactly 10 digits
      setPhoneNumberError('Please enter a valid 10-digit phone number.');
    } else {
      setPhoneNumberError('');
    }
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

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    let errors = [];

    if (newPassword.length < 8) {
      errors.push('Must be at least 8 characters.');
    }
    if (!/[A-Z]/.test(newPassword)) {
      errors.push('Must contain a capital letter.');
    }
    if (!/[a-z]/.test(newPassword)) {
      errors.push('Must contain a small letter.');
    }
    if (!/[^a-zA-Z0-9]/.test(newPassword)) {
      errors.push('Must contain a special character.');
    }

    if (errors.length > 0) {
      setPasswordError(errors.join(' ')); // Join multiple errors with a space
    } else {
      setPasswordError('');
    }
  };

  const isFormValid = (
    fullName.trim() !== '' &&
    phoneNumber.trim() !== '' &&
    !phoneNumberError &&
    email.trim() !== '' &&
    !emailError &&
    password.trim() !== '' &&
    !passwordError &&
    isAgency !== null
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    try {
      const response = await fetch('https://popx-server.onrender.com/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullname: fullName,
          phonenumber: phoneNumber,
          email: email,
          password: password,
          companyname: companyName,
          isagency: isAgency,
        }),
      });

      if (response.ok) {
        // Handle successful registration
        console.log('Registration successful');
      } else {
        // Handle registration error
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <div className="register-card">
      <div className="register-text">
        <h1 className="register-title">Create your PopX account</h1>
      </div>
      <form className="register-form" onSubmit={handleSubmit}>
        <label className="input-label">
          Full Name*
          <input
            type="text"
            className="input-field"
            placeholder="Enter Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />
        </label>
        <label className="input-label">
          Phone Number*
          <input
            type="tel"
            className={`input-field ${phoneNumberError ? 'input-error' : ''}`}
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={handlePhoneNumberChange}
          />
          {phoneNumberError && <p className="error-message">{phoneNumberError}</p>}
        </label>
        <label className="input-label">
          Email Address*
          <input
            type="email"
            className={`input-field ${emailError ? 'input-error' : ''}`}
            placeholder="Enter Email Address"
            value={email}
            onChange={handleEmailChange}
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </label>
        <label className="input-label">
          Password*
          <input
            type="password"
            className={`input-field ${passwordError ? 'input-error' : ''}`}
            placeholder="Enter Password"
            value={password}
            onChange={handlePasswordChange}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </label>
        <label className="input-label">
          Company Name
          <input
            type="text"
            className="input-field"
            placeholder="Enter Company Name"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </label>

        <div className="agency-radio-group">
          <p>Are you an Agency?*</p>
          <label>
            <input
              type="radio"
              name="isAgency"
              value="yes"
              checked={isAgency === true}
              onChange={() => setIsAgency(true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="isAgency"
              value="no"
              checked={isAgency === false}
              onChange={() => setIsAgency(false)}
            />
            No
          </label>
        </div>

        <button
          className={`create-account-btn ${isFormValid ? 'create-account-btn-active' : ''}`}
          disabled={!isFormValid}
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default RegisterCard; 
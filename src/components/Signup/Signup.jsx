import React, { useState } from 'react';
import axios from 'axios';
import './Signup.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/signup', { email, password })
      .then(response => {
        console.log('Sign Up Successful:', response.data);
        alert('Sign Up Successful!'); // Show success popup
      })
      .catch(error => {
        console.error('Sign Up Error:', error);
      });
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSignUp}>
        <h1>Sign Up</h1>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;

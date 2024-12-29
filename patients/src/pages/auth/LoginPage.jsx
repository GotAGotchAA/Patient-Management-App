import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import { Link } from 'react-router-dom'; // Import Link for navigation
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      // Step 1: Authenticate user and get the token
      const loginResponse = await axios.post(
        'http://localhost:8089/auth/login',
        { email, password },
        { withCredentials: true } // Ensure credentials are sent with the request
      );

      const token = loginResponse.data.token;
      console.log('Token:', token);
      localStorage.setItem('jwtToken', token); // Store token in localStorage

      // Step 2: Fetch user data by email to get the user ID
      const userResponse = await axios.get(`http://localhost:8089/users/email/${email}`, {
        headers: { Authorization: `Bearer ${token}` }, // Include the token in the request header
      });

      const userId = userResponse.data.id;
      console.log('User ID:', userId);
      localStorage.setItem('userId', userId); // Store user ID in localStorage

      // Step 3: Redirect to the dashboard
      navigate('/patients'); // Navigate to the dashboard page
    } catch (err) {
      console.error('Login or user data fetch error:', err);
      setError('Invalid credentials or server error');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <button type="submit" className="login-button">Login</button>
      </form>
      
      {/* Link to the Register page */}
      <p className="register-link">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;

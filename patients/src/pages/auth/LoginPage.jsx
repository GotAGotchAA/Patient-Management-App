import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await axios.post('http://localhost:8089/auth/login', {
        email,
        password,
      }, {
        withCredentials: true, // Ensure credentials are sent with the request
      });

      // Handle successful login
      const token = response.data.token;
      console.log('Login response:', response.data);
      localStorage.setItem('jwtToken', token); // Store token in localStorage

      // Fetch user details after login
      const userResponse = await axios.get('http://localhost:8089/users/me', {
        headers: {
          Authorization: `Bearer ${token}` // Add JWT token in the Authorization header
        }
      });

      const userId = userResponse.data.id; // Assuming the user ID is in the 'id' field
      console.log('User Details:', userResponse.data);
      localStorage.setItem('userId', userId); // Store the user ID if needed

      // Redirect to the dashboard after successful login
      navigate('/patients'); // Navigate to the dashboard page

    } catch (err) {
      setError('Invalid credentials or server error');
      console.error(err);
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

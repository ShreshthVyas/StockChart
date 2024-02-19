import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/login', {
        username,
        password,
      });
      // If login successful, redirect to the /home route
      navigate('/home', { replace: true });
    } catch (error) {
      if (error.response) {
        setError(error.response.data.error);
      } else if (error.request) {
        setError('No response received from the server');
      } else {
        setError(error.message);
      }
    }
  };

  return (
    <div className="bg-dark min-vh-100 d-flex justify-content-center align-items-center">
      <div className="p-5 rounded shadow-lg" style={{ width: '400px', height: '450px', backgroundColor: '#4076FA' }}>
        <h2 className="text-center text-white mb-4">Log In</h2>
        {error && <p className="text-danger mb-4">{`Login failed: ${error}`}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label text-white">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label text-white">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-center"> {/* Center the button */}
            <button type="submit" className="btn btn-warning">Login</button>
          </div>
        </form>
        <p className="mt-4 text-center">
          New user? <Link to="/register" className="text-white">Register here</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

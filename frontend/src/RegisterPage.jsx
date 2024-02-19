import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/register', {
        username,
        email,
        password,
      });
      setMessage(response.data.message);
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
        <h2 className="text-center mb-4 text-white">Register</h2>
        {error && <p className="text-danger mb-4">{`Registration failed: ${error}`}</p>}
        {message && (
          <>
            <p>{message}</p>
            <p>Successfully registered! Move to <Link to="/login" className="text-white font-bold hover:underline">Login</Link></p>
          </>
        )}
        <form onSubmit={handleRegister}>
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
            <label htmlFor="email" className="form-label text-white">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" className="btn btn-warning btn-block">Register</button>
        </form>
        <p className="mt-4 mb-auto text-center">
          Already registered ? <Link to="/login" className="text-white">LogIn here</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

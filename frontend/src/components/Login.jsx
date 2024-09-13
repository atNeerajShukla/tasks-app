import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true); 
    const data = await loginUser(username, password);
    setLoading(false); 

    if (data.token) {
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setMessage('Login successful!');
      if (data.isAdmin) navigate('/admin-home');
      else navigate('/user-home');
    } else {
      setToken(null);
      setMessage(data.message || 'Login failed.');
    }
  };

  return (
    <div className="bg-white p-6 border rounded-lg w-full">
      <h2 className="mb-4 font-bold text-gray-800 text-xl">Login</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="block border-gray-300 focus:border-indigo-500 shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="block border-gray-300 focus:border-indigo-500 shadow-sm mt-1 px-3 py-2 border rounded-md w-full focus:ring-indigo-500"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-500'
          } px-4 py-2 rounded-md w-full font-bold text-white transition-colors`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      {message && <p className="mt-4 text-green-600 text-sm">{message}</p>}
    </div>
  );
};

export default Login;

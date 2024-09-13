import React, { useState } from 'react';
import { registerUser } from '../services/authService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false); 

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true); 
    const data = await registerUser(username, password, isAdmin);
    setLoading(false); 

    if (data.message === 'User registered successfully') {
      setMessage('Registration successful! Please Login to continue...');
      setUsername('');
      setPassword('');
      setIsAdmin(false);
    } else {
      setMessage(data.message || 'Registration failed.');
    }
  };

  return (
    <div className="bg-white p-6 border rounded-lg w-full">
      <h2 className="mb-4 font-bold text-gray-800 text-xl">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
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
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
            className="border-gray-300 rounded w-4 h-4 text-indigo-600 focus:ring-indigo-500"
          />
          <label className="ml-2 text-gray-700">Register as Admin</label>
        </div>
        <button
          type="submit"
          disabled={loading} 
          className={`${
            loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-500'
          } px-4 py-2 rounded-md w-full font-bold text-white transition-colors`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
      {message && <p className="mt-4 text-green-600 text-sm">{message}</p>}
    </div>
  );
};

export default Register;

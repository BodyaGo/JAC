import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Правильний іменований експорт

function Login() {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log('Login button clicked'); // Debug log
    try {
      const res = await axios.post('http://localhost:3001/api/login', { phone, password });
      console.log('Login response:', res.data); // Debug log
      const token = res.data.token;
      localStorage.setItem('token', token);
      const decodedToken = jwtDecode(token); // Декодуємо токен
      localStorage.setItem('role', decodedToken.role); // Зберігаємо роль користувача
      history.push('/profile');
    } catch (err) {
      console.error('Login error:', err); // Debug log
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Phone</label>
            <input
              type="text"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-3 px-6 rounded-full hover:bg-blue-600 transition duration-300 shadow-md transform hover:scale-105"
            >
              Login
            </button>
            {error && <div className="text-red-500 mt-4">{error}</div>}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;

import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const role = localStorage.getItem('role'); // Get user role from localStorage

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetch
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3001/api/profile', { headers: { Authorization: `Bearer ${token}` } });
        setProfile(res.data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
        setError('Failed to load profile. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [location]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-300 h-32 w-32"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-600">{error}</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-gray-700">Profile not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-lg mt-12">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Profile</h1>
      <div className="bg-gray-50 p-6 rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row items-center mb-6">
          <img
            src={profile.imageUrl || 'https://via.placeholder.com/150'}
            alt="Profile"
            className="w-32 h-32 rounded-full shadow-lg md:mr-6 mb-4 md:mb-0"
          />
          <div className="text-lg text-gray-700">
            <p className="mb-2"><strong>Name:</strong> {profile.name}</p>
            <p className="mb-2"><strong>Phone:</strong> {profile.phone}</p>
            <p><strong>Role:</strong> {profile.role}</p>
          </div>
        </div>
        <div className="flex justify-center space-x-4">
          <Link to="/edit-profile">
            <button className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300">Edit Profile</button>
          </Link>
          {role === 'admin' && (
            <Link to="/create-detail">
              <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300">Add Part</button>
            </Link>
          )}
          {/* Debugging output */}
          {console.log('Role:', role)}
        </div>
      </div>
    </div>
  );
}

export default Profile;

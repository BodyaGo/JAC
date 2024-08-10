import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Navbar() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role'); // Store the user role
  const history = useHistory();
  const [searchVisible, setSearchVisible] = useState(false);
  const [categoryMenuVisible, setCategoryMenuVisible] = useState(false);
  const [profileMenuVisible, setProfileMenuVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role'); // Remove user role on logout
    history.push('/login');
  };

  const toggleSearchBar = () => {
    setSearchVisible(!searchVisible);
  };

  const toggleCategoryMenu = () => {
    setCategoryMenuVisible(!categoryMenuVisible);
  };

  const toggleProfileMenu = () => {
    setProfileMenuVisible(!profileMenuVisible);
  };

  return (
    <header className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo and Main Navigation */}
        <div className="flex items-center space-x-4">
          <h1 className="text-2xl font-bold">
            <Link to="/" className="text-white hover:text-gray-400">JAC Auto Parts</Link>
          </h1>
          <nav className="hidden md:flex space-x-4">
            <div className="relative">
              <button onClick={toggleCategoryMenu} className="text-gray-300 hover:text-white focus:outline-none">
                Categories
                <svg className="w-5 h-5 inline-block ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {categoryMenuVisible && (
                <div className="absolute top-full mt-2 w-48 bg-white text-gray-700 shadow-lg rounded-lg">
                  <Link to="/category/engine" className="block px-4 py-2 hover:bg-gray-100">Engine Parts</Link>
                  <Link to="/category/brakes" className="block px-4 py-2 hover:bg-gray-100">Brakes</Link>
                  <Link to="/category/transmission" className="block px-4 py-2 hover:bg-gray-100">Transmission</Link>
                  <Link to="/category/suspension" className="block px-4 py-2 hover:bg-gray-100">Suspension</Link>
                </div>
              )}
            </div>
            <Link to="/products" className="text-gray-300 hover:text-white">Products</Link>
            <Link to="/contact" className="text-gray-300 hover:text-white">Contact</Link>
          </nav>
        </div>

        {/* Search Bar */}
        <div className={`relative flex-1 mx-4 ${searchVisible ? 'block' : 'hidden'} md:block`}>
          <input type="search" placeholder="Search products..." className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          <div className="absolute top-full left-0 w-full bg-white border border-gray-300 shadow-lg hidden"></div>
        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          <button onClick={toggleSearchBar} className="text-gray-300 hover:text-white md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.293 17.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414zM6 10a4 4 0 11-8 0 4 4 0 018 0zM16 10a6 6 0 11-12 0 6 6 0 0112 0z"></path>
            </svg>
          </button>
          {token ? (
            <>
              {role === 'admin' && <Link to="/create-detail" className="text-gray-300 hover:text-white">Add Part</Link>}
              <Link to="/profile" className="text-gray-300 hover:text-white">Profile</Link>
              <Link to="/cart" className="text-gray-300 hover:text-white">Cart</Link>
              <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
              <Link to="/register" className="text-gray-300 hover:text-white">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;

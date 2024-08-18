import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

function Navbar() {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  const history = useHistory();
  const [searchVisible, setSearchVisible] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    history.push('/login');
  };

  const toggleSearchBar = () => {
    setSearchVisible(!searchVisible);
  };

  return (
    <header className="bg-gray-900 text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Логотип та основна навігація */}
        <div className="flex items-center space-x-6">
          <h1 className="text-2xl font-bold tracking-wide">
            <Link to="/" className="text-white hover:text-indigo-400 transition duration-300">
              JAC Auto Parts
            </Link>
          </h1>
          <nav className="hidden md:flex space-x-4">
            <Link to="/contact" className="text-gray-300 hover:text-white transition duration-300">
              Контакти
            </Link>
          </nav>
        </div>

        {/* Пошукова панель */}
        <div className={`relative flex-1 mx-4 ${searchVisible ? 'block' : 'hidden'} md:block`}>
          <input
            type="search"
            placeholder="Пошук товарів..."
            className="w-full p-2 bg-gray-800 text-gray-100 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300"
          />
        </div>

        {/* Дії користувача */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleSearchBar}
            className="text-gray-300 hover:text-white md:hidden focus:outline-none"
            aria-label="Відкрити пошук"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          {token ? (
            <>
              {role === 'admin' && (
                <Link to="/create-detail" className="text-gray-300 hover:text-white transition duration-300">
                  Додати деталь
                </Link>
              )}
              <Link to="/profile" className="text-gray-300 hover:text-white transition duration-300">
                Профіль
              </Link>
              <Link to="/cart" className="text-gray-300 hover:text-white transition duration-300">
                Кошик
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition duration-300"
                aria-label="Вийти"
              >
                Вийти
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-300 hover:text-white transition duration-300">
                Увійти
              </Link>
              <Link to="/register" className="text-gray-300 hover:text-white transition duration-300">
                Реєстрація
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;

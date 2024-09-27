import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-indigo-800 to-purple-600 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold text-white">
          Investr
        </Link>
        <nav>
          {user ? (
            <div className="space-x-4">
              <Link to="/dashboard" className="text-white hover:text-indigo-200 transition duration-300">
                Dashboard
              </Link>
              <Link to="/profile" className="text-white hover:text-indigo-200 transition duration-300">
                Profile
              </Link>
              <button
                onClick={logout}
                className="px-4 py-2 bg-white text-indigo-600 font-semibold rounded-full hover:bg-indigo-100 transition duration-300"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="space-x-4">
              <Link
                to="/login"
                className="text-white hover:text-indigo-200 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 bg-white text-indigo-600 font-semibold rounded-full hover:bg-indigo-100 transition duration-300"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
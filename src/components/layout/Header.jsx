import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-gray-800 text-white shadow-lg">
      <h1 className="text-2xl font-bold">Khanamandu</h1>
      <nav className="space-x-4">
        <Link to="/main" className="hover:text-yellow-400">Home</Link>
        <Link to="/about" className="hover:text-yellow-400">About us</Link>
        <Link to="/contact" className="hover:text-yellow-400">Contact us</Link>
        <Link to="/profile" className="hover:text-yellow-400">Profile</Link>
      </nav>
    </header>
  );
};

export default Header;
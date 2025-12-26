
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Início', path: '/' },
    { name: 'Notícias', path: '/noticias' },
    { name: 'Sobre', path: '/sobre' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`transition-colors duration-200 font-medium ${
                  isActive(link.path)
                    ? 'text-indigo-700 border-b-2 border-indigo-700 h-14 flex items-center'
                    : 'text-gray-600 hover:text-indigo-600 h-14 flex items-center'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-label="Toggle navigation menu"
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600 focus:outline-none p-2"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {isOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l18 18"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-indigo-50 px-4 pt-2 pb-4 space-y-2 border-t border-indigo-100">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-2 rounded-md font-medium ${
                isActive(link.path)
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-700 hover:bg-indigo-100'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

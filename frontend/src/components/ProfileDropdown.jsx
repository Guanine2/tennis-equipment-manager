import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilePlaceholder from '../assets/ProfilePlaceholder.jpeg';

export default function ProfileDropdown({ showDropdown, setShowDropdown }) {
  const navigate = useNavigate();

  return (
    <div className="absolute top-4 right-4 z-50">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300 focus:outline-none focus:ring"
      >
        <img
          src={ProfilePlaceholder}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </button>

      {showDropdown && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg text-sm">
          <button
            onClick={() => navigate('/signin')}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate('/register')}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Register
          </button>
        </div>
      )}
    </div>
  );
}

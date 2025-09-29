import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from './ProfileDropdown';

export default function Taskbar() {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate()
  return (
    <nav className="bg-white shadow relative h-16">
      {/* Wrapper container for positioning */}
      <div className="container flex mx-auto h-full relative">
        {/* Centered UL */}
        <ul className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex space-x-6 list-none">
          <li><button  onClick={() => navigate('/')}><p className='text-3xl font-bold'>🎾 Tennis Equipment Manager</p></button> </li>
        </ul>

        {/* Top-right dropdown */}
        <div className="absolute right-1">
          <ProfileDropdown
            showDropdown={showDropdown}
            setShowDropdown={setShowDropdown}
          />
        </div>
      </div>
    </nav>
  );
}

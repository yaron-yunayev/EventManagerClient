// src/layout/header/topnavbar/Logo.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../../../../assets/images/EventX_Logo.png';

export default function Logo() {
  return (
    <Link to="/" className="flex items-center space-x-2">
      <img 
        src={logoImage} 
        alt="EventX Logo"
        className="h-14 w-auto object-contain cursor-pointer transition-colors duration-300"
      />
    </Link>
  );
}

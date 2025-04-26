// src/layout/header/topnavbar/RightNavBar.jsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";
import LoginButton from "./Login";
import RegisterButton from "./Register";
import SuppliersMenu from "./menu/SuppliersMenu";
import MobileMenu from "./menu/MobileMenu";
import DesktopSideMenu from "./menu/DesktopSideMenu";
import MobileSuppliersMenuOverlay from "./menu/MobileSuppliersMenuOverlay";
import { useUser } from "../../../../users/providers/UserProvider";

export default function RightNavBar() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [isSuppliersOpen, setIsSuppliersOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
        setIsSuppliersOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative flex items-center" ref={menuRef}>
      {/* Desktop */}
      <div className="hidden md:flex items-center gap-6 font-elegant text-lg tracking-wide
                      text-[#023E8A] dark:text-white transition-colors duration-300">
        <SuppliersMenu />
        <Link to="/" className="hover:text-[#00B4D8] dark:hover:text-[#90E0EF] transition-colors">
          Home
        </Link>
        <Link to="/about" className="hover:text-[#00B4D8] dark:hover:text-[#90E0EF] transition-colors">
          About
        </Link>

        {!user && (
          <>
            <LoginButton />
            <RegisterButton />
          </>
        )}

        {user && (
          <button
            onClick={() => setIsOpen(true)}
            className="ml-2 text-[#023E8A] dark:text-white hover:text-[#00B4D8] dark:hover:text-[#90E0EF] transition-colors"
          >
            {/* hamburger icon */}
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
      </div>

      {/* Mobile */}
      <div className="ml-4 z-50 flex items-center gap-3 md:hidden">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="text-[#023E8A] dark:text-white hover:text-[#00B4D8] dark:hover:text-[#90E0EF] transition-colors"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        {!isSuppliersOpen && (
          <button
            onClick={() => setIsSuppliersOpen(true)}
            className="text-[#023E8A] dark:text-white hover:text-[#00B4D8] dark:hover:text-[#90E0EF] transition-colors"
          >
            <FiShoppingBag className="w-7 h-7" />
          </button>
        )}
      </div>

      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      <MobileSuppliersMenuOverlay isOpen={isSuppliersOpen} setIsOpen={setIsSuppliersOpen} />
      {user && <DesktopSideMenu isOpen={isOpen} setIsOpen={setIsOpen} />}
    </div>
  );
}

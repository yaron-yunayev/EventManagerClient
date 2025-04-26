// src/layout/home/MobileMenu.jsx
import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../../../../users/providers/UserProvider";
import { useTheme } from "../../../../../providers/ThemeProvider";
import {
  FiPlus,
  FiUser,
  FiUsers,
  FiLogOut,
  FiTool,
  FiSun,
  FiMoon,
} from "react-icons/fi";

export default function MobileMenu({ isOpen, setIsOpen }) {
  const { user, setUser, setToken } = useUser();
  const { mode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  const handleNavigation = (path) => {
    setTimeout(() => {
      navigate(path);
      setIsOpen(false);
    }, 100);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.info("👋 Logged out successfully.");
    setTimeout(() => {
      navigate("/");
      setIsOpen(false);
    }, 100);
  };

  return (
    <div
      className={`
        fixed inset-0 z-[999]
        bg-white dark:bg-gray-900
        text-[#023E8A] dark:text-gray-200
        font-elegant md:hidden
        flex flex-col h-screen overflow-hidden
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      {/* Close button */}
      <div className="flex justify-end p-4">
        <button
          onClick={() => setIsOpen(false)}
          className="text-3xl font-bold hover:text-[#00B4D8] dark:hover:text-[#90E0EF] transition"
        >
          ✕
        </button>
      </div>

      {/* Menu items */}
      <div ref={menuRef} className="flex-1 overflow-y-auto px-6 pb-10">
        <nav className="flex flex-col items-center space-y-6 text-lg text-center">
          <button
            onClick={() => handleNavigation("/")}
            className="hover:text-[#00B4D8] dark:hover:text-[#90E0EF] transition"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation("/about")}
            className="hover:text-[#00B4D8] dark:hover:text-[#90E0EF] transition"
          >
            About
          </button>

          {user?.isEventManager && (
            <>
              <button
                onClick={() => handleNavigation("/create-event")}
                className="flex items-center gap-2 hover:text-[#00B4D8] dark:hover:text-[#90E0EF] transition"
              >
                <FiPlus /> Create Event
              </button>
              <button
                onClick={() => handleNavigation("/my-events")}
                className="flex items-center gap-2 hover:text-[#00B4D8] dark:hover:text-[#90E0EF] transition"
              >
                <FiUsers /> My Events
              </button>
              <button
                onClick={() => handleNavigation("/create-supplier")}
                className="flex items-center gap-2 hover:text-[#00B4D8] dark:hover:text-[#90E0EF] transition"
              >
                <FiPlus /> Add Supplier
              </button>
              <button
                onClick={() => handleNavigation("/assign-supplier")}
                className="flex items-center gap-2 hover:text-[#00B4D8] dark:hover:text-[#90E0EF] transition"
              >
                <FiTool /> Assign Suppliers
              </button>
            </>
          )}

          {user ? (
            <>
              {/* Profile */}
              <button
                onClick={() => handleNavigation("/user-info")}
                className={`
                  w-full flex items-center justify-center gap-2
                  px-4 py-3 rounded-lg font-semibold shadow-md
                  bg-gradient-to-r from-[#00B4D8] to-[#0077B6] text-white
                  dark:from-[#90E0EF] dark:to-[#023E8A] dark:text-gray-900
                  hover:brightness-110 transition duration-200 transform hover:scale-105
                `}
              >
                <FiUser /> My Profile
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className={`
                  w-full flex items-center justify-center gap-2
                  px-4 py-3 rounded-lg font-semibold shadow-md
                  bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white
                  dark:from-[#90E0EF] dark:to-[#CAF0F8] dark:text-gray-900
                  hover:brightness-110 transition duration-200 transform hover:scale-105
                `}
              >
                {mode === "dark" ? <FiSun /> : <FiMoon />}
                {mode === "dark" ? "Light Mode" : "Dark Mode"}
              </button>

              {/* Logout */}
              <button
                onClick={handleLogout}
                className={`
                  w-full flex items-center justify-center gap-2
                  px-4 py-3 rounded-lg font-semibold shadow-md
                  bg-gradient-to-r from-red-500 to-red-600 text-white
                  dark:from-red-600 dark:to-red-700 dark:text-gray-100
                  hover:brightness-110 transition duration-200 transform hover:scale-105
                `}
              >
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <>
              {/* Login */}
              <button
                onClick={() => handleNavigation("/login")}
                className={`
                  w-full flex items-center justify-center gap-2
                  px-4 py-3 rounded-lg font-semibold shadow-md
                  bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white
                  dark:from-[#90E0EF] dark:to-[#023E8A] dark:text-gray-900
                  hover:brightness-110 transition duration-200 transform hover:scale-105
                `}
              >
                Login
              </button>

              {/* Sign Up */}
              <button
                onClick={() => handleNavigation("/signup")}
                className={`
                  w-full flex items-center justify-center gap-2
                  px-4 py-3 rounded-lg font-semibold shadow-md
                  bg-gradient-to-r from-[#90E0EF] to-[#0077B6] text-white
                  dark:from-[#023E8A] dark:to-[#0077B6] dark:text-gray-100
                  hover:brightness-110 transition duration-200 transform hover:scale-105
                `}
              >
                Sign Up
              </button>

              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                className={`
                  w-full flex items-center justify-center gap-2
                  px-4 py-3 rounded-lg font-semibold shadow-md
                  bg-gradient-to-r from-[#0077B6] to-[#00B4D8] text-white
                  dark:from-[#90E0EF] dark:to-[#CAF0F8] dark:text-gray-900
                  hover:brightness-110 transition duration-200 transform hover:scale-105
                `}
              >
                {mode === "dark" ? <FiSun /> : <FiMoon />}
                {mode === "dark" ? "Light Mode" : "Dark Mode"}
              </button>
            </>
          )}
        </nav>
      </div>
    </div>
  );
}

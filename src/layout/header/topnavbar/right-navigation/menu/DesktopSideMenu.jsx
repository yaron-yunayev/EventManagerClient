// src/layout/menu/DesktopSideMenu.jsx
import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  FiPlus,
  FiUser,
  FiUsers,
  FiLogOut,
  FiTool,
  FiSun,
  FiMoon,
} from "react-icons/fi";
import { useUser } from "../../../../../users/providers/UserProvider";
import { useTheme } from "../../../../../providers/ThemeProvider";

export default function DesktopSideMenu({ isOpen, setIsOpen }) {
  const { user, setUser, setToken } = useUser();
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const { mode, toggleTheme } = useTheme();

  // סגירת התפריט בלחיצה מחוץ למרחב שלו
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsOpen(false);
    toast.info("👋 Logged out successfully.");
    navigate("/");
  };

  if (!user) return null;

  return (
    <div
      ref={menuRef}
      className={`
        fixed top-0 right-0 h-full w-72 bg-white dark:bg-gray-900
        text-[#023E8A] dark:text-white font-elegant flex flex-col space-y-4
        p-6 text-lg font-semibold shadow-lg z-40
        transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
    >
      <h2 className="text-2xl font-bold mb-6 border-b-2 border-[#0077B6] pb-2 uppercase tracking-wide">
        Event Menu
      </h2>

      {user.isEventManager && (
        <>
          <button onClick={() => handleNavigation("/create-event")} className="flex items-center gap-3 hover:text-[#00B4D8] transition">
            <FiPlus /> Create Event
          </button>
          <button onClick={() => handleNavigation("/my-events")} className="flex items-center gap-3 hover:text-[#00B4D8] transition">
            <FiUsers /> My Events
          </button>
          <button onClick={() => handleNavigation("/create-supplier")} className="flex items-center gap-3 hover:text-[#00B4D8] transition">
            <FiPlus /> Add Supplier
          </button>
          <button onClick={() => handleNavigation("/assign-supplier")} className="flex items-center gap-3 hover:text-[#00B4D8] transition">
            <FiTool /> Assign Suppliers
          </button>
        </>
      )}

      <button onClick={() => handleNavigation("/user-info")} className="flex items-center gap-3 hover:text-[#00B4D8] transition">
        <FiUser /> My Profile
      </button>

      <button
        onClick={toggleTheme}
        className="mt-2 flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold
                   bg-[#0077B6] hover:bg-[#023E8A] text-white shadow-md transition"
      >
        {mode === "dark" ? <FiSun className="text-yellow-300" /> : <FiMoon className="text-[#90E0EF]" />}
        {mode === "dark" ? "Switch to Light" : "Switch to Dark"}
      </button>

      <button
        onClick={handleLogout}
        className="mt-4 flex items-center gap-3 px-4 py-2 rounded-lg
                   bg-[#0077B6] hover:bg-[#023E8A] text-white transition"
      >
        <FiLogOut /> Logout
      </button>
    </div>
);
}

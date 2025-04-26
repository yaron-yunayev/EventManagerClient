// src/layout/header/topnavbar/MobileSuppliersMenuOverlay.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaUtensils, FaCamera, FaUserTie, FaFemale, FaGem, FaBus,
  FaMusic, FaLeaf, FaPencilRuler, FaEllipsisH, FaMagnet
} from "react-icons/fa";

const suppliers = [
  { name: "Catering", path: "/suppliers/catering", icon: <FaUtensils /> },
  { name: "Photographer", path: "/suppliers/photographer", icon: <FaCamera /> },
  { name: "Suits", path: "/suppliers/suits", icon: <FaUserTie /> },
  { name: "Dresses", path: "/suppliers/dresses", icon: <FaFemale /> },
  { name: "Magnets", path: "/suppliers/magnets", icon: <FaMagnet /> },
  { name: "Jewelry", path: "/suppliers/jewelry", icon: <FaGem /> },
  { name: "Transportation", path: "/suppliers/transportation", icon: <FaBus /> },
  { name: "Dj", path: "/suppliers/dj", icon: <FaMusic /> },
  { name: "Florist", path: "/suppliers/florist", icon: <FaLeaf /> },
  { name: "Designer", path: "/suppliers/designer", icon: <FaPencilRuler /> },
  { name: "Other", path: "/suppliers/other", icon: <FaEllipsisH /> },
];

export default function MobileSuppliersMenuOverlay({ isOpen, setIsOpen }) {
  const navigate = useNavigate();

  const handleClick = (path) => {
    setIsOpen(false);
    setTimeout(() => {
      navigate(path);
    }, 100);
  };

  if (!isOpen) return null;

  return (
    <div
      className="
        fixed inset-0 z-[999]
        bg-white dark:bg-gray-900
        text-[#023E8A] dark:text-gray-200
        font-elegant
        md:hidden flex flex-col h-screen overflow-hidden
        transition-colors duration-300
      "
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

      {/* Supplier list */}
      <div className="flex-1 overflow-y-auto px-6 pb-10">
        <nav className="flex flex-col items-center space-y-5 text-lg text-center">
          {suppliers.map(({ name, path, icon }) => (
            <button
              key={name}
              onClick={() => handleClick(path)}
              className="
                flex items-center gap-3 w-full text-left
                px-4 py-3 rounded-lg
                bg-gray-100 dark:bg-gray-800
                hover:bg-gray-200 dark:hover:bg-gray-700
                transition-colors duration-200
                text-[#023E8A] dark:text-gray-200
              "
            >
              <span className="text-xl">{icon}</span>
              <span className="text-md font-medium">{name}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

// src/layout/header/topnavbar/SuppliersMenu.jsx
import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import {
  FaUtensils,
  FaCamera,
  FaUserTie,
  FaFemale,
  FaGem,
  FaBus,
  FaMusic,
  FaLeaf,
  FaPencilRuler,
  FaEllipsisH,
  FaMagnet,
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

export default function SuppliersMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const closeTimeout = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(closeTimeout.current);
    setIsOpen(true);
  };
  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setIsOpen(false), 300);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="
          text-[#023E8A] dark:text-white
          font-semibold
          hover:text-[#00B4D8] dark:hover:text-[#90E0EF]
          transition-colors duration-200
        "
      >
        Suppliers
      </button>

      <div
        className={`
          absolute top-full left-0 mt-2 w-60 z-50
          border border-gray-200 dark:border-gray-700
          bg-white dark:bg-gray-800
          rounded-lg shadow-lg
          transform transition-all duration-200
          ${isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
          }
        `}
      >
        {suppliers.map((supplier) => (
          <Link
            key={supplier.name}
            to={supplier.path}
            className="
              flex items-center gap-3 px-4 py-2
              text-[#023E8A] dark:text-white
              hover:bg-[#E0F7FA] dark:hover:bg-gray-700
              transition-colors duration-200
              rounded
            "
          >
            <span className="text-lg">{supplier.icon}</span>
            <span className="text-sm font-medium">{supplier.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

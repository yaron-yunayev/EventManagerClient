import React from "react";
import { Link } from "react-router-dom";

export default function LoginButton() {
  return (
    <Link to="/login">
      <button className="relative inline-block px-5 py-1.5 text-sm text-[#023E8A] font-light rounded-full overflow-hidden border border-[#90E0EF] transition-all duration-300 ease-in-out group hover:scale-105">
        <span className="absolute inset-0 bg-gradient-to-r from-[#CAF0F8] via-[#90E0EF] to-[#0077B6] opacity-40 blur-md group-hover:animate-pulse"></span>
        <span className="relative z-10">Login</span>
      </button>
    </Link>
  );
}

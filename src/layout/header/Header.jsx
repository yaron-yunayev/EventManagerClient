import React from "react";
import NavBar from "./topnavbar/NavBar";

export default function Header() {
  return (
    <header
      className={`
        bg-white text-[#0077B6] shadow-md
        dark:bg-gray-800 dark:text-white
        sticky top-0 z-50 font-cormorant py-4
        transition-colors duration-300
      `}
    >
      <NavBar />
    </header>
  );
}

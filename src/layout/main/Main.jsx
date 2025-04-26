// src/layout/main/Main.jsx
import React from "react";

export default function Main({ children }) {
  return (
    <main
      className="
        flex-grow overflow-y-auto
        bg-white text-black
        dark:bg-gray-900 dark:text-white
        transition-colors duration-300
      "
    >
      {children}
    </main>
  );
}

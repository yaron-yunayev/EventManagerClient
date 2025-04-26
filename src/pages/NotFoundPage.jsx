// src/pages/NotFoundPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div
      className="
        min-h-screen flex flex-col justify-center items-center
        bg-gradient-to-br from-[#CAF0F8] via-[#90E0EF] to-[#0077B6]
        dark:from-gray-800 dark:via-gray-700 dark:to-gray-900
        text-[#023E8A] dark:text-white
        font-cormorant px-6
        transition-colors duration-300
      "
    >
      <h1 className="text-7xl font-bold mb-4 tracking-wide">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-lg text-center max-w-xl mb-8
                    text-gray-800 dark:text-gray-300
                    transition-colors duration-300
      ">
        Oops! Looks like the page you’re looking for doesn’t exist. It might have been moved or deleted.
      </p>

      <button
        onClick={() => navigate("/")}
        className="
          bg-[#023E8A] dark:bg-[#90E0EF]
          hover:bg-[#0077B6] dark:hover:bg-[#0077B6]
          text-white dark:text-black
          text-lg font-semibold py-3 px-6 rounded-lg
          transition-colors duration-300 shadow-md
        "
      >
        Back to Home
      </button>
    </div>
  );
}

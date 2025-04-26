// src/layout/home/HeroSection.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section
      className="
        bg-gradient-to-br from-[#90E0EF] via-[#CAF0F8] to-white
        dark:from-gray-800 dark:via-gray-700 dark:to-black
        py-20 px-6 text-center font-cormorant
        transition-colors duration-300
      "
    >
      <div className="max-w-5xl mx-auto">
        <h1
          className="
            text-5xl md:text-6xl font-bold
            text-[#023E8A] dark:text-[#CAF0F8]
            leading-tight mb-6
            transition-colors duration-300
          "
        >
          Simplify Your Event Management
        </h1>
        <p
          className="
            text-lg md:text-xl
            text-gray-700 dark:text-gray-300
            max-w-3xl mx-auto mb-8
            transition-colors duration-300
          "
        >
          Plan. Organize. Celebrate. All in one place.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <button
            onClick={() => navigate("/create-event")}
            className="
              px-6 py-3 rounded-lg font-semibold
              bg-[#0077B6] hover:bg-[#023E8A] text-white
              dark:bg-[#90E0EF] dark:text-black dark:hover:bg-[#CAF0F8]
              transition-colors duration-300
            "
          >
            Get Started
          </button>
          <button
            onClick={() => navigate("/about")}
            className="
              px-6 py-3 rounded-lg font-semibold
              bg-white hover:bg-gray-100 text-[#023E8A]
              dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-[#90E0EF]
              border border-[#0077B6]
              transition-colors duration-300
            "
          >
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}

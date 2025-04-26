// src/pages/components/AboutCallToAction.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function AboutCallToAction() {
  return (
    <section className="
      py-24 px-6 font-cormorant text-center
      bg-white dark:bg-gray-900 text-black dark:text-white
      transition-colors duration-300
    ">
      <div className="max-w-5xl mx-auto rounded-xl shadow-xl p-10 border border-[#CAF0F8] dark:border-gray-700 transition-border duration-300">
        <h2 className="text-4xl md:text-5xl font-bold text-[#023E8A] dark:text-[#CAF0F8] mb-6 transition-colors duration-300">
          Ready to plan something unforgettable?
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 mb-10 transition-colors duration-300">
          Whether it’s an elegant wedding, a major corporate event, or an intimate celebration —
          we’ve got the tools to make your vision come to life.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/signup"
            className="
              px-8 py-3 rounded-lg font-semibold
              bg-[#0077B6] hover:bg-[#023E8A] text-white
              dark:bg-[#90E0EF] dark:text-black dark:hover:bg-[#CAF0F8]
              transition-colors duration-300
            "
          >
            Get Started
          </Link>
          <Link
            to="/contact"
            className="
              px-8 py-3 rounded-lg font-semibold
              bg-[#CAF0F8] hover:bg-[#90E0EF] text-[#023E8A]
              dark:bg-gray-700 dark:text-[#90E0EF] dark:hover:bg-gray-600
              transition-colors duration-300
            "
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

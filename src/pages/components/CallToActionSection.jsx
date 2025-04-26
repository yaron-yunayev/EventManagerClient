// src/layout/home/CallToActionSection.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function CallToActionSection() {
  return (
    <section
      className="
        bg-gradient-to-br from-[#E0F7FA] via-[#B2EBF2] to-[#4DD0E1]
        dark:from-gray-700 dark:via-gray-600 dark:to-gray-800
        py-20 px-6 font-cormorant text-[#023E8A] dark:text-[#CAF0F8]
        transition-colors duration-300
      "
    >
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4 transition-colors duration-300">
          Ready to manage your next event?
        </h2>
        <p className="text-lg mb-10 transition-colors duration-300">
          Join our platform and start organizing events effortlessly with smart tools
          designed just for event managers.
        </p>

        <div className="flex justify-center gap-6 flex-wrap">
          <Link
            to="/signup"
            className="
              py-3 px-6 rounded-lg font-bold text-lg
              bg-[#0077B6] hover:bg-[#023E8A] text-white
              dark:bg-[#90E0EF] dark:text-black dark:hover:bg-[#CAF0F8]
              transition-colors duration-300
            "
          >
            Create Account
          </Link>

          <Link
            to="/login"
            className="
              py-3 px-6 rounded-lg font-bold text-lg
              bg-white hover:bg-[#f0f9ff] text-[#0077B6]
              dark:bg-gray-700 dark:text-[#90E0EF] dark:hover:bg-gray-600
              border border-[#0077B6] transition-colors duration-300
            "
          >
            Login
          </Link>
        </div>
      </div>
    </section>
  );
}

// src/layout/home/IntroSection.jsx
import React from "react";
import { Link } from "react-router-dom";
import EventElevated from "../../assets/images/EventElevated.png";

export default function IntroSection() {
  return (
    <section
      className="
        bg-white dark:bg-gray-900
        text-gray-800 dark:text-gray-200
        py-20 px-4 sm:px-6 lg:px-16 font-cormorant
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-10">
        {/* Text */}
        <div className="flex-1 space-y-6">
          <h1
            className="
              text-4xl md:text-5xl font-bold
              text-[#023E8A] dark:text-[#90E0EF]
              leading-tight mb-6
              transition-colors duration-300
            "
          >
            Your Events, Elevated.
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 transition-colors duration-300">
            Welcome to the ultimate event management platform. From planning weddings
            and conferences to managing suppliers and guests – we simplify your job
            so you can shine.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link
              to="/create-event"
              className="
                px-6 py-3 rounded-lg font-semibold
                bg-[#0077B6] hover:bg-[#023E8A] text-white
                dark:bg-[#90E0EF] dark:text-black dark:hover:bg-[#CAF0F8]
                transition-colors duration-300
              "
            >
              Get Started
            </Link>
            <Link
              to="/suppliers"
              className="
                px-6 py-3 rounded-lg font-semibold
                bg-[#CAF0F8] text-[#0077B6]
                hover:bg-[#90E0EF]
                dark:bg-gray-700 dark:text-[#90E0EF] dark:hover:bg-gray-600
                transition-colors duration-300
              "
            >
              Browse Suppliers
            </Link>
          </div>
        </div>
        {/* Image */}
        <div className="flex-1">
          <img
            src={EventElevated}
            alt="Event management illustration"
            loading="lazy"
            width={600}
            height={400}
            className="w-full rounded-xl shadow-xl transition-transform duration-300"
          />
        </div>
      </div>
    </section>
  );
}

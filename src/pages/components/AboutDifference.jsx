// src/pages/components/AboutDifference.jsx
import React from "react";

export default function AboutDifference() {
  return (
    <section className="
      bg-white dark:bg-gray-900
      py-20 px-6 font-cormorant text-center
      transition-colors duration-300
    ">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-[#023E8A] dark:text-white mb-10 transition-colors duration-300">
          What Makes Us Different?
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10">
          {[
            "Tailored for Event Managers",
            "Elegant & Intuitive Design",
            "Powerful Features",
            "Real-Time Control",
          ].map((title, i) => (
            <div
              key={i}
              className="bg-[#CAF0F8] dark:bg-gray-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-colors duration-300"
            >
              <h3 className="text-xl font-semibold text-[#0077B6] dark:text-[#90E0EF] mb-2 transition-colors duration-300">
                {title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 transition-colors duration-300">
                {/* put corresponding description */}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

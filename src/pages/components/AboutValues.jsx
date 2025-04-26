// src/pages/components/AboutValues.jsx
import React from "react";
import { FiZap, FiHeart, FiAward } from "react-icons/fi";

const values = [
  {
    icon: <FiZap size={36} className="text-[#0077B6] dark:text-[#90E0EF]" />,
    title: "Innovation",
    description:
      "We embrace cutting-edge tools to simplify event planning for everyone – faster, smarter, better.",
  },
  {
    icon: <FiHeart size={36} className="text-[#0077B6] dark:text-[#90E0EF]" />,
    title: "Empathy",
    description:
      "We listen, adapt, and truly care about the day-to-day needs of event professionals.",
  },
  {
    icon: <FiAward size={36} className="text-[#0077B6] dark:text-[#90E0EF]" />,
    title: "Excellence",
    description:
      "We’re committed to a flawless, seamless experience – in every click and every detail.",
  },
];

export default function AboutValues() {
  return (
    <section className="
      bg-[#CAF0F8] dark:bg-gray-800
      py-24 px-6 font-cormorant text-center
      transition-colors duration-300
    ">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#023E8A] dark:text-[#CAF0F8] mb-14 tracking-tight transition-colors duration-300">
          Our Core Values
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-10">
          {values.map((val, idx) => (
            <div
              key={idx}
              className="
                bg-white dark:bg-gray-700
                rounded-xl shadow-lg p-8 hover:shadow-2xl
                transition-colors duration-300 text-left
              "
            >
              <div className="mb-4 flex justify-center">{val.icon}</div>
              <h3 className="text-xl font-bold text-[#0077B6] dark:text-[#90E0EF] mb-2 text-center transition-colors duration-300">
                {val.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm text-center transition-colors duration-300">
                {val.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

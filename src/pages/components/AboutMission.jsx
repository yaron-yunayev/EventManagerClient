// src/pages/components/AboutMission.jsx
import React from "react";
import { FiTarget, FiStar, FiCheckCircle } from "react-icons/fi";

export default function AboutMission() {
  return (
    <section className="
      bg-white dark:bg-gray-900
      py-24 px-6 font-cormorant text-center
      transition-colors duration-300
    ">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-[#023E8A] dark:text-white mb-4 transition-colors duration-300">
          Our Mission
        </h2>
        <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-colors duration-300">
          To revolutionize the way event managers plan, organize, and execute unforgettable experiences
          – with elegance, clarity, and control.
        </p>
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-3 mt-16">
          <MissionCard
            icon={<FiTarget size={36} className="text-[#0077B6] dark:text-[#90E0EF]" />}
            title="Empower"
            text="We empower every manager to take full control with simple yet powerful tools."
          />
          <MissionCard
            icon={<FiStar size={36} className="text-[#0077B6] dark:text-[#90E0EF]" />}
            title="Inspire"
            text="We design with beauty and clarity to inspire confidence in every decision."
          />
          <MissionCard
            icon={<FiCheckCircle size={36} className="text-[#0077B6] dark:text-[#90E0EF]" />}
            title="Deliver"
            text="We help deliver events that impress – for guests, clients, and teams alike."
          />
        </div>
      </div>
    </section>
  );
}

function MissionCard({ icon, title, text }) {
  return (
    <div className="
      bg-[#f9fdff] dark:bg-gray-800
      border border-[#CAF0F8] dark:border-gray-700
      p-6 rounded-xl shadow-md hover:shadow-xl
      transition-colors duration-300
    ">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-[#023E8A] dark:text-white mb-2 transition-colors duration-300">
        {title}
      </h3>
      <p className="text-gray-700 dark:text-gray-300 text-sm transition-colors duration-300">
        {text}
      </p>
    </div>
  );
}

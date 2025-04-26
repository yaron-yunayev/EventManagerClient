// src/pages/components/AboutIntro.jsx
import React from "react";
import BackButton from "../../components/BackButton";

export default function AboutIntro() {
  return (
    <section className="
      relative
      bg-gradient-to-br from-[#CAF0F8] via-[#90E0EF] to-white
      dark:from-gray-700 dark:via-gray-600 dark:to-gray-800
      py-20 px-6 font-cormorant
      transition-colors duration-300
    ">
      <div className="absolute top-6 left-6">
        <BackButton />
      </div>
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-[#023E8A] dark:text-[#CAF0F8] mb-6 transition-colors duration-300">
          About Us
        </h1>
        <p className="text-lg leading-relaxed mb-4 text-gray-700 dark:text-gray-300 transition-colors duration-300">
          Our mission is to elevate the way events are planned and experienced. We believe that with
          the right tools, every event manager can craft unforgettable moments that truly matter.
        </p>
        <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl mx-auto transition-colors duration-300">
          Founded with the goal of simplifying event organization, we offer a platform that combines
          powerful features with an intuitive design. Whether you're planning a wedding, conference,
          or private party — we’re here to help you make it exceptional.
        </p>
      </div>
    </section>
  );
}

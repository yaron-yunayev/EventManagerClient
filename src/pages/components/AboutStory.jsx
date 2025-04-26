// src/pages/components/AboutStory.jsx
import React from "react";
import WeddingPich from "../../assets/images/WeddingPich.png";

export default function AboutStory() {
  return (
    <section className="
      py-20 px-6 font-cormorant text-center
      bg-[#E0F7FA] dark:bg-gray-800
      transition-colors duration-300
    ">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="text-left">
          <h2 className="text-4xl font-bold text-[#023E8A] dark:text-[#90E0EF] mb-6 tracking-tight transition-colors duration-300">
            How It All Began
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed transition-colors duration-300">
            It all started with a single wedding event. From chaotic spreadsheets to scattered
            emails, we knew there had to be a better way. What began as a small side project has
            grown into a platform empowering event managers worldwide to plan smarter, faster,
            and more beautifully.
          </p>
        </div>
        <div>
          <img
            src={WeddingPich}
            alt="Our Story"
            className="w-full h-auto rounded-xl shadow-xl object-cover transition-shadow duration-300"
          />
        </div>
      </div>
    </section>
  );
}

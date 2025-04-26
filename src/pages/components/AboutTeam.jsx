// src/pages/components/AboutTeam.jsx
import React from "react";
import YaronYun from "../../assets/images/YaronYun.png";
import LironDesign from "../../assets/images/LironDesign.png";
import SaritManager from "../../assets/images/SaritManager.png";

const team = [
  { name: "YaronYun", role: "Founder & CEO", quote: "Vision is the art of seeing what's possible – then building it.", image: YaronYun },
  { name: "LironDesign", role: "Lead UX/UI", quote: "Design is not just what it looks like, it's how it works.", image: LironDesign },
  { name: "SaritManager", role: "Event Operations", quote: "Every perfect event starts with perfect preparation.", image: SaritManager },
];

export default function AboutTeam() {
  return (
    <section className="
      bg-[#E0F7FA] dark:bg-gray-800
      py-20 px-6 font-cormorant text-center
      transition-colors duration-300
    ">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-[#023E8A] dark:text-[#90E0EF] mb-14 tracking-tight transition-colors duration-300">
          Meet the Visionaries Behind EventX
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-10">
          {team.map((m, i) => (
            <div
              key={i}
              className="
                bg-white dark:bg-gray-700
                rounded-2xl shadow-xl p-8
                hover:shadow-2xl hover:scale-[1.03]
                transition-all duration-300
              "
            >
              <img
                src={m.image}
                alt={m.name}
                className="w-32 h-32 mx-auto rounded-full object-cover border-4 border-[#0077B6] mb-5 transition-colors duration-300"
              />
              <h3 className="text-xl font-bold text-[#023E8A] dark:text-[#CAF0F8] mb-1 transition-colors duration-300">
                {m.name}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 transition-colors duration-300">
                {m.role}
              </p>
              <p className="text-sm italic text-[#0077B6] dark:text-[#90E0EF] leading-relaxed transition-colors duration-300">
                “{m.quote}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

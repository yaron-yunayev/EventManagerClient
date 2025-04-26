// src/layout/home/TestimonialsSection.jsx
import React from "react";
import { FaStar } from "react-icons/fa";
import TamarLevy from "../../assets/images/TamarLevy.png";
import AviCohen from "../../assets/images/AviCohen.png";
import RoniSegal from "../../assets/images/RoniSegal.png";

const testimonials = [
  {
    name: "Tamar Levy",
    role: "Wedding Planner",
    quote:
      "I planned three weddings this month using EventX – everything ran smoothly. Finally a tool that understands planners.",
    image: TamarLevy,
  },
  {
    name: "Avi Cohen",
    role: "Corporate Events Manager",
    quote:
      "I assigned all my suppliers in minutes. The location tools and UI are a dream. Couldn't ask for better support.",
    image: AviCohen,
  },
  {
    name: "Roni Segal",
    role: "Birthday Party Organizer",
    quote:
      "As someone who manages small and large events – EventX is an absolute time-saver. Love the simplicity and control.",
    image: RoniSegal,
  },
];

export default function TestimonialsSection() {
  return (
    <section
      className="
        bg-[#CAF0F8] dark:bg-gray-800
        py-24 px-6 font-cormorant
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2
          className="
            text-5xl font-extrabold
            text-transparent bg-clip-text bg-gradient-to-r from-[#0077B6] to-[#023E8A]
            mb-16 tracking-tight drop-shadow-lg
          "
        >
          Our Happy Clients Speak for Us
        </h2>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(({ name, role, quote, image }, idx) => (
            <div
              key={idx}
              className="
                bg-white dark:bg-gray-700
                rounded-2xl shadow-xl p-8 text-left
                border border-gray-100 dark:border-gray-600
                hover:shadow-2xl transition-shadow transition-colors duration-300
              "
            >
              <div className="flex items-center gap-5 mb-4">
                <img
                  src={image}
                  alt={name}
                  loading="lazy"
                  width={80}
                  height={80}
                  className="
                    w-20 h-20 rounded-full object-cover
                    border-4 border-[#90E0EF] dark:border-[#0077B6]
                  "
                />
                <div>
                  <p className="text-xl font-bold text-[#0077B6] dark:text-[#CAF0F8]">
                    {name}
                  </p>
                  <p className="text-sm italic text-gray-600 dark:text-gray-300">
                    {role}
                  </p>
                </div>
              </div>

              <div className="flex gap-1 text-[#FFD700] mb-3">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} />
                ))}
              </div>

              <p className="text-gray-700 dark:text-gray-300 text-[15px] leading-relaxed italic">
                “{quote}”
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

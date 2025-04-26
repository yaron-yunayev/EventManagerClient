// src/pages/components/AboutProcess.jsx
import React from "react";

export default function AboutProcess() {
  const steps = [
    { title: "Step 1: Sign Up", text: "Create your account to access a complete suite of tools tailored for event pros." },
    { title: "Step 2: Create an Event", text: "Set the date, location, guest count, description, and invite suppliers." },
    { title: "Step 3: Assign Suppliers", text: "Match your event with trusted suppliers across all categories." },
    { title: "Step 4: Manage with Ease", text: "Access your dashboard anytime to view, edit, and coordinate smoothly." },
  ];

  return (
    <section className="
      bg-white dark:bg-gray-900
      py-20 px-6 font-cormorant text-center
      transition-colors duration-300
    ">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl font-bold text-[#023E8A] dark:text-[#90E0EF] mb-14 tracking-tight transition-colors duration-300">
          From Idea to Event – Our Process
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-10">
          {steps.map((step, i) => (
            <div
              key={i}
              className="
                bg-[#f9fdff] dark:bg-gray-800
                rounded-xl shadow-lg p-6
                border-l-4 border-[#0077B6]
                hover:shadow-2xl
                transition-colors duration-300
              "
            >
              <h3 className="text-xl font-bold text-[#0077B6] dark:text-[#90E0EF] mb-2 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm transition-colors duration-300">
                {step.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

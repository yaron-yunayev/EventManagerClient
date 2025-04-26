// src/layout/home/HowItWorksSection.jsx
import React from "react";
import CreateYourEvent from "../../assets/images/CreateYourEvent.png";
import AddSuppliers from "../../assets/images/AddSuppliers.png";
import ManageEverything from "../../assets/images/ManageEverything.png";

const steps = [
  {
    step: "01",
    title: "Create Your Event",
    description:
      "Fill in event details like name, date, description, and location. The interface guides you every step of the way.",
    image: CreateYourEvent,
  },
  {
    step: "02",
    title: "Add Suppliers",
    description:
      "Select from recommended suppliers or add your own. Assign them to your event with just a few clicks.",
    image: AddSuppliers,
  },
  {
    step: "03",
    title: "Manage Everything",
    description:
      "Track guest count, edit event details, and keep your suppliers organized – all in one dashboard.",
    image: ManageEverything,
  },
];

export default function HowItWorksSection() {
  return (
    <section
      className="
        bg-[#90E0EF] dark:bg-gray-800
        py-20 px-6 font-cormorant
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2
          className="
            text-4xl font-bold text-[#023E8A] dark:text-[#90E0EF]
            mb-14 transition-colors duration-300
          "
        >
          How It Works
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map(({ step, title, description, image }, idx) => (
            <div
              key={idx}
              className="
                bg-white dark:bg-gray-700
                rounded-xl shadow-xl overflow-hidden text-left
                transition-colors duration-300
              "
            >
              <img
                src={image}
                alt={title}
                loading="lazy"
                width={400}
                height={240}
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <p className="text-sm text-[#0077B6] dark:text-[#CAF0F8] font-bold mb-1">
                  {step}
                </p>
                <h3 className="text-xl font-semibold text-[#023E8A] dark:text-white mb-2">
                  {title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 text-sm">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

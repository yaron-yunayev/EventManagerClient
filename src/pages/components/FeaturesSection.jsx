// src/layout/home/FeaturesSection.jsx
import React from "react";
import InteractiveMap from "../../assets/images/InteractiveMap.png";
import SupplierManagement from "../../assets/images/SupplierManagement.png";
import SmartEventPlanning from "../../assets/images/SmartEventPlanning.png";

const features = [
  {
    title: "Smart Event Planning",
    description:
      "Create, edit, and manage events with intuitive tools and a clean interface. Keep everything organized in one place.",
    image: SmartEventPlanning,
  },
  {
    title: "Supplier Management",
    description:
      "Add, edit, and assign suppliers to your events. View recommended suppliers by category with ease.",
    image: SupplierManagement,
  },
  {
    title: "Interactive Map",
    description:
      "Search locations and assign event venues with a beautiful circular map powered by OpenStreetMap.",
    image: InteractiveMap,
  },
];

export default function FeaturesSection() {
  return (
    <section
      className="
        bg-[#CAF0F8] dark:bg-gray-800
        py-20 px-6 font-cormorant
        transition-colors duration-300
      "
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2
          className="
            text-4xl font-bold text-[#023E8A] dark:text-[#90E0EF]
            mb-12 transition-colors duration-300
          "
        >
          What You Can Do
        </h2>
        <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {features.map(({ title, description, image }, idx) => (
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
                <h3 className="text-xl font-bold text-[#0077B6] dark:text-[#CAF0F8] mb-2">
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

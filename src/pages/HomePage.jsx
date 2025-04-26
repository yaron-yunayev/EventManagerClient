// src/pages/HomePage.jsx
import React from "react";
import HeroSection from "./components/HeroSection";
import IntroSection from "./components/IntroSection";
import FeaturesSection from "./components/FeaturesSection";
import HowItWorksSection from "./components/HowItWorksSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";
import CallToActionSection from "./components/CallToActionSection";

export default function HomePage() {
  return (
    <main
      className="
        min-h-screen
        bg-white text-black
        dark:bg-gray-900 dark:text-white
        transition-colors duration-300
      "
    >
      <HeroSection />
      <IntroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <ContactSection />
      <CallToActionSection />
    </main>
  );
}

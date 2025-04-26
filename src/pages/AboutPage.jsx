// src/pages/AboutPage.jsx
import React from "react";
import AboutIntro from "./components/AboutIntro";
import AboutMission from "./components/AboutMission";
import AboutValues from "./components/AboutValues";
import AboutProcess from "./components/AboutProcess";
import AboutTeam from "./components/AboutTeam";
import AboutDifference from "./components/AboutDifference";
import AboutStory from "./components/AboutStory";
import AboutCallToAction from "./components/AboutCallToAction";

export default function AboutPage() {
  return (
    <div className="
      font-cormorant
      bg-white text-black
      dark:bg-gray-900 dark:text-white
      transition-colors duration-300
    ">
      <AboutIntro/>
      <AboutMission />
      <AboutValues/>
      <AboutProcess/>
      <AboutTeam />
      <AboutDifference/>
      <AboutStory/>
      <AboutCallToAction />
    </div>
  );
}

// src/layout/header/topnavbar/NavBar.jsx
import React from "react";
import LeftNavBar from "./left-navigation/LeftNavBar";
import RightNavBar from "./right-navigation/RightNavBar";

export default function NavBar() {
  return (
    <div className="h-10 w-full flex justify-between items-center transition-colors duration-300">
      <LeftNavBar />
      <RightNavBar />
    </div>
  );
}

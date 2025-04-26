// src/layout/Layout.jsx
import React from "react";
import Header from "./header/Header";
import Main from "./main/Main";
import Footer from "./footer/Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-white text-black
                    dark:bg-gray-800 dark:text-white
                    transition-colors duration-300">
      <Header />
      <Main>{children}</Main>
      <Footer />
    </div>
  );
}

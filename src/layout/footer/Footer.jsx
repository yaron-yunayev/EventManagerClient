// src/layout/footer/FooterSection.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import FooterPic from "../../assets/images/FooterPic.png";

export default function FooterSection() {
  const navigate = useNavigate();
  const handleScrollToContact = () => {
    navigate("/");
    setTimeout(() => {
      const contactEl = document.getElementById("contact");
      if (contactEl) contactEl.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <footer
      className="relative font-cormorant text-white dark:text-gray-200 transition-colors duration-300"
      style={{
        backgroundImage: `url(${FooterPic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60 dark:bg-opacity-80 backdrop-blur-sm" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">
          Your Event. Elevated.
        </h2>

        <p className="text-lg text-gray-300 dark:text-gray-400 mb-10">
          Empowering event managers to plan, assign and elevate every celebration.
        </p>

        <nav className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-8 text-lg font-semibold tracking-wide text-white dark:text-gray-200">
          <Link to="/" className="hover:text-[#90E0EF] transition-colors duration-200">
            Home
          </Link>
          <Link to="/about" className="hover:text-[#90E0EF] transition-colors duration-200">
            About
          </Link>
          <button
            onClick={handleScrollToContact}
            className="hover:text-[#90E0EF] transition-colors duration-200"
          >
            Contact
          </button>
          <Link to="/signup" className="hover:text-[#90E0EF] transition-colors duration-200">
            Register
          </Link>
        </nav>

        <div className="flex justify-center gap-6 mb-6 text-xl text-white dark:text-gray-200">
          <a href="#" aria-label="Facebook" className="hover:text-[#90E0EF] transition-colors duration-200">
            <FaFacebookF />
          </a>
          <a href="#" aria-label="Instagram" className="hover:text-[#90E0EF] transition-colors duration-200">
            <FaInstagram />
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-[#90E0EF] transition-colors duration-200">
            <FaLinkedinIn />
          </a>
          <a href="#" aria-label="Twitter" className="hover:text-[#90E0EF] transition-colors duration-200">
            <FaTwitter />
          </a>
        </div>

        <p className="text-sm text-gray-300 dark:text-gray-400">
          © {new Date().getFullYear()} EventX. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

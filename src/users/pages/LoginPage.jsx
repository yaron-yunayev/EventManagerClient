// src/pages/LoginPage.jsx
import React from "react";
import LoginForm from "../components/LoginForm";

export default function LoginPage() {
  return (
    <div
      className="
        flex justify-center items-center min-h-screen font-cormorant
        bg-gradient-to-br from-blue-100 via-white to-blue-200
        dark:from-gray-800 dark:via-gray-700 dark:to-gray-900
        text-black dark:text-white
        transition-colors duration-300
      "
    >
      <LoginForm />
    </div>
  );
}

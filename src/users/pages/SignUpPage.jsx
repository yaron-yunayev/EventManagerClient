// src/pages/SignupPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/SignUpForm";
import { registerUser } from "../../services/authServiceSignUp";
import Loader from "../../components/Loader";

export default function SignupPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);

  const handleSignup = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      await registerUser(userData);
      setSuccess(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div
      className="
        flex justify-center items-center min-h-screen px-4 py-16 font-cormorant
        bg-gradient-to-br from-blue-100 via-white to-blue-200
        dark:from-gray-800 dark:via-gray-700 dark:to-gray-900
        text-black dark:text-white
        transition-colors duration-300
      "
    >
      <div className="w-full max-w-3xl">
        {success ? (
          <div
            className="
              text-center text-green-700 dark:text-green-300 text-xl font-semibold
              bg-white dark:bg-gray-800 p-8 rounded-xl shadow-2xl
              transition-colors duration-300
            "
          >
            ✅ Registration successful! Redirecting...
          </div>
        ) : (
          <SignupForm onSubmit={handleSignup} error={error} />
        )}
      </div>
    </div>
  );
}

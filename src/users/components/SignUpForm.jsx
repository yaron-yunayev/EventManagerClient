// src/components/SignupForm.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupForm({ onSubmit, error }) {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    password: "",
    isEventManager: false,
    eventDomain: "",
    israeliID: "",
    address: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) return "Required.";
        break;
      case "email":
        if (!value.trim()) return "Email is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Invalid email.";
        break;
      case "password":
        if (!value.trim()) return "Password is required.";
        if (value.length < 6) return "At least 6 characters.";
        break;
      case "age":
        if (!value) return "Age is required.";
        if (isNaN(value) || value < 18) return "Must be 18+.";
        break;
      case "israeliID":
        if (!/^\d{9}$/.test(value)) return "Must be 9 digits.";
        break;
      case "phoneNumber":
        if (!/^\d{10}$/.test(value)) return "Must be 10 digits.";
        break;
      case "eventDomain":
      case "address":
        if (!value.trim()) return "Required.";
        break;
      default:
        return null;
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((p) => ({ ...p, [name]: val }));
    setErrors((p) => ({ ...p, [name]: validateField(name, val) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.entries(formData).forEach(([k, v]) => {
      const err = validateField(k, v);
      if (err) newErrors[k] = err;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;
    await onSubmit(formData);
  };

  const inputCls = `
    w-full p-2 border rounded-lg
    bg-white dark:bg-gray-700
    text-black dark:text-white
    border-gray-300 dark:border-gray-600
    focus:outline-none focus:ring-2 focus:ring-[#0077B6] dark:focus:ring-[#90E0EF]
    transition-colors duration-300
  `;

  const labelCls = "text-sm font-medium mb-1 text-[#023E8A] dark:text-[#CAF0F8] transition-colors duration-300";

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white dark:bg-gray-800 text-black dark:text-white
        p-10 rounded-xl shadow-2xl space-y-6 font-cormorant
        transition-colors duration-300
      "
    >
      <div className="text-center mb-10">
        <h2 className="
          text-4xl md:text-5xl font-extrabold
          bg-gradient-to-r from-[#0077B6] via-[#00B4D8] to-[#90E0EF]
          text-transparent bg-clip-text tracking-tight mb-4
        ">
          Join EventX Today
        </h2>
        <p className="text-[#023E8A] dark:text-gray-300 text-sm md:text-lg font-medium">
          Create your account and start planning unforgettable events.
        </p>
      </div>

      {error && (
        <p className="
          text-red-600 text-sm bg-red-100 dark:bg-red-200
          p-2 rounded border border-red-200 text-center
        ">
          ❌ {error}
        </p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} inputCls={inputCls} labelCls={labelCls}/>
        <Input label="Last Name"  name="lastName"  value={formData.lastName}  onChange={handleChange} error={errors.lastName}  inputCls={inputCls} labelCls={labelCls}/>
      </div>

      <Input label="Age"           name="age"           type="number"  value={formData.age}           onChange={handleChange} error={errors.age}           inputCls={inputCls} labelCls={labelCls}/>
      <Input label="Email"         name="email"         type="email"   value={formData.email}         onChange={handleChange} error={errors.email}         inputCls={inputCls} labelCls={labelCls}/>
      <Input label="Password"      name="password"      type="password"value={formData.password}      onChange={handleChange} error={errors.password}      inputCls={inputCls} labelCls={labelCls}/>
      <Input label="Event Domain"  name="eventDomain"                value={formData.eventDomain}  onChange={handleChange} error={errors.eventDomain}  inputCls={inputCls} labelCls={labelCls}/>
      <Input label="Israeli ID"    name="israeliID"                  value={formData.israeliID}    onChange={handleChange} error={errors.israeliID}    inputCls={inputCls} labelCls={labelCls}/>
      <Input label="Address"       name="address"                    value={formData.address}       onChange={handleChange} error={errors.address}       inputCls={inputCls} labelCls={labelCls}/>
      <Input label="Phone Number"  name="phoneNumber" type="tel"    value={formData.phoneNumber}  onChange={handleChange} error={errors.phoneNumber}  inputCls={inputCls} labelCls={labelCls}/>

      <label className="flex items-center space-x-2 text-[#023E8A] dark:text-[#CAF0F8] transition-colors duration-300">
        <input
          type="checkbox"
          name="isEventManager"
          checked={formData.isEventManager}
          onChange={handleChange}
          className="accent-[#0077B6] dark:accent-[#90E0EF] w-4 h-4 transition-colors duration-300"
        />
        <span>Are you an Event Manager?</span>
      </label>

      <button
        type="submit"
        className="
          w-full bg-[#0077B6] dark:bg-[#90E0EF]
          hover:bg-[#023E8A] dark:hover:bg-[#0077B6]
          text-white dark:text-black
          font-bold py-2 px-4 rounded-lg transition-colors duration-300
        "
      >
        Register
      </button>

      <p className="text-sm text-center mt-6 text-[#023E8A] dark:text-gray-300 transition-colors duration-300">
        Already have an account?{" "}
        <span
          onClick={() => navigate("/login")}
          className="text-[#0077B6] dark:text-[#90E0EF] hover:underline cursor-pointer font-semibold transition-colors duration-300"
        >
          Login here
        </span>
      </p>
    </form>
  );
}

function Input({ label, name, type = "text", value, onChange, error, inputCls, labelCls }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className={labelCls}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
        className={`${inputCls} ${error ? "border-red-500 focus:ring-red-300" : ""}`}
      />
      {error && <span className="text-red-500 text-sm mt-1">{error}</span>}
    </div>
  );
}

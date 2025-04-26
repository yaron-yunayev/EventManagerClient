// src/components/LoginForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authServiceLogin";
import { useUser } from "../providers/UserProvider";
import { toast } from "react-toastify";

export default function LoginForm() {
  const { setUser, setToken } = useUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onChange" });
  const selectedRole = watch("role");
  const isManager = selectedRole === "EventManager";

  const onSubmit = async (data) => {
    try {
      const response = await loginUser(data);
      setToken(response.token);
      setUser({
        id: response.id,
        email: response.email,
        role: response.role,
        isEventManager: response.isEventManager,
        favoriteSupplierIds: response.favoriteSupplierIds || [],
      });
      localStorage.setItem("token", response.token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          id: response.id,
          email: response.email,
          role: response.role,
          isEventManager: response.isEventManager,
          favoriteSupplierIds: response.favoriteSupplierIds || [],
        })
      );
      navigate("/");
    } catch {
      toast.error("❌ Login failed. Please check your credentials.");
    }
  };

  const inputCls = `
    w-full p-3 border rounded-lg
    bg-white dark:bg-gray-700
    text-black dark:text-white
    border-gray-300 dark:border-gray-600
    focus:outline-none focus:ring-2 focus:ring-[#0077B6] dark:focus:ring-[#90E0EF]
    transition-colors duration-300
  `;

  const labelCls = "block text-[#023E8A] dark:text-[#CAF0F8] font-semibold mb-1 transition-colors duration-300";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="
        w-full max-w-md bg-white dark:bg-gray-800
        text-black dark:text-white
        shadow-2xl rounded-xl p-8
        transition-colors duration-300
      "
    >
      <h2 className="
        text-3xl font-bold text-transparent bg-clip-text
        bg-gradient-to-r from-[#0077B6] via-[#00B4D8] to-[#90E0EF]
        text-center tracking-wide mb-6 font-cormorant
      ">
        Welcome Back to EventX
      </h2>

      <div className="mb-4">
  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
    Email
  </label>
  <input
    type="email"
    placeholder="you@example.com"
    {...register("email", {
      required: "Email is required",
      pattern: {
        value: /^\S+@\S+$/i,
        message: "Invalid email format",
      },
    })}
    className={`
      w-full px-4 py-2 border rounded-md shadow-sm transition duration-200
      focus:outline-none focus:ring-2 focus:ring-[#0077B6]
      bg-white dark:bg-gray-800
      text-gray-900 dark:text-gray-100
      border-gray-300 dark:border-gray-600
      placeholder-gray-400 dark:placeholder-gray-500
      ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}
    `}
  />
  {errors.email && (
    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
  )}
</div>


      <div className="mb-4">
        <label className={labelCls}>Password</label>
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: { value: 6, message: "At least 6 characters required" },
          })}
          className={inputCls}
        />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
      </div>

      <div className="mb-4">
        <label className={labelCls}>Select Role</label>
        <select
          {...register("role", { required: "Role is required" })}
          className={inputCls}
        >
          <option value="">-- Choose your role --</option>
          <option value="User">Regular User</option>
          <option value="EventManager">Event Manager</option>
        </select>
        {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
      </div>

      {isManager && (
        <div className="mb-4">
          <label className={labelCls}>ID Number</label>
          <input
            type="text"
            placeholder="Your ID Number"
            {...register("idNumber", {
              required: "ID Number is required for managers",
              minLength: { value: 9, message: "Must be at least 9 digits" },
            })}
            className={inputCls}
          />
          {errors.idNumber && <p className="text-red-500 text-sm">{errors.idNumber.message}</p>}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full bg-[#0077B6] dark:bg-[#90E0EF]
          hover:bg-[#023E8A] dark:hover:bg-[#0077B6]
          text-white dark:text-black
          font-bold py-3 rounded-lg
          transition-colors duration-300
        "
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </button>

      <p className="text-sm text-center mt-4 text-black dark:text-white transition-colors duration-300">
        Don’t have an account?{" "}
        <span
          onClick={() => navigate("/signup")}
          className="text-[#0077B6] dark:text-[#90E0EF] hover:underline cursor-pointer transition-colors duration-300"
        >
          Sign up here
        </span>
      </p>
    </form>
  );
}

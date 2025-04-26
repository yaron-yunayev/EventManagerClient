// src/pages/EditProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useUser } from "../../users/providers/UserProvider";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import BackButton from "../../components/BackButton";
import Loader from "../../components/Loader";
import { updateUserProfile } from "../providers/userService";
import { getUserById } from "../providers/myuser";

export default function EditProfilePage() {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [originalProfile, setOriginalProfile] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getUserById(user.id);
        setOriginalProfile(data);
        setValue("firstName", data.firstName);
        setValue("lastName", data.lastName);
        setValue("age", data.age);
        setValue("phoneNumber", data.phoneNumber);
        setValue("address", data.address);
      } catch (err) {
        toast.error("❌ Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) fetchUser();
  }, [user?.id, setValue]);

  const onSubmit = async (formData) => {
    try {
      if (!originalProfile) return;
      const payload = {
        ...formData,
        email: originalProfile.email,
        role: originalProfile.role,
        eventDomain: originalProfile.eventDomain || "",
        israeliID: originalProfile.israeliID || "",
        isEventManager: originalProfile.role === "EventManager",
      };
      const updatedUser = await updateUserProfile(user.id, payload);
      const newUser = { ...user, ...updatedUser };
      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      toast.success("✅ Profile updated successfully");
      navigate(ROUTES.USER_PROFILE);
    } catch {
      toast.error("❌ Failed to update profile");
    }
  };

  if (loading || !originalProfile) return <Loader />;

  const inputClasses = `
    w-full p-3 border rounded-lg
    bg-white dark:bg-gray-700
    text-black dark:text-white
    border-[#90E0EF] dark:border-gray-600
    focus:outline-none focus:ring-2 focus:ring-[#0077B6] dark:focus:ring-[#90E0EF]
    transition-colors duration-300
  `;

  const labelClasses = `
    text-sm font-semibold mb-1
    text-[#023E8A] dark:text-[#CAF0F8]
    transition-colors duration-300
  `;

  return (
    <div
      className="
        min-h-screen py-10 px-6 font-cormorant
        bg-gradient-to-br from-[#CAF0F8] via-[#90E0EF] to-[#0077B6]
        dark:from-gray-800 dark:via-gray-700 dark:to-gray-900
        text-black dark:text-white
        transition-colors duration-300
      "
    >
      <BackButton />
      <div
        className="
          max-w-3xl mx-auto p-10
          bg-white dark:bg-gray-800
          shadow-2xl rounded-xl
          transition-colors duration-300
        "
      >
        <h1 className="text-4xl font-bold text-center mb-8 text-[#023E8A] dark:text-[#90E0EF] transition-colors duration-300">
          Edit Profile
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <InputField label="First Name" name="firstName" register={register} rules={{}} errors={errors} inputClasses={inputClasses} labelClasses={labelClasses} />
            <InputField label="Last Name" name="lastName" register={register} rules={{}} errors={errors} inputClasses={inputClasses} labelClasses={labelClasses} />
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <InputField label="Age" name="age" type="number" register={register} rules={{ min: 18, max: 120 }} errors={errors} inputClasses={inputClasses} labelClasses={labelClasses} />
            <InputField label="Phone Number" name="phoneNumber" register={register} rules={{}} errors={errors} inputClasses={inputClasses} labelClasses={labelClasses} />
          </div>
          <InputField label="Address" name="address" register={register} rules={{}} errors={errors} inputClasses={inputClasses} labelClasses={labelClasses} />

          <div className="grid md:grid-cols-2 gap-6">
            <DisabledField label="Email" value={originalProfile.email} labelClasses={labelClasses} inputClasses={inputClasses} />
            <DisabledField label="Role" value={originalProfile.role} labelClasses={labelClasses} inputClasses={inputClasses} />
            <DisabledField label="Event Domain" value={originalProfile.eventDomain || "—"} labelClasses={labelClasses} inputClasses={inputClasses} />
            <DisabledField label="Israeli ID" value={originalProfile.israeliID || "—"} labelClasses={labelClasses} inputClasses={inputClasses} />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="
              w-full bg-[#0077B6] hover:bg-[#023E8A] dark:bg-[#90E0EF] dark:hover:bg-[#CAF0F8]
              text-white dark:text-black
              font-bold py-3 rounded-lg
              transition-colors duration-300
            "
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

function InputField({ label, name, type = "text", register, rules, errors, inputClasses, labelClasses }) {
  return (
    <div>
      <p className={labelClasses}>{label}</p>
      <input
        {...register(name, { required: `${label} is required.`, ...rules })}
        type={type}
        className={inputClasses}
      />
      {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name].message}</p>}
    </div>
  );
}

function DisabledField({ label, value, labelClasses, inputClasses }) {
  return (
    <div>
      <p className={labelClasses}>{label}</p>
      <div className={`${inputClasses} cursor-not-allowed`} disabled>
        {value}
      </div>
    </div>
  );
}

// src/pages/UserProfilePage.jsx
import React, { useEffect, useState } from "react";
import { useUser } from "../../users/providers/UserProvider";
import BackButton from "../../components/BackButton";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";
import { getUserById } from "../providers/myuser";
import { toast } from "react-toastify";
import { FiLogOut, FiEdit2 } from "react-icons/fi";
import ROUTES from "../../routes/routesModel";

export default function UserProfilePage() {
  const { user, setUser, setToken } = useUser();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserById(user?.id);
        setProfile(data);
      } catch (err) {
        console.error("Failed to fetch user profile:", err);
      } finally {
        setLoading(false);
      }
    };
    if (user?.id) fetchProfile();
  }, [user]);

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast.info("👋 Logged out successfully.");
    setTimeout(() => {
      navigate("/");
    }, 300);
  };

  if (loading || !profile) return <Loader />;

  return (
    <div
      className="
        min-h-screen py-12 px-6 font-cormorant
        bg-gradient-to-br from-[#CAF0F8] via-[#90E0EF] to-[#0077B6]
        dark:from-gray-800 dark:via-gray-700 dark:to-gray-900
        text-black dark:text-white
        transition-colors duration-300
      "
    >
      <BackButton />
      <div
        className="
          max-w-3xl mx-auto p-10 space-y-6
          bg-white dark:bg-gray-800
          shadow-2xl rounded-xl
          transition-colors duration-300
        "
      >
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <h1
            className="
              text-4xl font-bold
              text-[#023E8A] dark:text-[#CAF0F8]
              transition-colors duration-300
            "
          >
            Welcome back, {profile.firstName} 👋
          </h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate(ROUTES.EDIT_USER)}
              className="
                flex items-center gap-2
                text-white dark:text-black
                bg-[#00B4D8] dark:bg-[#90E0EF]
                hover:bg-[#0077B6] dark:hover:bg-[#0077B6]
                transition-colors duration-300
                px-4 py-2 rounded-lg
              "
            >
              <FiEdit2 /> Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="
                flex items-center gap-2
                text-white
                bg-red-500 hover:bg-red-600
                transition-colors duration-300
                px-4 py-2 rounded-lg
              "
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <ProfileField label="First Name" value={profile.firstName} />
          <ProfileField label="Last Name" value={profile.lastName} />
          <ProfileField label="Email" value={profile.email} />
          <ProfileField label="Phone Number" value={profile.phoneNumber} />
          <ProfileField label="Age" value={profile.age} />
          <ProfileField label="Address" value={profile.address} />
          <ProfileField label="Event Domain" value={profile.eventDomain || "—"} />
          <ProfileField label="Israeli ID" value={profile.israeliID || "—"} />
          <ProfileField label="Role" value={profile.role} />
        </div>

        <div className="mt-8">
          <h2
            className="
              text-2xl font-semibold mb-2
              text-[#0077B6] dark:text-[#90E0EF]
              transition-colors duration-300
            "
          >
            Favorite Suppliers
          </h2>
          <p
            className="
              text-gray-600 dark:text-gray-300
              transition-colors duration-300
            "
          >
            You’ve favorited {user?.favoriteSupplierIds?.length || 0} suppliers.{" "}
            <span
              className="text-[#0077B6] dark:text-[#90E0EF] font-semibold hover:underline cursor-pointer"
              onClick={() => navigate(ROUTES.FAVORITE_SUPPLIER)}
            >
              View them here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

function ProfileField({ label, value }) {
  return (
    <div>
      <p
        className="
          text-sm font-semibold mb-1
          text-[#023E8A] dark:text-[#CAF0F8]
          transition-colors duration-300
        "
      >
        {label}
      </p>
      <div
        className="
          w-full p-3 rounded-md shadow-inner
          bg-[#E0F7FA] dark:bg-gray-700
          border border-[#90E0EF] dark:border-gray-600
          text-[#023E8A] dark:text-[#CAF0F8]
          transition-colors duration-300
        "
      >
        {value}
      </div>
    </div>
  );
}

// src/pages/FavoriteSuppliersPage.jsx
import React, { useEffect, useState } from "react";
import { useUser } from "../../users/providers/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import { FiPhone, FiMail, FiMapPin, FiTag, FiUser } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import BackButton from "../../components/BackButton";
import Loader from "../../components/Loader";
import { getFavoriteSuppliers } from "../services/favoriteSupplier";

export default function FavoriteSuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) {
      console.warn("User not found.");
      return;
    }

    const fetchFavorites = async () => {
      try {
        const data = await getFavoriteSuppliers(user.id);
        setSuppliers(data);
      } catch (err) {
        alert("❌ Failed to load favorite suppliers.");
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const handleView = (id) => {
    navigate(ROUTES.VIEW_SUPPLIER.replace(":id", id));
  };

  if (loading) return <Loader />;

  return (
    <div
      className="
        min-h-screen py-10 px-4 font-cormorant
        bg-gradient-to-br from-[#CAF0F8] via-[#90E0EF] to-[#0077B6]
        dark:from-gray-800 dark:via-gray-700 dark:to-gray-900
        text-black dark:text-white
        transition-colors duration-300
      "
    >
      <BackButton />
      <h1 className="text-5xl font-extrabold text-center mb-10 tracking-wide relative z-10 drop-shadow-lg
                     text-[#03045E] dark:text-[#CAF0F8] transition-colors duration-300">
        <span className="inline-block">
          Your Favorite Suppliers on <span className="text-[#0077B6] dark:text-[#90E0EF]">EventX</span>
        </span>
        <div className="mt-2 text-lg font-semibold tracking-wide text-[#023E8A] dark:text-gray-300 transition-colors duration-300">
          Handpicked by you. Powered by inspiration.
        </div>
      </h1>

      {suppliers.length === 0 ? (
        <p className="text-center font-semibold text-lg text-[#023E8A] dark:text-[#90E0EF] transition-colors duration-300">
          You haven’t favorited any suppliers yet.
        </p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {suppliers.map((supplier) => (
            <div
              key={supplier.id}
              onClick={() => handleView(supplier.id)}
              className="
                relative p-6 rounded-2xl cursor-pointer
                bg-white dark:bg-gray-800
                border border-gray-200 dark:border-gray-700
                shadow-xl hover:shadow-2xl
                transform hover:scale-[1.02]
                transition-all duration-300
                text-black dark:text-white
              "
            >
              <FaHeart size={22} className="absolute top-4 left-4 text-red-500" />

              <h2 className="text-2xl font-bold text-center mb-4
                             text-[#0077B6] dark:text-[#90E0EF] transition-colors duration-300">
                <FiUser className="inline-block mr-2" /> {supplier.name}
              </h2>

              <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm text-center transition-colors duration-300">
                <p className="flex justify-center items-center gap-2">
                  <FiPhone className="text-[#0077B6] dark:text-[#90E0EF]" /> {supplier.phoneNumber}
                </p>
                <p className="flex justify-center items-center gap-2">
                  <FiMail className="text-[#0077B6] dark:text-[#90E0EF]" /> {supplier.email}
                </p>
                <p className="flex justify-center items-center gap-2">
                  <FiMapPin className="text-[#0077B6] dark:text-[#90E0EF]" /> {supplier.address}
                </p>
                <p className="flex justify-center items-center gap-2">
                  <FiTag className="text-[#0077B6] dark:text-[#90E0EF]" /> {supplier.category}
                </p>
              </div>

              {supplier.description && (
                <p className="mt-4 text-sm italic text-center
                               text-gray-500 dark:text-gray-400 transition-colors duration-300">
                  “{supplier.description}”
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

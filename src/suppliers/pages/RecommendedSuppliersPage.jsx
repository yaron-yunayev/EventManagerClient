import React, { useEffect, useState } from "react";
import {
  getRecommendedSuppliers,
  deleteSupplier,
} from "../services/recommendedSupplierService";
import { useUser } from "../../users/providers/UserProvider";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/routesModel";
import BackButton from "../../components/BackButton";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiTag,
  FiUser,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import { toggleFavoriteSupplier } from "../services/favoriteSupplier";

export default function RecommendedSuppliersPage() {
  const [suppliers, setSuppliers] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [error, setError] = useState(null);
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuppliers();
    if (user?.favoriteSupplierIds) {
      setFavoriteIds(user.favoriteSupplierIds);
    }
  }, []);

  const fetchSuppliers = async () => {
    try {
      const data = await getRecommendedSuppliers();
      setSuppliers(data);
      const favs =
        JSON.parse(localStorage.getItem("user"))?.favoriteSupplierIds || [];
      setFavoriteIds(favs);
    } catch (err) {
      setError("Failed to load suppliers: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteSupplier(id);
      setSuppliers((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert("❌ Failed to delete supplier: " + err.message);
    }
  };

  const handleEdit = (id) => {
    navigate(ROUTES.EDIT_SUPPLIER.replace(":id", id));
  };

  const handleView = (id) => {
    navigate(ROUTES.VIEW_SUPPLIER.replace(":id", id));
  };

  const handleToggleFavorite = async (supplierId) => {
    try {
      const isFavorite = favoriteIds.includes(supplierId);
      await toggleFavoriteSupplier(user.id, supplierId, isFavorite);

      const updatedFavorites = isFavorite
        ? favoriteIds.filter((i) => i !== supplierId)
        : [...favoriteIds, supplierId];

      setFavoriteIds(updatedFavorites);

      const updatedUser = {
        ...user,
        favoriteSupplierIds: updatedFavorites,
      };

      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      alert("Failed to update favorite: " + err.message);
    }
  };

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
      <h1
        className="
          text-4xl font-bold text-center
          text-[#023E8A] dark:text-[#90E0EF]
          mb-10 tracking-tight
          transition-colors duration-300
        "
      >
        Recommended Suppliers
      </h1>

      {error && (
        <p className="text-red-500 text-center mb-6 transition-colors duration-300">
          {error}
        </p>
      )}

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {suppliers.map((supplier) => {
          const isFavorite = favoriteIds.includes(supplier.id);
          return (
            <div
              key={supplier.id}
              onClick={() => handleView(supplier.id)}
              className="
                relative p-6 rounded-2xl cursor-pointer
                bg-white dark:bg-gray-800
                border border-gray-100 dark:border-gray-700
                shadow-lg hover:shadow-2xl
                transform hover:scale-[1.02]
                transition-all duration-300
                text-black dark:text-white
              "
            >
              {user?.isEventManager && (
                <div
                  className="absolute top-3 right-3 flex gap-3 z-10"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => handleEdit(supplier.id)}
                    className="
                      text-[#0077B6] dark:text-[#90E0EF]
                      hover:text-[#023E8A] dark:hover:text-white
                      transition-colors duration-200
                    "
                    data-tooltip-id="tooltip-edit"
                    data-tooltip-content="Edit"
                  >
                    <FiEdit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(supplier.id)}
                    className="text-red-500 hover:text-red-700 transition-colors duration-200"
                    data-tooltip-id="tooltip-delete"
                    data-tooltip-content="Delete"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </div>
              )}

              {user && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFavorite(supplier.id);
                  }}
                  className="absolute top-3 left-3 text-red-500 hover:scale-110 transition-transform duration-200"
                  title="Favorite"
                >
                  {isFavorite ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                </button>
              )}

              <Tooltip id="tooltip-edit" />
              <Tooltip id="tooltip-delete" />

              <h2
                className="
                  text-2xl font-bold text-center
                  text-[#0077B6] dark:text-[#90E0EF]
                  mb-4 transition-colors duration-300
                "
              >
                <FiUser className="inline-block mr-2" /> {supplier.name}
              </h2>

              <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm text-center transition-colors duration-300">
                <p className="flex justify-center items-center gap-2">
                  <FiPhone className="text-[#0077B6] dark:text-[#90E0EF]" />
                  {supplier.phoneNumber}
                </p>
                <p className="flex justify-center items-center gap-2">
                  <FiMail className="text-[#0077B6] dark:text-[#90E0EF]" />
                  {supplier.email}
                </p>
                <p className="flex justify-center items-center gap-2">
                  <FiMapPin className="text-[#0077B6] dark:text-[#90E0EF]" />
                  {supplier.address}
                </p>
                <p className="flex justify-center items-center gap-2">
                  <FiTag className="text-[#0077B6] dark:text-[#90E0EF]" />
                  {supplier.category}
                </p>
              </div>

              {supplier.description && (
                <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm italic text-center transition-colors duration-300">
                  “{supplier.description}”
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getRecommendedSuppliers,
  deleteSupplier,
} from "../services/recommendedSupplierService";
import { useUser } from "../../users/providers/UserProvider";
import ROUTES from "../../routes/routesModel";
import BackButton from "../../components/BackButton";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiTag,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { toggleFavoriteSupplier } from "../services/favoriteSupplier";
import { toast } from "react-toastify";

export default function SuppliersByCategoryPage() {
  const { category } = useParams();
  const [suppliers, setSuppliers] = useState([]);
  const [error, setError] = useState(null);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    fetchSuppliers();
  }, [category]);

  useEffect(() => {
    if (user?.favoriteSupplierIds) {
      setFavoriteIds(user.favoriteSupplierIds);
    }
  }, [user]);

  const fetchSuppliers = async () => {
    try {
      const data = await getRecommendedSuppliers();
      const filtered = data.filter(
        (s) => s.category.toLowerCase() === category.toLowerCase()
      );
      setSuppliers(filtered);
    } catch (err) {
      setError("Failed to load suppliers: " + err.message);
    }
  };

  const handleEdit = (id) =>
    navigate(ROUTES.EDIT_SUPPLIER.replace(":id", id));

  const handleDelete = async (id) => {
    try {
      await deleteSupplier(id);
      setSuppliers((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      alert("❌ Failed to delete supplier: " + err.message);
    }
  };

  const handleToggleFavorite = async (supplierId) => {
    try {
      const isFavorite = favoriteIds.includes(supplierId);
      await toggleFavoriteSupplier(user.id, supplierId, isFavorite);

      const updated = isFavorite
        ? favoriteIds.filter((i) => i !== supplierId)
        : [...favoriteIds, supplierId];
      setFavoriteIds(updated);

      const updatedUser = { ...user, favoriteSupplierIds: updated };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    } catch (err) {
      alert("Failed to update favorite: " + err.message);
    }
  };

  const filteredSuppliers = suppliers.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.id.toString().includes(searchTerm)
  );

  return (
    <div
      className="
        relative min-h-screen overflow-hidden font-cormorant
        bg-gradient-to-br from-[#CAF0F8] via-[#90E0EF] to-[#0077B6]
        dark:from-gray-800 dark:via-gray-700 dark:to-gray-900
        bg-[length:200%_200%] animate-gradient
        text-black dark:text-white
        transition-colors duration-300
      "
    >
      <div className="relative z-10 py-10 px-4">
        <BackButton />

        <h1
          className="
            text-4xl font-bold text-center
            text-[#023E8A] dark:text-[#90E0EF]
            mb-6 transition-colors duration-300
          "
        >
          {category} Suppliers
        </h1>

        <div className="flex justify-center mb-10 px-4">
          <input
            type="text"
            placeholder="Search by name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="
              w-full max-w-md p-2 rounded-lg border
              border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-800
              text-gray-800 dark:text-gray-200
              placeholder-gray-500 dark:placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-[#0077B6]
              transition-colors duration-200
            "
          />
        </div>

        {error && (
          <p className="text-red-500 text-center mb-6 transition-colors duration-300">
            {error}
          </p>
        )}

        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {filteredSuppliers.map((supplier) => {
            const isFavorite = favoriteIds.includes(supplier.id);
            return (
              <div
                key={supplier.id}
                onClick={() => {
                  if (user?.isEventManager) {
                    navigate(ROUTES.VIEW_SUPPLIER.replace(":id", supplier.id));
                  }
                }}
                className={`
                  relative p-6 rounded-2xl
                  ${user?.isEventManager ? "cursor-pointer hover:scale-[1.03]" : "cursor-default"}
                  bg-white dark:bg-gray-800
                  border border-gray-200 dark:border-gray-700
                  shadow-xl hover:shadow-2xl
                  transition-all duration-300 transform
                  text-black dark:text-white
                `}
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
                      data-tooltip-id={`edit-${supplier.id}`}
                      data-tooltip-content="Edit Supplier"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <Tooltip id={`edit-${supplier.id}`} />

                    <button
                      onClick={() => handleDelete(supplier.id)}
                      className="text-red-500 hover:text-red-700 transition-colors duration-200"
                      data-tooltip-id={`delete-${supplier.id}`}
                      data-tooltip-content="Delete Supplier"
                    >
                      <FiTrash2 size={18} />
                    </button>
                    <Tooltip id={`delete-${supplier.id}`} />
                  </div>
                )}

                {user?.isEventManager && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleFavorite(supplier.id);
                    }}
                    className="
                      absolute top-3 left-3 text-red-500
                      hover:scale-110 transition-transform duration-200
                    "
                    title="Favorite"
                  >
                    {isFavorite ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                  </button>
                )}

                <h2
                  className="
                    text-xl font-bold text-center
                    text-[#023E8A] dark:text-[#90E0EF]
                    mb-4 transition-colors duration-300
                  "
                >
                  {supplier.name}
                </h2>

                <div className="
                  space-y-2 text-gray-700 dark:text-gray-300
                  text-sm text-center transition-colors duration-300
                ">
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
                  <p className="
                    mt-4 text-gray-500 dark:text-gray-400
                    text-sm italic text-center transition-colors duration-300
                  ">
                    “{supplier.description}”
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

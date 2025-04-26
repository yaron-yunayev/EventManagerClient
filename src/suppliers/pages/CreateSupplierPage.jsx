// src/pages/CreateSupplierPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createSupplier } from "../services/supplierService";
import SupplierForm from "../components/SupplierForm";
import { useUser } from "../../users/providers/UserProvider";
import BackButton from "../../components/BackButton";
import { FiUserPlus } from "react-icons/fi";

export default function CreateSupplierPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.isEventManager) {
      toast.error("❌ Access Denied - Only Event Managers can create suppliers.");
      navigate("/not-found");
    }
  }, [user, navigate]);

  const handleCreateSupplier = async (supplierData) => {
    setLoading(true);
    setError(null);

    try {
      const supplierToSend = {
        ...supplierData,
        category: parseInt(supplierData.category),
        managerId: user.id,
      };
      await createSupplier(supplierToSend);
      toast.success("✅ Supplier added successfully!");
      navigate("/suppliers");
    } catch (err) {
      setError(err.message);
      toast.error(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
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
      <div className="
        max-w-3xl mx-auto p-10 rounded-xl shadow-2xl
        bg-white dark:bg-gray-800
        transition-colors duration-300
      ">
        <div className="mb-6"><BackButton /></div>
        <h1 className="
          text-5xl font-bold text-center mb-10 tracking-wide
          text-transparent bg-clip-text
          bg-gradient-to-r from-[#0077B6] via-[#00B4D8] to-[#90E0EF]
          dark:from-[#90E0EF] dark:to-[#0077B6]
          transition-colors duration-300 drop-shadow-sm uppercase flex items-center justify-center gap-4
        ">
          <FiUserPlus className="text-[#0077B6]" size={40} />
          Add Your New Supplier
        </h1>
        {error && (
          <p className="text-red-500 text-center mb-4 transition-colors duration-300">
            {error}
          </p>
        )}
        <SupplierForm onSubmit={handleCreateSupplier} loading={loading} />
      </div>
    </div>
  );
}

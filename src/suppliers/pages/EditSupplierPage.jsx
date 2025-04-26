// src/pages/EditSupplierPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSupplierById, updateSupplier } from "../services/updateSupplierService";
import SupplierForm from "../components/SupplierForm";
import { toast } from "react-toastify";
import { useUser } from "../../users/providers/UserProvider";
import Loader from "../../components/Loader";
import ROUTES from "../../routes/routesModel";
import BackButton from "../../components/BackButton";

export default function EditSupplierPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (!user?.isEventManager) {
      toast.error("⚠️ Only Event Managers can edit suppliers.");
      navigate(ROUTES.NOT_FOUND);
      return;
    }
    (async () => {
      try {
        const data = await getSupplierById(id);
        setSupplier(data);
      } catch (err) {
        toast.error("❌ Failed to load supplier.");
      } finally {
        setInitialLoading(false);
      }
    })();
  }, [id, user, navigate]);

  const handleUpdate = async (updatedData) => {
    setLoading(true);
    try {
      await updateSupplier(id, updatedData);
      toast.success("✅ Supplier updated successfully!");
      navigate("/suppliers");
    } catch (err) {
      toast.error("❌ Failed to update supplier, please check all fields.");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <Loader />;

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
        <BackButton />
        <h1 className="text-4xl font-bold text-center mb-8
                       text-[#023E8A] dark:text-[#90E0EF]
                       transition-colors duration-300">
          Edit Supplier
        </h1>
        {supplier && (
          <SupplierForm
            onSubmit={handleUpdate}
            loading={loading}
            initialData={supplier}
          />
        )}
      </div>
    </div>
  );
}

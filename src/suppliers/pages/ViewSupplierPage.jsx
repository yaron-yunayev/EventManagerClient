import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSupplierById } from "../services/updateSupplierService";
import { toast } from "react-toastify";
import BackButton from "../../components/BackButton";
import { FiUser, FiPhone, FiMail, FiMapPin, FiTag } from "react-icons/fi";
import Loader from "../../components/Loader";

export default function ViewSupplierPage() {
  const { id } = useParams();
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getSupplierById(id);
        setSupplier(data);
      } catch (err) {
        toast.error("❌ Failed to load supplier.");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <Loader />;
  if (!supplier) return <p className="text-center text-red-600">Supplier not found.</p>;

  return (
    <div
      className="
        min-h-screen py-12 px-4 font-cormorant
        bg-gradient-to-br from-[#CAF0F8] via-[#90E0EF] to-[#0077B6]
        dark:from-gray-800 dark:via-gray-700 dark:to-gray-900
        text-black dark:text-white
        transition-colors duration-300
      "
    >
      <div
        className="
          max-w-3xl mx-auto p-10 relative rounded-2xl shadow-2xl
          bg-white dark:bg-gray-800
          transition-colors duration-300
        "
      >
        <BackButton />

        <h1 className="text-5xl font-bold text-center
                       text-transparent bg-clip-text
                       bg-gradient-to-r from-[#0077B6] via-[#00B4D8] to-[#90E0EF]
                       mb-10 tracking-tight uppercase">
          Supplier Overview
        </h1>

        <div className="space-y-6">
          <InfoBlock icon={<FiUser />}   label="Name"     value={supplier.name} />
          <InfoBlock icon={<FiPhone />}  label="Phone"    value={supplier.phoneNumber} />
          <InfoBlock icon={<FiMail />}   label="Email"    value={supplier.email} />
          <InfoBlock icon={<FiMapPin />} label="Address"  value={supplier.address} />
          <InfoBlock icon={<FiTag />}    label="Category" value={supplier.category} />

          {supplier.description && (
            <div
              className="
                mt-6 p-4 rounded-lg shadow-inner
                bg-[#CAF0F8] dark:bg-gray-700
                transition-colors duration-300
              "
            >
              <h3 className="text-xl font-semibold text-[#023E8A] dark:text-[#CAF0F8] mb-1 transition-colors duration-300">
                Description
              </h3>
              <p className="text-gray-700 dark:text-gray-300 italic transition-colors duration-300">
                {supplier.description}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ icon, label, value }) {
  return (
    <div
      className="
        flex items-center gap-4 p-4
        bg-gray-50 dark:bg-gray-700
        border border-gray-200 dark:border-gray-600
        rounded-lg shadow-sm
        transition-colors duration-300
      "
    >
      <div className="text-[#0077B6] dark:text-[#90E0EF]">{icon}</div>
      <div>
        <p className="text-sm font-semibold text-[#023E8A] dark:text-[#CAF0F8] transition-colors duration-300">
          {label}
        </p>
        <p className="text-lg font-medium text-gray-800 dark:text-gray-200 transition-colors duration-300">
          {value}
        </p>
      </div>
    </div>
  );
}

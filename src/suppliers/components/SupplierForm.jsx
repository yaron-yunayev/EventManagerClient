// src/components/SupplierForm.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const supplierCategories = [
  { label: "Catering", value: 0 },
  { label: "Photographer", value: 1 },
  { label: "Suits", value: 2 },
  { label: "Dresses", value: 3 },
  { label: "Magnets", value: 4 },
  { label: "Jewelry", value: 5 },
  { label: "Transportation", value: 6 },
  { label: "Dj", value: 7 },
  { label: "Florist", value: 8 },
  { label: "Designer", value: 9 },
  { label: "Other", value: 10 },
];

export default function SupplierForm({ onSubmit, loading, initialData = null }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      phoneNumber: "",
      email: "",
      category: "",
      description: "",
      address: "",
    },
    mode: "onChange",
  });

  useEffect(() => {
    if (initialData) {
      const fixedData = {
        ...initialData,
        category:
          typeof initialData.category === "string"
            ? parseInt(initialData.category)
            : initialData.category,
      };
      Object.entries(fixedData).forEach(([key, value]) => {
        setValue(key, value);
      });
    }
  }, [initialData, setValue]);

  const inputClasses = `
    w-full p-3 border rounded-lg
    bg-white dark:bg-gray-700
    text-black dark:text-white
    border-gray-300 dark:border-gray-600
    focus:outline-none focus:ring-2 focus:ring-[#0077B6] dark:focus:ring-[#90E0EF]
    transition-colors duration-300
  `;

  const labelClasses = "block font-semibold mb-1 text-[#023E8A] dark:text-[#CAF0F8] transition-colors duration-300";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className={labelClasses}>Name</label>
          <input
            {...register("name", {
              required: "Supplier Name is required.",
              maxLength: { value: 100, message: "Max 100 characters." },
              pattern: {
                value: /^[a-zA-Zא-ת0-9\s]+$/,
                message: "Only letters and numbers allowed.",
              },
            })}
            placeholder="Full Name"
            className={inputClasses}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div>
          <label className={labelClasses}>Phone Number</label>
          <input
            {...register("phoneNumber", {
              required: "Phone number required.",
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Must be 10 digits.",
              },
            })}
            placeholder="0501234567"
            className={inputClasses}
          />
          {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClasses}>Email</label>
        <input
          {...register("email", {
            required: "Email required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email format.",
            },
          })}
          placeholder="example@email.com"
          className={inputClasses}
        />
        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
      </div>

      <div>
        <label className={labelClasses}>Category</label>
        <select
          {...register("category", {
            required: "Category required.",
            valueAsNumber: true,
          })}
          className={inputClasses.replace("p-3", "p-3 bg-white dark:bg-gray-700")}
        >
          <option value="">-- Select Category --</option>
          {supplierCategories.map((cat) => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>

      <div>
        <label className={labelClasses}>Description</label>
        <textarea
          {...register("description", {
            maxLength: { value: 200, message: "Max 200 characters." },
          })}
          placeholder="Describe the supplier (optional)"
          className={inputClasses}
        />
        {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
      </div>

      <div>
        <label className={labelClasses}>Address</label>
        <input
          {...register("address", {
            required: "Address required.",
            maxLength: { value: 200, message: "Max 200 characters." },
          })}
          placeholder="City, Street, Number"
          className={inputClasses}
        />
        {errors.address && <p className="text-red-500 text-sm">{errors.address.message}</p>}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="
          w-full bg-[#0077B6] hover:bg-[#023E8A] dark:bg-[#90E0EF] dark:hover:bg-[#CAF0F8]
          text-white dark:text-black
          font-bold py-3 rounded-lg
          transition-colors duration-300
        "
      >
        {loading ? "Saving..." : "Save Supplier"}
      </button>
    </form>
  );
}

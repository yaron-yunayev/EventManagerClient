// src/components/EditEventForm.jsx
import React, { useEffect, useState } from "react";
import Select from "react-select";
import { getAllSuppliers } from "../../suppliers/services/supplierget";

export default function EditEventForm({ event, onSubmit }) {
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    location: "",
    description: "",
    numberOfGuests: "",
    managerName: "",
    supplierIds: [],
  });
  const [allSuppliers, setAllSuppliers] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllSuppliers();
        setAllSuppliers(data);
      } catch (err) {
        console.error("❌ Failed to load suppliers:", err);
      }
    })();
  }, []);

  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name,
        date: new Date(event.date).toISOString().split("T")[0],
        location: event.location,
        description: event.description,
        numberOfGuests: event.numberOfGuests,
        managerName: `${event.manager?.firstName || ""} ${event.manager?.lastName || ""}`,
        supplierIds: event.suppliers?.map((s) => s.id) || [],
      });
    }
  }, [event]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const handleSupplierChange = (selected) =>
    setFormData((p) => ({ ...p, supplierIds: selected.map((o) => o.value) }));

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, numberOfGuests: Number(formData.numberOfGuests) });
  };

  const supplierOptions = allSuppliers.map((s) => ({ label: `${s.name} (${s.category})`, value: s.id }));

  return (
    <form
      onSubmit={handleSubmit}
      className="
        bg-white dark:bg-gray-800 text-black dark:text-white
        p-8 rounded-xl shadow-lg max-w-3xl mx-auto space-y-5
        transition-colors duration-300
      "
    >
      <h2 className="
        text-3xl text-center font-bold
        text-[#023E8A] dark:text-[#90E0EF]
        mb-4 transition-colors duration-300
      ">
        Edit Event
      </h2>

      {[
        { label: "Event Name", name: "name", type: "text" },
        { label: "Event Date", name: "date", type: "date" },
        { label: "Location", name: "location", type: "text" },
        { label: "Number of Guests", name: "numberOfGuests", type: "number" },
      ].map((f) => (
        <div key={f.name}>
          <label className="block text-[#023E8A] dark:text-[#CAF0F8] font-semibold mb-1">
            {f.label}
          </label>
          <input
            type={f.type}
            name={f.name}
            value={formData[f.name]}
            onChange={handleChange}
            required
            className="
              w-full p-2 border border-gray-300 dark:border-gray-600
              rounded-md bg-white dark:bg-gray-700
              text-black dark:text-white
              focus:outline-none focus:ring-2 focus:ring-[#0077B6] dark:focus:ring-[#90E0EF]
              transition-colors duration-300
            "
          />
        </div>
      ))}

      <div>
        <label className="block text-[#023E8A] dark:text-[#CAF0F8] font-semibold mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="
            w-full p-2 border border-gray-300 dark:border-gray-600
            rounded-md bg-white dark:bg-gray-700
            text-black dark:text-white
            focus:outline-none focus:ring-2 focus:ring-[#0077B6] dark:focus:ring-[#90E0EF]
            transition-colors duration-300
          "
        />
      </div>

      <div>
        <label className="block text-[#023E8A] dark:text-[#CAF0F8] font-semibold mb-1">
          Manager Name
        </label>
        <input
          type="text"
          value={formData.managerName}
          disabled
          className="
            w-full p-2 border border-gray-200 dark:border-gray-600
            rounded-md bg-gray-100 dark:bg-gray-700
            text-black dark:text-white
            transition-colors duration-300
          "
        />
      </div>

      <div>
        <label className="block text-[#023E8A] dark:text-[#CAF0F8] font-semibold mb-1">
          Suppliers
        </label>
        <Select
          isMulti
          options={supplierOptions}
          value={supplierOptions.filter((o) => formData.supplierIds.includes(o.value))}
          onChange={handleSupplierChange}
        />
      </div>

      <button
        type="submit"
        className="
          w-full bg-[#0077B6] dark:bg-[#90E0EF]
          hover:bg-[#023E8A] dark:hover:bg-[#0077B6]
          text-white dark:text-black
          font-semibold py-2 px-4 rounded-md
          transition-colors duration-300
        "
      >
        Update Event
      </button>
    </form>
  );
}

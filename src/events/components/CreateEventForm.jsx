// src/components/CreateEventForm.jsx
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useUser } from "../../users/providers/UserProvider";

function MapUpdater({ location }) {
  const map = useMap();
  useEffect(() => {
    if (location) map.setView([location.lat, location.lng], 13);
  }, [location, map]);
  return null;
}

export default function CreateEventForm({
  onSubmit,
  address,
  setAddress,
  location,
  setLocation,
  handleSearchAddress,
  loadingSearch,
}) {
  const { user } = useUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onChange" });

  useEffect(() => {
    if (user?.id) setValue("managerId", user.id);
  }, [user?.id, setValue]);

  const submit = (data) => {
    const supplierIdsArray = data.supplierIds
      .split(",")
      .map((id) => parseInt(id.trim()))
      .filter((id) => !isNaN(id));
    onSubmit({
      ...data,
      location: address,
      supplierIds: supplierIdsArray,
      numberOfGuests: parseInt(data.numberOfGuests),
      managerId: parseInt(data.managerId),
    });
  };

  const inputCls = `
    w-full p-2 border rounded-lg
    bg-white dark:bg-gray-700
    text-black dark:text-white
    border-gray-300 dark:border-gray-600
    focus:outline-none focus:ring-2 focus:ring-[#0077B6] dark:focus:ring-[#90E0EF]
    transition-colors duration-300
  `;

  const labelCls = "block text-[#023E8A] dark:text-[#CAF0F8] font-semibold mb-1 transition-colors duration-300";

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="space-y-4">
        <div
          className="overflow-hidden rounded-full border-[6px] border-white shadow-xl mx-auto transition-colors duration-300"
          style={{ width: "300px", height: "300px", position: "sticky", top: "120px", zIndex: 10 }}
        >
          <MapContainer
            center={location ? [location.lat, location.lng] : [51.505, -0.09]}
            zoom={13}
            style={{ width: "100%", height: "100%", borderRadius: "9999px" }}
            scrollWheelZoom={false}
            dragging={false}
            doubleClickZoom={false}
            zoomControl={false}
            attributionControl={false}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            {location && <Marker position={location}><Popup>Selected Location</Popup></Marker>}
            <MapUpdater location={location} />
          </MapContainer>
        </div>

        <label className={labelCls}>Search Address:</label>
        <input
          type="text"
          placeholder="Enter address..."
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={inputCls}
        />
        <button
          type="button"
          onClick={handleSearchAddress}
          className="
            w-full bg-[#0077B6] dark:bg-[#90E0EF]
            hover:bg-[#023E8A] dark:hover:bg-[#0077B6]
            text-white dark:text-black
            font-semibold rounded-lg py-2
            transition-colors duration-300
          "
        >
          {loadingSearch ? "Searching..." : "Search Address"}
        </button>
      </div>

      <form
        onSubmit={handleSubmit(submit)}
        className="
          space-y-5 bg-white dark:bg-gray-800
          p-6 rounded-xl shadow-lg max-w-full
          transition-colors duration-300
        "
      >
        <h2 className="
          text-2xl font-bold text-center mb-4
          text-[#023E8A] dark:text-[#90E0EF]
          transition-colors duration-300
        ">
          Create Event
        </h2>

        {[
          { label: "Event Name", name: "name", type: "text", rules: { required: "Required", maxLength: { value: 20, message: "Max 20 chars." } } },
          { label: "Event Date", name: "date", type: "date", rules: {
              required: "Required",
              validate: (v) => new Date(v) >= new Date() || "Cannot be in the past",
            } },
          { label: "Description", name: "description", type: "textarea", rules: { required: "Required" } },
          { label: "Guests", name: "numberOfGuests", type: "number", rules: { required: "Required", min: { value: 1, message: "At least 1" }, valueAsNumber: true } },
        ].map((f) => (
          <div key={f.name}>
            <label className={labelCls}>{f.label}:</label>
            {f.type === "textarea" ? (
              <textarea
                {...register(f.name, f.rules)}
                className={inputCls}
              />
            ) : (
              <input
                type={f.type}
                {...register(f.name, f.rules)}
                className={inputCls}
              />
            )}
            {errors[f.name] && <p className="text-red-500 text-sm">{errors[f.name].message}</p>}
          </div>
        ))}

        <input type="hidden" {...register("managerId", { required: true, valueAsNumber: true })} />

        <div>
          <label className={labelCls}>Supplier IDs (comma-separated):</label>
          <input {...register("supplierIds")} className={inputCls} />
        </div>

        <div>
          <label className={labelCls}>Auto Location:</label>
          <input
            type="text"
            value={address}
            disabled
            className="
              w-full p-2 bg-gray-100 dark:bg-gray-700
              text-gray-600 dark:text-gray-300
              border border-gray-300 dark:border-gray-600
              rounded-lg transition-colors duration-300
            "
          />
        </div>

        <button
          type="submit"
          className="
            w-full bg-[#0077B6] dark:bg-[#90E0EF]
            hover:bg-[#023E8A] dark:hover:bg-[#0077B6]
            text-white dark:text-black
            font-bold py-2 px-4 rounded-lg
            transition-colors duration-300
          "
        >
          Create Event
        </button>
      </form>
    </div>
  );
}

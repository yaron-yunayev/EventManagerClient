// src/pages/AssignSupplierToEventPage.jsx
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Select from "react-select";
import BackButton from "../../components/BackButton";
import { useNavigate } from "react-router-dom";
import { getRecommendedSuppliers } from "../../suppliers/services/recommendedSupplierService";
import { getMyEvents } from "../services/getMyEvents";
import { assignSuppliersToEvent } from "../services/assignService";
import ROUTES from "../../routes/routesModel";

export default function AssignSupplierToEventPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [events, setEvents] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [selectedEventId, setSelectedEventId] = useState("");
  const [selectedSupplierOptions, setSelectedSupplierOptions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("user"));
    setUser(stored);
  }, []);

  useEffect(() => {
    if (user) {
      if (!user.isEventManager) {
        toast.error("⚠️ Only Event Managers can access this page.");
        navigate(ROUTES.HOME);
      } else {
        fetchEventsAndSuppliers();
      }
    }
  }, [user, navigate]);

  const fetchEventsAndSuppliers = async () => {
    try {
      const [e, s] = await Promise.all([getMyEvents(), getRecommendedSuppliers()]);
      setEvents(e || []);
      setSuppliers(s || []);
    } catch {
      toast.error("❌ Failed to load events or suppliers.");
    }
  };

  const handleAssign = async () => {
    if (!selectedEventId || !selectedSupplierOptions.length) {
      toast.warning("Please select an event and at least one supplier.");
      return;
    }
    try {
      setLoading(true);
      await assignSuppliersToEvent({
        eventId: parseInt(selectedEventId),
        supplierIds: selectedSupplierOptions.map((s) => s.value),
      });
      toast.success("✅ Suppliers assigned successfully!");
      setTimeout(() => navigate("/my-events"), 500);
    } catch (err) {
      toast.error("❌ Failed to assign suppliers: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const supplierOptions = suppliers.map((s) => ({
    label: `${s.name} (${s.category})`,
    value: s.id,
  }));

  return (
    <div
      className="
        min-h-screen py-10 px-4 font-cormorant
        bg-gradient-to-br from-[#CAF0F8] via-white to-[#90E0EF]
        dark:from-gray-800 dark:via-gray-700 dark:to-gray-900
        text-black dark:text-white
        transition-colors duration-300
      "
    >
      <div
        className="
          max-w-3xl mx-auto p-10 rounded-xl shadow-2xl
          bg-white dark:bg-gray-800
          transition-colors duration-300
        "
      >
        <BackButton />
        <h1
          className="
            text-4xl font-bold text-center mb-8
            text-[#023E8A] dark:text-[#CAF0F8]
            transition-colors duration-300
          "
        >
          Assign Suppliers to Event
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block mb-2 text-sm font-semibold text-[#023E8A] dark:text-[#CAF0F8] transition-colors duration-300">
              Select Event:
            </label>
            <select
              value={selectedEventId}
              onChange={(e) => setSelectedEventId(e.target.value)}
              className="
                w-full p-2 rounded-lg shadow-sm
                bg-white dark:bg-gray-700
                text-black dark:text-white
                border border-gray-300 dark:border-gray-600
                focus:outline-none focus:ring-2 focus:ring-[#0077B6] dark:focus:ring-[#90E0EF]
                transition-colors duration-300
              "
            >
              <option value="">-- Choose an Event --</option>
              {events.map((ev) => (
                <option key={ev.id} value={ev.id}>
                  {ev.name} ({new Date(ev.date).toLocaleDateString()})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-[#023E8A] dark:text-[#CAF0F8] transition-colors duration-300">
              Select Suppliers:
            </label>
            <Select
              isMulti
              options={supplierOptions}
              value={selectedSupplierOptions}
              onChange={setSelectedSupplierOptions}
              className="react-select-container"
              classNamePrefix="react-select"
            />
          </div>

          <button
            onClick={handleAssign}
            disabled={loading}
            className="
              w-full py-2 rounded-lg font-bold
              bg-[#0077B6] dark:bg-[#90E0EF]
              hover:bg-[#023E8A] dark:hover:bg-[#0077B6]
              text-white dark:text-black
              transition-colors duration-300
              disabled:opacity-60
            "
          >
            {loading ? "Assigning..." : "Assign Suppliers"}
          </button>
        </div>
      </div>
    </div>
  );
}

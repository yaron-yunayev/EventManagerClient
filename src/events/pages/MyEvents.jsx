// src/pages/MyEvents.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getMyEvents } from "../services/getMyEvents";
import { deleteEvent } from "../services/deleteEvent";
import { useUser } from "../../users/providers/UserProvider";
import Loader from "../../components/Loader";
import SearchBar from "../../components/SearchBar";
import ROUTES from "../../routes/routesModel";
import BackButton from "../../components/BackButton";
import {
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiUser,
  FiFileText,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

export default function MyEvents() {
  const navigate = useNavigate();
  const { user, token } = useUser();
  const [events, setEvents] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.isEventManager) {
      toast.error("❌ Access Denied - Only Event Managers can view this page.");
      navigate("/not-found");
      return;
    }

    const fetchEvents = async () => {
      try {
        const myEvents = await getMyEvents();
        setEvents(myEvents);
        setFiltered(myEvents);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [user, navigate]);

  const handleSearch = (term) => {
    if (!term) {
      setFiltered(events);
    } else {
      const t = term.toLowerCase();
      setFiltered(
        events.filter(
          (e) =>
            String(e.id).includes(t) ||
            e.name.toLowerCase().includes(t)
        )
      );
    }
  };

  const handleDelete = async (eventId) => {
    if (!window.confirm("Are you sure you want to delete this event?")) return;

    try {
      await deleteEvent(eventId, token);
      setEvents((prev) => prev.filter((e) => e.id !== eventId));
      setFiltered((prev) => prev.filter((e) => e.id !== eventId));
      toast.success("✅ Event deleted successfully!");
    } catch {
      toast.error("❌ Failed to delete event.");
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div
      className="
        min-h-screen py-10 px-6 font-cormorant
        bg-gradient-to-br from-[#CAF0F8] via-[#90E0EF] to-[#0077B6]
        dark:from-gray-800 dark:via-gray-700 dark:to-gray-900
        text-black dark:text-white
        transition-colors duration-300
      "
    >
      <div className="max-w-6xl mx-auto">
        <BackButton className="mb-6" />

        {/* Search bar */}
        <SearchBar
          onSearch={handleSearch}
          placeholder="Search by event name or ID…"
          className="mb-8"
        />

        <h1
          className="
            text-4xl font-bold text-center
            text-[#023E8A] dark:text-[#90E0EF]
            mb-12 transition-colors duration-300
          "
        >
          My Events
        </h1>

        {filtered.length === 0 ? (
          <p className="text-center text-gray-700 dark:text-gray-300 text-lg">
            No events found.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((event) => (
              <div
                key={event.id}
                className="
                  flex flex-col justify-between p-6 rounded-xl shadow-lg
                  bg-white dark:bg-gray-800
                  border border-gray-100 dark:border-gray-700
                  hover:shadow-2xl transition-all
                  text-black dark:text-white
                "
              >
                <div>
                  <h2 className="text-2xl font-bold text-[#0077B6] dark:text-[#90E0EF] mb-4 text-center">
                    {event.name}
                  </h2>
                  <div className="space-y-2 text-gray-700 dark:text-gray-300 text-sm">
                    <p className="flex items-center gap-2">
                      <FiCalendar className="text-[#0077B6] dark:text-[#90E0EF]" />
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiMapPin className="text-[#0077B6] dark:text-[#90E0EF]" />
                      {event.location}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiFileText className="text-[#0077B6] dark:text-[#90E0EF]" />
                      {event.description}
                    </p>
                    <p className="flex items-center gap-2">
                      <FiUsers className="text-[#0077B6] dark:text-[#90E0EF]" />
                      {event.numberOfGuests} guests
                    </p>
                    <p className="flex items-center gap-2">
                      <FiUser className="text-[#0077B6] dark:text-[#90E0EF]" />
                      {event.manager?.firstName} {event.manager?.lastName}
                    </p>
                  </div>
                  {event.suppliers?.length > 0 && (
                    <div className="mt-4">
                      <p className="font-semibold text-gray-800 dark:text-gray-200">
                        Suppliers:
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
                        {event.suppliers.map((s) => (
                          <li key={s.id}>
                            {s.name} ({s.category})
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
                <div className="flex justify-end gap-4 items-center mt-6">
                  <button
                    onClick={() =>
                      navigate(ROUTES.EDIT_EVENT.replace(":id", event.id))
                    }
                    className="text-[#0077B6] dark:text-[#90E0EF] hover:text-[#023E8A] dark:hover:text-white transition-colors duration-200"
                    data-tooltip-id={`edit-${event.id}`}
                    data-tooltip-content="Edit Event"
                  >
                    <FiEdit2 size={20} />
                  </button>
                  <Tooltip id={`edit-${event.id}`} />
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="text-[#023E8A] dark:text-white hover:text-red-500 transition-colors duration-200"
                    data-tooltip-id={`delete-${event.id}`}
                    data-tooltip-content="Delete Event"
                  >
                    <FiTrash2 size={20} />
                  </button>
                  <Tooltip id={`delete-${event.id}`} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

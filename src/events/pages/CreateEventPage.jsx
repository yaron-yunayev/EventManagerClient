// src/pages/CreateEventPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "../../users/providers/UserProvider";
import { createEvent } from "../services/eventService";
import Loader from "../../components/Loader";
import CreateEventForm from "../components/CreateEventForm";
import "leaflet/dist/leaflet.css";
import BackButton from "../../components/BackButton";
import { FiCalendar } from "react-icons/fi";

export default function CreateEventPage() {
  const navigate = useNavigate();
  const { user, token } = useUser();
  const [loadingEvent, setLoadingEvent] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!user?.isEventManager) {
      toast.error("❌ Access Denied - Only Event Managers can create events.");
      navigate("/not-found");
    }
  }, [user, navigate]);

  const handleCreateEvent = async (eventData) => {
    setLoadingEvent(true);
    try {
      if (!token) {
        toast.error("❌ You must be logged in!");
        setLoadingEvent(false);
        return;
      }
      if (location) {
        eventData.location = address;
      }
      await createEvent(eventData, token);
      toast.success("🎉 Event Created Successfully!");
      setTimeout(() => {
        setLoadingEvent(false);
        navigate("/");
      }, 2000);
    } catch (err) {
      toast.error(`❌ ${err.message}`);
      setLoadingEvent(false);
    }
  };

  const handleSearchAddress = async () => {
    if (!address) {
      toast.error("❌ Please enter an address.");
      return;
    }
    setLoadingSearch(true);
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
      );
      const data = await res.json();
      if (data && data.length) {
        const { lat, lon } = data[0];
        setLocation({ lat, lng: lon });
        const rev = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
        );
        const revData = await rev.json();
        setAddress(revData.display_name || "Address not available");
      } else {
        toast.error("❌ Address not found.");
      }
    } catch {
      toast.error("❌ Error searching address.");
    } finally {
      setLoadingSearch(false);
    }
  };

  if (loadingEvent) return <Loader />;

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
      <div
        className="
          max-w-6xl mx-auto p-10 rounded-xl shadow-2xl
          bg-white dark:bg-gray-800
          transition-colors duration-300
        "
      >
        <BackButton className="mb-6" />
        <h2
          className="
            text-4xl font-bold text-center mb-10 tracking-wide
            text-transparent bg-clip-text
            bg-gradient-to-r from-[#0077B6] via-[#00B4D8] to-[#90E0EF]
            dark:from-[#90E0EF] dark:to-[#0077B6]
            transition-colors duration-300
            flex items-center justify-center gap-3
          "
        >
          <FiCalendar className="text-[#0077B6] dark:text-[#90E0EF]" size={36} />
          Let's Plan Your Next Event with EventX
        </h2>
        <CreateEventForm
          onSubmit={handleCreateEvent}
          address={address}
          setAddress={setAddress}
          location={location}
          setLocation={setLocation}
          handleSearchAddress={handleSearchAddress}
          loadingSearch={loadingSearch}
        />
      </div>
    </div>
  );
}

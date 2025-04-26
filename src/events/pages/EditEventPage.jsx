// src/pages/EditEventPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import EditEventForm from "../components/EditEventForm";
import { getEventById, updateEvent } from "../services/editevent";
import { useUser } from "../../users/providers/UserProvider";
import ROUTES from "../../routes/routesModel";
import BackButton from "../../components/BackButton";

export default function EditEventPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!user?.isEventManager) {
      toast.error("⚠️ You are not authorized to access this page.");
      navigate(ROUTES.NOT_FOUND);
      return;
    }
    (async () => {
      try {
        const fetchedEvent = await getEventById(id);
        setEvent(fetchedEvent);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [id, user, navigate]);

  const handleUpdate = async (updatedEvent) => {
    try {
      await updateEvent(id, updatedEvent);
      toast.success("✅ Event updated successfully!");
      navigate(ROUTES.MY_EVENTS);
    } catch (err) {
      toast.error(`❌ Error updating event: ${err.message}`);
    }
  };

  if (loading) return <Loader />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="
      min-h-screen py-10 px-4 font-cormorant
      bg-gradient-to-br from-[#90E0EF] via-[#CAF0F8] to-white
      dark:from-gray-800 dark:via-gray-700 dark:to-gray-900
      text-black dark:text-white
      transition-colors duration-300
    ">
      <div className="max-w-4xl mx-auto">
        <BackButton className="mb-6" />
        <EditEventForm event={event} onSubmit={handleUpdate} />
      </div>
    </div>
  );
}

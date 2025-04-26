const API_URL = "https://localhost:7245/Event";

// קבלת אירוע לפי ID
export async function getEventById(eventId) {
  try {
    const response = await fetch(`${API_URL}/${eventId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch event details.");
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching event:", error);
    throw error;
  }
}

// עדכון אירוע
export async function updateEvent(eventId, eventData) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("User is not authenticated.");

    const response = await fetch(`${API_URL}/${eventId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error("Failed to update event.");
    }
  } catch (error) {
    console.error("❌ Error updating event:", error);
    throw error;
  }
}

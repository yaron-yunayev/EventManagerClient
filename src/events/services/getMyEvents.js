const API_URL = "https://localhost:7245/Event";

export async function getMyEvents() {
  try {
    const token = localStorage.getItem("token");
    const userData = JSON.parse(localStorage.getItem("user"));
    const userId = userData?.id;

    if (!userId) throw new Error("❌ No user ID found in localStorage");

    const response = await fetch(`${API_URL}/manager/${userId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(`Failed to fetch events: ${errorData}`);
    }

    return await response.json();
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    throw error;
  }
}

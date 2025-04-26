const API_URL = "https://localhost:7245/Event";

export async function deleteEvent(id, token) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(errorData || "Delete failed");
  }
}

const API_URL = "https://localhost:7245/User";

export async function updateUserProfile(userId, updatedData) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_URL}/update/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(updatedData),
  });

  if (!res.ok) throw new Error(await res.text());
  return await res.json(); // מחזיר את ה־UserResponseDto
}

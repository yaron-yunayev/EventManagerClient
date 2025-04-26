const API_URL = "https://localhost:7245/auth";

export async function loginUser(userData) {
  try {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }

    const data = await response.json();
    console.log("🔹 Server Response:", data);

    if (!data || !data.token || !data.email || !data.role) {
      throw new Error("❌ Invalid login response. Missing user data.");
    }

    return data;
  } catch (error) {
    console.error("❌ Login failed:", error);
    throw error;
  }
}

const API_URL = "https://localhost:7245/auth";

export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }

    return await response.json(); 
  } catch (error) {
    throw error;
  }
}

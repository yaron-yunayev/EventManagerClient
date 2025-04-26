const API_URL = "https://localhost:7245/Suppliers";

// ✅ שליפה של ספק לפי מזהה
export async function getSupplierById(id) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized: No token found.");

    const response = await fetch(`${API_URL}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch supplier.");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
}

// ✅ עדכון ספק קיים
export async function updateSupplier(id, updatedData) {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("Unauthorized: No token found.");

    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText);
    }

    return; 
  } catch (error) {
    throw error;
  }
}

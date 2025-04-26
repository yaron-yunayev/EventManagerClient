const API_URL = "https://localhost:7245/Suppliers";

export async function createSupplier(supplierData) {
  try {
    // 🔥 קבלת הטוקן מה-LocalStorage
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ הוספת טוקן
      },
      body: JSON.stringify(supplierData),
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

const API_URL = "https://localhost:7245/Suppliers";

export async function getRecommendedSuppliers() {
  const response = await fetch(API_URL);
  if (!response.ok) throw new Error("Failed to fetch suppliers");
  return await response.json();
}

export async function deleteSupplier(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
    headers: {
      "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
  });
  if (!response.ok) throw new Error("Failed to delete supplier");
}

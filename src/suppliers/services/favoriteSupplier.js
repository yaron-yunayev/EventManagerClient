const API_URL = "https://localhost:7245/User";

export async function toggleFavoriteSupplier(userId, supplierId, isFavorite) {
  const token = localStorage.getItem("token");

  const method = isFavorite ? "DELETE" : "POST";

  const res = await fetch(`${API_URL}/${userId}/favorites/${supplierId}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error(await res.text());
  return await res.text(); // או json אם אתה מעדיף
}
export async function getFavoriteSuppliers(userId) {
    const token = localStorage.getItem("token");
  
    const res = await fetch(`https://localhost:7245/User/${userId}/favorites`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!res.ok) throw new Error(await res.text());
    return await res.json();
  }
  

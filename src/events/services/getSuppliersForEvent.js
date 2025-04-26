export const getSuppliersForEvent = async (eventId, token) => {
    const response = await fetch(`https://localhost:7245/Event/${eventId}/suppliers`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
  
    return await response.json();
  };
  
export async function assignSuppliersToEvent(data) {
    const token = localStorage.getItem("token");
  
    // ודא ש- `eventId` ו-`supplierIds` תקינים
    if (!data.eventId || !data.supplierIds || data.supplierIds.length === 0) {
      throw new Error("Event ID and Supplier IDs are required.");
    }
  
    const response = await fetch("https://localhost:7245/Event/assign-suppliers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(errText);
    }
  
    return await response.text();
  }
  
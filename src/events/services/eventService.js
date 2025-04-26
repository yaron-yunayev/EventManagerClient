const API_URL = "https://localhost:7245/Event"; // ודא שזה הנתיב הנכון

export async function createEvent(eventData, token) {
  try {
    console.log("📤 Sending event data:", eventData);

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // שליחת טוקן לאימות
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      const errorData = await response.text();
      throw new Error(errorData);
    }

    const responseData = await response.json();
    console.log("✅ Event Created:", responseData);
    return responseData;
  } catch (error) {
    console.error("❌ API Error:", error);
    throw error;
  }
}


const API_URL = "https://localhost:7245/Suppliers"; 

export async function getAllSuppliers() {
  try {
    const response = await fetch(API_URL); 
    if (!response.ok) {
      throw new Error("Failed to fetch suppliers");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("❌ Error fetching suppliers:", error);
    throw error;
  }
}

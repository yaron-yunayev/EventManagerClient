// src/users/services/userService.js
export async function getUserById(id) {
    const token = localStorage.getItem("token");
  
    const response = await fetch(`https://localhost:7245/user/get/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to fetch user profile.");
    }
  
    return await response.json();
  }
  
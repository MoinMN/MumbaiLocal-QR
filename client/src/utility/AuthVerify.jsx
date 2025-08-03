export const isAuthenticated = async () => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/check-auth`, {
      method: "GET",
      credentials: "include", // Ensure cookies are sent with the request
    });
    const data = await response.json();
    return data.isAuthenticated; // Returns true or false
  } catch (error) {
    console.error("Error checking authentication:", error);
    return false;
  }
};

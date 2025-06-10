// lib/api.js
export async function fetchClients() {
  try {
    // --- CHANGE THIS LINE ---
    const response = await fetch('https://onboardingform-ten.vercel.app/api/clients');
    // --- TO THIS LINE ---

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data.clients;
  } catch (error) {
    console.error("Failed to fetch clients:", error);
    throw error; // Re-throw the error so the component can catch and display it
  }
}


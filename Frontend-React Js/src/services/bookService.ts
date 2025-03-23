import axios from "axios";

const API_URL = "http://localhost:8080/api/books";

export const getBooks = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};

export const deleteBook = async (id: string) => {
    try {
      console.log(`Sending DELETE request to: ${API_URL}/${id}`);
  
      const response = await axios.delete(`${API_URL}/${id}`, {
        headers: { "Content-Type": "application/json" }
      });
  
      console.log("Book deleted successfully");
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.error("Axios Error deleting book:", error.response?.data || error.message);
      } else {
        console.error("Unknown error deleting book:", error);
      }
      throw error;
    }
  };

  

export const updateBookStatus = async (id: string, status: "AVAILABLE" | "BORROWED") => {
    try {
      const response = await axios.patch(`${API_URL}/${id}/status`, { status });
      console.log("API Response:", response.data);  // Debugging
      return response.data;
    } catch (error) {
      console.error("Error updating status:", error);
      throw error;
    }
};

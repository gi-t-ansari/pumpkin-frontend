import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getOnlineUsers = async (token) => {
  try {
    const response = await api.get("/users/online", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching online users:",
      error.response?.data || error.message
    );
    return [];
  }
};

export const sendMessage = async (receiverId, message, token) => {
  try {
    const response = await api.post(
      "/messages/send",
      { receiverId, message },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error sending message:",
      error.response?.data || error.message
    );
    return null;
  }
};

export const getChatHistory = async (userId, token) => {
  try {
    const response = await api.get(`/messages/history/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching chat history:",
      error.response?.data || error.message
    );
    return [];
  }
};

export const fetchOfflineMessages = async (token) => {
  try {
    const response = await api.get("/messages/offline", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching offline messages:",
      error.response?.data || error.message
    );
    return [];
  }
};

export default api;

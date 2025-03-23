import axios from "axios";

const API_URL = "http://localhost:8080/api/auth";


export const registerUser = async (username: string, password: string, role: string) => {
  return axios.post(`${API_URL}/register`, { username, password, role });
};

export const loginUser = async (username: string, password: string) => {
  return axios.post(`${API_URL}/login`, { username, password });
};


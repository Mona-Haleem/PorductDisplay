import { API_BASE } from "@/utils/CONSTANTS";
import { loginCredentials } from "@/utils/types/auth";
import axios from "axios";


export const login = async (credentials: loginCredentials) => {
  const response = await axios.post(`${API_BASE}/auth/login`, credentials);
  return response.data;
};


export const getMe = async (accessToken: string) => {
    console.log("fetching user data");
  
  const response = await axios.get(`${API_BASE}/auth/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response.data;
};

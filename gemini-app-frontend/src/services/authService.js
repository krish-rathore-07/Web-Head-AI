import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

export const registerUser = async (userData) => {
  const response = await axios.post(
    `${API_URL}/api/auth/register`,
    userData
  );

  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await axios.post(
    `${API_URL}/api/auth/login`,
    credentials
  );

  return response.data;
};

export const loginWithGoogle = async (credential) => {
  const response = await axios.post(
    `${API_URL}/api/auth/google`,
    {
      credential,
    }
  );

  return response.data;
};
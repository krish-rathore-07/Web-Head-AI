import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("webHeadToken");

  if (token) {
    config.headers.Authorization =
      `Bearer ${token}`;
  }

  return config;
});

export const askQuestion = async (question) => {
  const response = await api.post(
    "/api/qna/ask",
    {
      question,
    }
  );

  const data =
    typeof response.data === "string"
      ? JSON.parse(response.data)
      : response.data;

  const answer =
    data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!answer) {
    throw new Error(
      "No answer received from Gemini"
    );
  }

  return answer;
};
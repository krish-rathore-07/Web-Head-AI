import api from "./api";

// Get all chats belonging to the logged-in user
export const getChats = async () => {
  const response = await api.get("/api/chats");
  return response.data;
};

// Create a new chat
export const createChat = async (title = "New Chat") => {
  const response = await api.post("/api/chats", {
    title,
  });

  return response.data;
};

// Get all messages of a specific chat
export const getChatMessages = async (chatId) => {
  const response = await api.get(
    `/api/chats/${chatId}/messages`
  );

  return response.data;
};

// Ask a question inside a chat
export const askQuestionInChat = async (
  chatId,
  question
) => {
  const response = await api.post(
    `/api/chats/${chatId}/ask`,
    {
      question,
    }
  );

  return response.data;
};

export const deleteChat = async (
  chatId
) => {
  await api.delete(
    `/api/chats/${chatId}`
  );
};

export const renameChat = async (
  chatId,
  title
) => {
  const response = await api.patch(
    `/api/chats/${chatId}`,
    {
      title,
    }
  );

  return response.data;
};


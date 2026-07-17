import {
  useEffect,
  useState,
} from "react";
import { Menu } from "lucide-react";
import Sidebar from "../components/Sidebar";
import WelcomeScreen from "../components/WelcomeScreen";
import MessageList from "../components/MessageList";
import ChatInput from "../components/ChatInput";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import getErrorMessage from "../utils/getErrorMessage";

import {
  askQuestionInChat,
  createChat,
  deleteChat,
  getChatMessages,
  getChats,
  renameChat,
} from "../services/chatService";

function ChatPage() {
  const [chats, setChats] = useState([]);

  const [activeChatId, setActiveChatId] =
    useState(null);

  const [messages, setMessages] =
    useState([]);

  const [isLoading, setIsLoading] =
    useState(false);

  const [isLoadingChats, setIsLoadingChats] =
    useState(true);

    const [isSidebarOpen, setIsSidebarOpen] =
  useState(false);
  // --------------------------------
  // Load chats when page opens
  // --------------------------------

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      setIsLoadingChats(true);

      const data = await getChats();

      setChats(data);
    } catch (error) {
      console.error(
        "Failed to load chats:",
        error
      );
    } finally {
      setIsLoadingChats(false);
    }
  };

  // --------------------------------
  // Create a new chat
  // --------------------------------

  const handleNewChat = () => {
  // Remove the currently selected chat
  setActiveChatId(null);

  // Clear messages and show the welcome screen
  setMessages([]);

  // Close the sidebar on mobile
  setIsSidebarOpen(false);
};

  // --------------------------------
  // Open an existing chat
  // --------------------------------

  const handleSelectChat = async (
    chatId
  ) => {
    try {
      setActiveChatId(chatId);

      setIsLoading(true);

      const data =
        await getChatMessages(chatId);

      setMessages(data);
    } catch (error) {
      console.error(
        "Failed to load messages:",
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  // --------------------------------
  // Send a message
  // --------------------------------

const handleSendMessage = async (question) => {
  if (!question.trim() || isLoading) {
    return;
  }

  let temporaryUserMessage = null;

  try {
    setIsLoading(true);

    let chatId = activeChatId;

    // Create chat if needed
    if (!chatId) {
      const newChat = await createChat("New Chat");

      chatId = newChat.id;

      setActiveChatId(chatId);

      setChats((previousChats) => [
        newChat,
        ...previousChats,
      ]);
    }

    // Show user message immediately
    temporaryUserMessage = {
      id: `temp-user-${Date.now()}`,
      role: "user",
      content: question,
      createdAt: new Date().toISOString(),
    };

    setMessages((previousMessages) => [
      ...previousMessages,
      temporaryUserMessage,
    ]);

    // Normal API call
    await askQuestionInChat(chatId, question);

    // Load actual messages from database
    const savedMessages = await getChatMessages(chatId);

    setMessages(savedMessages);

    await loadChats();

  } catch (error) {

    console.error("Failed to get AI response:", error);

    if (temporaryUserMessage) {
      setMessages((previousMessages) =>
        previousMessages.filter(
          (message) =>
            message.id !== temporaryUserMessage.id
        )
      );
    }

    toast.error(
      getErrorMessage(
        error,
        "Failed to get AI response"
      )
    );

  } finally {
    setIsLoading(false);
  }
};

const handleDeleteChat = (chatId) => {
  toast.custom(
    (t) => (
      <div
        className={`
          w-[420px] max-w-[calc(100vw-24px)]
          overflow-hidden
          rounded-3xl
          border border-red-500/15
          bg-gradient-to-br
          from-[#111111]
          via-[#151515]
          to-[#0b0b0b]
          p-5
          shadow-[0_20px_60px_rgba(0,0,0,0.6)]
          backdrop-blur-xl
          transition-all duration-300
          ${
            t.visible
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-3 scale-95 opacity-0"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 ring-1 ring-red-500/20">
            <Trash2
              size={22}
              className="text-red-400"
            />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <h3 className="text-base font-semibold text-white">
              Delete this chat?
            </h3>

            <p className="mt-2 text-sm leading-6 text-zinc-400">
              This conversation will be permanently deleted.
              <br />
              This action cannot be undone.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-white/5" />

        {/* Buttons */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          {/* Cancel */}
          <button
            onClick={() => toast.dismiss(t.id)}
            className="
              w-full
              rounded-2xl
              border border-white/10
              px-5 py-3
              text-sm font-medium
              text-zinc-300
              transition-all duration-300
              hover:border-white/20
              hover:bg-white/5
              hover:text-white
              sm:w-auto
            "
          >
            Cancel
          </button>

          {/* Delete */}
          <button
            onClick={async () => {
              toast.dismiss(t.id);

              const loadingToast =
                toast.loading("Deleting chat...");

              try {
                await deleteChat(chatId);

                setChats((previousChats) =>
                  previousChats.filter(
                    (chat) => chat.id !== chatId
                  )
                );

                if (activeChatId === chatId) {
                  setActiveChatId(null);
                  setMessages([]);
                }

                toast.success(
                  "Chat deleted successfully",
                  {
                    id: loadingToast,
                  }
                );
              } catch (error) {
                console.error(
                  "Failed to delete chat:",
                  error
                );

                toast.error(
                  getErrorMessage(
                    error,
                    "Failed to delete chat"
                  ),
                  {
                    id: loadingToast,
                  }
                );
              }
            }}
            className="
              w-full
              rounded-2xl
              bg-gradient-to-r
              from-red-700
              via-red-600
              to-red-500
              px-5 py-3
              text-sm font-semibold
              text-white
              shadow-lg shadow-red-900/30
              transition-all duration-300
              hover:-translate-y-0.5
              hover:shadow-red-700/40
              active:scale-95
              sm:w-auto
            "
          >
            Delete Chat
          </button>
        </div>
      </div>
    ),
    {
      duration: Infinity,
    }
  );
};

const handleRenameChat = async (
  chatId,
  newTitle
) => {
  const cleanTitle = newTitle.trim();

  if (!cleanTitle) {
    toast.error(
      "Chat title cannot be empty"
    );

    return;
  }

  const loadingToast =
    toast.loading("Renaming chat...");

  try {
    const updatedChat =
      await renameChat(
        chatId,
        cleanTitle
      );

    // Update only the renamed chat
    // in the frontend state
    setChats((previousChats) =>
      previousChats.map((chat) =>
        chat.id === chatId
          ? updatedChat
          : chat
      )
    );

    toast.success(
      "Chat renamed successfully",
      {
        id: loadingToast,
      }
    );
  } catch (error) {
    console.error(
      "Failed to rename chat:",
      error
    );

    toast.error(
    getErrorMessage(
      error,
      "Failed to rename chat"
    ),
    {
      id: loadingToast,
    }
  );
  }
};

return (
  <div className="flex h-screen overflow-hidden bg-gradient-to-br from-[#050505] via-[#0b0b0b] to-black text-white">
    <Sidebar
      chats={chats}
      activeChatId={activeChatId}
      onNewChat={handleNewChat}
      onSelectChat={handleSelectChat}
      onRenameChat={handleRenameChat}
      onDeleteChat={handleDeleteChat}
      isLoadingChats={isLoadingChats}
      isOpen={isSidebarOpen}
      onClose={() => setIsSidebarOpen(false)}
    />

    <main className="relative flex min-w-0 flex-1 flex-col overflow-hidden">

      {/* Mobile Header */}
<div className="flex items-center justify-between border-b border-red-500/10 px-4 py-3 md:hidden">
  <button
    onClick={() => setIsSidebarOpen(true)}
    className="
      rounded-xl
      border border-white/10
      bg-white/5
      p-2.5
      text-white
      transition
      hover:bg-white/10
    "
  >
    <Menu size={22} />
  </button>

  <h2 className="text-sm font-semibold">
    Web Head AI
  </h2>

  <div className="w-10" />
</div>
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-red-600/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full bg-red-500/5 blur-3xl" />
      </div>

      {/* Chat Area */}
      <div className="relative flex-1 overflow-hidden">
        {messages.length === 0 ? (
          <WelcomeScreen
            onPromptClick={handleSendMessage}
          />
        ) : (
          <MessageList
            messages={messages}
            isLoading={isLoading}
          />
        )}
      </div>

      {/* Chat Input */}
      <div className="relative border-t border-red-500/10 bg-black/30 backdrop-blur-xl">
        <ChatInput
          onSend={handleSendMessage}
          disabled={isLoading}
        />
      </div>
    </main>
  </div>
);
}

export default ChatPage;
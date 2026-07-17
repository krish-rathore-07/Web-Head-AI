import {
  Edit3,
  LogOut,
  MessageSquare,
  MessageSquarePlus,
  MoreHorizontal,
  Sparkles,
  Settings,
  Trash2,
  X,
} from "lucide-react";

import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Sidebar = ({
  chats = [],
  activeChatId,
  onNewChat,
  onSelectChat,
  onRenameChat,
  onDeleteChat,
  isLoadingChats = false,
  isOpen = false,
  onClose,
}) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);

  const [renamingChatId, setRenamingChatId] = useState(null);

  const [renameValue, setRenameValue] = useState("");

  const handleNewChat = () => {
    onNewChat?.();

    // Close sidebar on mobile
    onClose?.();
  };

  const handleSelectChat = (chatId) => {
    onSelectChat?.(chatId);

    // Close sidebar on mobile
    onClose?.();
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          onClick={onClose} className="fixed inset-0 z-40 bg-black/60 md:hidden" />
      )}
      {/* Sidebar */}
     <aside
  className={`
    fixed inset-y-0 left-0 z-50
    flex w-[290px] max-w-[85vw] flex-col
    overflow-hidden
    border-r border-red-500/15
    bg-gradient-to-b from-[#050505] via-[#0b0b0b] to-black
    shadow-2xl shadow-black/60
    backdrop-blur-xl
    transition-all duration-300 ease-in-out
    md:static md:w-[300px] md:translate-x-0
    ${isOpen ? "translate-x-0" : "-translate-x-full"}
  `}
>
  {/* Header */}
  <div className="flex h-20 shrink-0 items-center justify-between border-b border-red-500/10 bg-white/[0.02] px-5 backdrop-blur-xl">
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-red-700 via-red-600 to-red-500 text-white shadow-lg shadow-red-900/40">
        <Sparkles size={20} />
      </div>

      <div>
        <h2 className="text-base font-bold tracking-wide text-white">
          Web Head AI
        </h2>

        <p className="text-xs tracking-wide text-zinc-500">
          AI Assistant
        </p>
      </div>
    </div>

    {/* Mobile Close Button */}
    <button
      onClick={onClose}
      aria-label="Close sidebar"
      className="
        rounded-xl
        p-2
        text-zinc-400
        transition-all duration-300
        hover:bg-red-500/10
        hover:text-red-400
        active:scale-95
        md:hidden
      "
    >
      <X size={18} />
    </button>
  </div>
        {/* New Chat Button */}
{/* New Chat Button */}
<div className="shrink-0 px-5 py-5">
  <button
    onClick={handleNewChat}
    className="
      group
      flex w-full items-center justify-center gap-3
      rounded-2xl
      bg-gradient-to-r
      from-red-700
      via-red-600
      to-red-500
      px-5 py-3.5
      text-sm font-semibold
      text-white
      shadow-lg shadow-red-900/30
      transition-all duration-300
      hover:-translate-y-0.5
      hover:shadow-red-600/40
      active:scale-95
    "
  >
    <MessageSquarePlus
      size={18}
      className="transition-transform duration-300 group-hover:rotate-90"
    />
    <span>New Chat</span>
  </button>
</div>

{/* Chat History */}
<div className="min-h-0 flex-1 overflow-y-auto px-5 pb-5">
  <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
    Recent Chats
  </p>

  {/* Loading */}
  {isLoadingChats ? (
    <div className="space-y-3">
      <div className="h-12 animate-pulse rounded-2xl bg-white/5" />
      <div className="h-12 animate-pulse rounded-2xl bg-white/5" />
      <div className="h-12 animate-pulse rounded-2xl bg-white/5" />
    </div>
  ) : chats.length === 0 ? (
    /* No Chats */
    <div className="rounded-2xl border border-dashed border-red-500/15 bg-white/[0.03] px-5 py-10 text-center backdrop-blur-xl">
      <MessageSquare
        size={28}
        className="mx-auto mb-4 text-red-400"
      />

      <p className="text-sm font-medium text-white">
        No chats yet
      </p>

      <p className="mt-2 text-xs text-zinc-500">
        Start a new conversation
      </p>
    </div>
  ) : (
    /* Chat List */
    <div className="space-y-2">
      {chats.map((chat) => {
        const isActive = activeChatId === chat.id;

        return (
          <div
            key={chat.id}
            className="relative"
          >
            <div
              className={`
                group
                flex items-center
                rounded-2xl
                border
                transition-all duration-300
                ${
                  isActive
                    ? "border-red-500/20 bg-gradient-to-r from-red-600/20 to-red-500/10 shadow-lg shadow-red-900/10"
                    : "border-transparent hover:border-white/5 hover:bg-white/5"
                }
              `}
            >
              {/* Chat */}
              <button
                onClick={() => handleSelectChat(chat.id)}
                className={`
                  flex min-w-0 flex-1
                  items-center gap-3
                  px-4 py-3
                  text-left text-sm
                  transition-colors
                  ${
                    isActive
                      ? "text-white"
                      : "text-zinc-400 group-hover:text-white"
                  }
                `}
              >
                <div
                  className={`
                    flex h-8 w-8 shrink-0 items-center justify-center rounded-xl
                    ${
                      isActive
                        ? "bg-red-500/20 text-red-300"
                        : "bg-white/5 text-zinc-500 group-hover:text-red-300"
                    }
                  `}
                >
                  <MessageSquare size={15} />
                </div>

                <span className="truncate font-medium">
                  {chat.title || "New Chat"}
                </span>
              </button>

              {/* Three Dot Button */}
              <button
                onClick={(event) => {
                  event.stopPropagation();

                  setOpenMenuId(
                    openMenuId === chat.id
                      ? null
                      : chat.id,
                  );
                }}
                title="Chat options"
                className="
                  mr-2
                  rounded-xl
                  p-2
                  text-zinc-500
                  opacity-0
                  transition-all duration-300
                  hover:bg-red-500/10
                  hover:text-red-300
                  group-hover:opacity-100
                "
              >
                <MoreHorizontal size={17} />
              </button>
            </div>
                                       {/* Dropdown Menu */}
                    {openMenuId === chat.id && (
                      <div
                        className="
                          absolute right-2 top-12 z-50
                          w-44
                          overflow-hidden
                          rounded-2xl
                          border border-red-500/15
                          bg-zinc-950/95
                          p-2
                          shadow-2xl
                          backdrop-blur-2xl
                          animate-in
                          fade-in
                          zoom-in-95
                          duration-200
                        "
                      >
                        {/* Rename */}
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            setRenameValue(chat.title || "");
                            setRenamingChatId(chat.id);
                            setOpenMenuId(null);
                          }}
                          className="
                            flex w-full items-center gap-3
                            rounded-xl
                            px-3 py-2.5
                            text-left text-sm font-medium
                            text-zinc-300
                            transition-all duration-300
                            hover:bg-white/5
                            hover:text-white
                          "
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                            <Edit3 size={15} />
                          </div>

                          Rename
                        </button>

                        {/* Delete */}
                        <button
                          onClick={(event) => {
                            event.stopPropagation();
                            setOpenMenuId(null);
                            onDeleteChat?.(chat.id);
                          }}
                          className="
                            mt-1
                            flex w-full items-center gap-3
                            rounded-xl
                            px-3 py-2.5
                            text-left text-sm font-medium
                            text-red-400
                            transition-all duration-300
                            hover:bg-red-500/10
                            hover:text-red-300
                          "
                        >
                          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10">
                            <Trash2 size={15} />
                          </div>

                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Project Information */}
        <div className="shrink-0 border-t border-red-500/10 px-5 py-5">
          <div className="rounded-2xl border border-red-500/10 bg-white/[0.03] p-4 backdrop-blur-xl">
            <p className="text-sm font-semibold text-white">
              Web Head AI
            </p>

            <p className="mt-1 text-xs leading-relaxed text-zinc-500">
              React • Spring Boot • MongoDB
            </p>
          </div>
        </div>

        {/* User Profile + Actions */}
        <div className="shrink-0 border-t border-red-500/10 p-5">
          {/* User */}
          <div className="mb-4 flex items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] p-3 backdrop-blur-xl">
            {/* Avatar */}
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-700 via-red-600 to-red-500 font-semibold text-white shadow-lg shadow-red-900/40">
              {user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            {/* User Information */}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-white">
                {user?.name || "User"}
              </p>

              <p className="truncate text-xs text-zinc-500">
                {user?.email || ""}
              </p>
            </div>
          </div>

          {/* Settings */}
          <button
            onClick={() => {
              navigate("/settings");
              onClose?.();
            }}
            className="
              mb-2
              flex w-full items-center gap-3
              rounded-2xl
              px-4 py-3
              text-sm font-medium
              text-zinc-400
              transition-all duration-300
              hover:bg-white/5
              hover:text-white
            "
          >
            <Settings size={18} />
            Settings
          </button>

          {/* Logout */}
          <button
            onClick={logout}
            className="
              flex w-full items-center gap-3
              rounded-2xl
              px-4 py-3
              text-sm font-medium
              text-red-400
              transition-all duration-300
              hover:bg-red-500/10
              hover:text-red-300
            "
          >
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>

      {renamingChatId && (
        <div
          className="
            fixed inset-0 z-[100]
            flex items-center justify-center
            bg-black/80
            px-4
            backdrop-blur-md
          "
          onClick={() => setRenamingChatId(null)}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="
              w-full max-w-md
              rounded-3xl
              border border-red-500/15
              bg-zinc-950
              p-6
              shadow-2xl
            "
          >
            <h3 className="text-xl font-bold text-white">
              Rename Chat
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              Enter a new title for this conversation.
            </p>

            <input
              type="text"
              value={renameValue}
              onChange={(event) => setRenameValue(event.target.value)}
              autoFocus
              maxLength={100}
              placeholder="Chat title"
              className="
                mt-6
                w-full
                rounded-2xl
                border border-white/10
                bg-white/5
                px-4 py-3
                text-sm text-white
                outline-none
                placeholder:text-zinc-600
                transition-all
                focus:border-red-500/40
                focus:bg-white/10
              "
            />

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => setRenamingChatId(null)}
                className="
                  rounded-2xl
                  border border-white/10
                  px-5 py-3
                  text-sm
                  text-zinc-400
                  transition-all
                  hover:bg-white/5
                  hover:text-white
                "
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  if (!renameValue.trim()) {
                    return;
                  }

                  await onRenameChat?.(renamingChatId, renameValue);

                  setRenamingChatId(null);
                  setRenameValue("");
                }}
                className="
                  rounded-2xl
                  bg-gradient-to-r
                  from-red-700
                  via-red-600
                  to-red-500
                  px-5 py-3
                  text-sm
                  font-semibold
                  text-white
                  shadow-lg shadow-red-900/30
                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:shadow-red-600/40
                  active:scale-95
                "
              >
                Rename
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

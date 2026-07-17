import { useEffect, useRef } from "react";
import { Bot } from "lucide-react";
import MessageBubble from "./MessageBubble";

const MessageList = ({ messages, isLoading }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, isLoading]);

  return (
    <div className="h-full overflow-y-auto">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        {messages.map((message) => (
          <MessageBubble
            key={message.id}
            message={message}
          />
        ))}

        {isLoading && (
          <div className="flex items-start gap-3 animate-in fade-in duration-300">
            {/* AI Avatar */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-700 via-red-600 to-red-500 text-white shadow-lg shadow-red-900/30">
              <Bot size={18} />
            </div>

            {/* Typing Bubble */}
            <div className="rounded-3xl rounded-bl-lg border border-red-500/15 bg-white/5 px-5 py-4 shadow-lg shadow-black/20 backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-bounce rounded-full bg-red-400" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-red-400 [animation-delay:150ms]" />
                <span className="h-2 w-2 animate-bounce rounded-full bg-red-400 [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default MessageList;
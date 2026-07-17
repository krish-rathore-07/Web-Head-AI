import { useState } from "react";
import { Bot, Check, Copy, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

const MessageBubble = ({ message }) => {
  const [copied, setCopied] = useState(false);

  const isUser = message.role === "user";

  const handleCopyResponse = async () => {
    try {
      await navigator.clipboard.writeText(message.content);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy response:", error);
    }
  };

  return (
    <div
      className={`flex w-full gap-3 animate-in fade-in duration-300 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      {/* AI Avatar */}
      {!isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-700 via-red-600 to-red-500 text-white shadow-lg shadow-red-900/30">
          <Bot size={18} />
        </div>
      )}

      {/* Message */}
      <div
        className={`max-w-[92%] sm:max-w-[88%] lg:max-w-[78%] ${
          isUser ? "" : "min-w-0"
        }`}
      >
        <div
          className={`
            overflow-hidden rounded-3xl px-4 py-3
            text-sm leading-7 transition-all duration-300
            ${
              isUser
                ? `
                    rounded-br-lg
                    bg-gradient-to-br
                    from-red-700
                    via-red-600
                    to-red-500
                    text-white
                    shadow-lg shadow-red-900/30
                  `
                : message.isError
                ? `
                    border border-red-500/30
                    bg-red-500/10
                    text-red-300
                  `
                : `
                    border border-red-500/15
                    bg-white/5
                    text-zinc-200
                    backdrop-blur-xl
                    shadow-lg shadow-black/20
                  `
            }
          `}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">
              {message.content}
            </p>
          ) : (
            <div className="markdown-content overflow-x-auto">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({
                    className,
                    children,
                    ...props
                  }) {
                    const match =
                      /language-(\w+)/.exec(
                        className || ""
                      );

                    const isBlockCode =
                      match ||
                      String(children).includes(
                        "\n"
                      );

                    if (isBlockCode) {
                      return (
                        <CodeBlock
                          language={match?.[1]}
                        >
                          {children}
                        </CodeBlock>
                      );
                    }

                    return (
                      <code
                        className="
                          rounded-lg
                          border border-red-500/20
                          bg-red-500/10
                          px-2 py-1
                          font-mono
                          text-[13px]
                          text-red-300
                        "
                        {...props}
                      >
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {message.content}
              </ReactMarkdown>
            </div>
          )}
        </div>

        {/* Copy Button */}
        {!isUser && !message.isError && (
          <div className="mt-2 flex items-center">
            <button
              onClick={handleCopyResponse}
              className="
                flex items-center gap-2
                rounded-xl
                border border-transparent
                px-3 py-2
                text-xs font-medium
                text-zinc-500
                transition-all duration-300
                hover:border-red-500/20
                hover:bg-red-500/10
                hover:text-red-300
              "
            >
              {copied ? (
                <>
                  <Check
                    size={14}
                    className="text-green-400"
                  />
                  Copied
                </>
              ) : (
                <>
                  <Copy size={14} />
                  Copy Response
                </>
              )}
            </button>
          </div>
        )}
      </div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/10 text-zinc-200 shadow-lg">
          <User size={18} />
        </div>
      )}
    </div>
  );
};

export default MessageBubble;
import { useState } from "react";
import { ArrowUp, LoaderCircle } from "lucide-react";

const ChatInput = ({ onSend, isLoading }) => {
  const [input, setInput] = useState("");

  const handleSubmit = () => {
    const trimmedInput = input.trim();

    if (!trimmedInput || isLoading) return;

    onSend(trimmedInput);
    setInput("");
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="sticky bottom-0 z-20 shrink-0 border-t border-red-500/10 bg-gradient-to-t from-black via-zinc-950 to-transparent px-3 pb-4 pt-3 backdrop-blur-xl sm:px-5 lg:px-8">
      <div className="mx-auto w-full max-w-4xl">
        <div className="group flex items-end gap-3 rounded-3xl border border-red-500/20 bg-white/5 p-2 pl-4 shadow-[0_8px_40px_rgba(0,0,0,0.45)] backdrop-blur-2xl transition-all duration-300 focus-within:border-red-500/50 focus-within:shadow-red-900/20">
          <textarea
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Message Web Head AI..."
            rows={1}
            className="max-h-52 min-h-[48px] flex-1 resize-none bg-transparent py-3 text-sm leading-6 text-white outline-none placeholder:text-zinc-500 sm:text-[15px]"
          />

          <button
            onClick={handleSubmit}
            disabled={!input.trim() || isLoading}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-700 via-red-600 to-red-500 text-white shadow-lg shadow-red-900/40 transition-all duration-300 hover:scale-105 hover:shadow-red-600/40 active:scale-95 disabled:cursor-not-allowed disabled:scale-100 disabled:bg-zinc-800 disabled:text-zinc-500 disabled:shadow-none"
          >
            {isLoading ? (
              <LoaderCircle
                size={19}
                className="animate-spin"
              />
            ) : (
              <ArrowUp size={19} strokeWidth={2.5} />
            )}
          </button>
        </div>

        <p className="mt-3 px-2 text-center text-[11px] leading-relaxed text-zinc-500 sm:text-xs">
          <span className="font-medium text-red-400">
            Web Head AI
          </span>{" "}
          can make mistakes. Please verify important information before relying
          on it.
        </p>
      </div>
    </div>
  );
};

export default ChatInput;
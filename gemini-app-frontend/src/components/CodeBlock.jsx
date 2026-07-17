import { useState } from "react";
import { Check, Copy } from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const CodeBlock = ({ language, children }) => {
  const [copied, setCopied] = useState(false);

  const code = String(children).replace(/\n$/, "");

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy code:", error);
    }
  };

  return (
    <div className="my-5 overflow-hidden rounded-2xl border border-red-500/20 bg-gradient-to-br from-zinc-950 via-black to-zinc-950 shadow-xl shadow-black/40">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-red-500/20 bg-gradient-to-r from-red-950/60 via-zinc-900 to-black px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

          <span className="ml-3 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-red-300">
            {language || "TEXT"}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-lg border border-transparent px-3 py-1.5 text-xs font-medium text-zinc-400 transition-all duration-300 hover:border-red-500/30 hover:bg-red-500/10 hover:text-white"
        >
          {copied ? (
            <>
              <Check size={14} className="text-green-400" />
              Copied
            </>
          ) : (
            <>
              <Copy size={14} />
              Copy Code
            </>
          )}
        </button>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <SyntaxHighlighter
          language={language || "text"}
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "20px",
            background: "transparent",
            fontSize: "14px",
            lineHeight: "1.8",
            borderRadius: 0,
            minWidth: "100%",
          }}
          codeTagProps={{
            style: {
              fontFamily:
                "'JetBrains Mono', 'Fira Code', Consolas, monospace",
            },
          }}
          wrapLongLines={true}
          showLineNumbers={true}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;
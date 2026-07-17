import {
  Code2,
  Lightbulb,
  MessageCircle,
  Sparkles,
} from "lucide-react";

const suggestions = [
  {
    icon: Code2,
    title: "Explain Code",
    prompt:
      "Explain the concept of dependency injection in Spring Boot.",
  },
  {
    icon: Lightbulb,
    title: "Project Ideas",
    prompt:
      "Give me a unique full-stack project idea for my portfolio.",
  },
  {
    icon: MessageCircle,
    title: "Learn AI",
    prompt:
      "Explain artificial intelligence in simple words.",
  },
];

const WelcomeScreen = ({ onPromptClick }) => {
  return (
    <div className="relative flex h-full overflow-y-auto">
      {/* Background Glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-16 h-72 w-72 -translate-x-1/2 rounded-full bg-red-600/10 blur-[120px]" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-red-500/5 blur-[120px]" />
        <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-red-700/5 blur-[120px]" />
      </div>

      <div className="relative m-auto w-full max-w-5xl px-5 py-10 sm:px-8 lg:px-10">
        {/* Hero */}
        <div className="mb-14 text-center">
          <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-700 via-red-600 to-red-500 text-white shadow-2xl shadow-red-900/40">
            <Sparkles size={34} />
          </div>

          <span className="rounded-full border border-red-500/20 bg-red-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-red-300">
            WEB HEAD AI
          </span>

          <h1 className="mt-6 bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl lg:text-6xl">
            Your Intelligent
            <span className="block bg-gradient-to-r from-red-500 via-red-400 to-red-300 bg-clip-text text-transparent">
              AI Assistant
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
            Ask programming questions, generate project ideas,
            debug code, learn new technologies, or explore
            anything with an AI assistant designed for developers.
          </p>
        </div>

        {/* Suggestions */}
        <div className="grid gap-5 md:grid-cols-3">
          {suggestions.map((suggestion) => {
            const Icon = suggestion.icon;

            return (
              <button
                key={suggestion.title}
                onClick={() =>
                  onPromptClick(suggestion.prompt)
                }
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-3xl
                  border
                  border-red-500/15
                  bg-white/5
                  p-6
                  text-left
                  backdrop-blur-xl
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:border-red-500/40
                  hover:bg-white/10
                  hover:shadow-2xl
                  hover:shadow-red-900/20
                "
              >
                {/* Glow */}
                <div className="absolute -right-12 -top-12 h-28 w-28 rounded-full bg-red-500/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

                <div className="relative">
                  <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-700 via-red-600 to-red-500 text-white shadow-lg shadow-red-900/30 transition-transform duration-300 group-hover:scale-110">
                    <Icon size={24} />
                  </div>

                  <h3 className="text-lg font-semibold text-white transition group-hover:text-red-300">
                    {suggestion.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-zinc-400">
                    {suggestion.prompt}
                  </p>

                  <div className="mt-8 flex items-center text-sm font-medium text-red-400 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                    Try this →
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-xs leading-6 text-zinc-500 sm:text-sm">
            Powered by{" "}
            <span className="font-semibold text-red-400">
              Web Head AI
            </span>{" "}
            • Your intelligent coding companion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
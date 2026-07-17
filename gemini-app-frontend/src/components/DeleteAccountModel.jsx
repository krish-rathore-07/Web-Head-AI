import { AlertTriangle, Loader2, X } from "lucide-react";

const DeleteAccountModal = ({
  password,
  setPassword,
  onClose,
  onDelete,
  loading,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-md">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-zinc-950 via-black to-red-950/40 shadow-2xl shadow-red-900/20">
        {/* Glow */}
        <div className="absolute -left-24 -top-24 h-56 w-56 rounded-full bg-red-600/10 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-red-500/10 blur-3xl" />

        <div className="relative p-6 sm:p-7">
          {/* Header */}
          <div className="mb-7 flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-red-500/20 bg-gradient-to-br from-red-600/20 to-red-900/20 text-red-400 shadow-lg shadow-red-900/20">
                <AlertTriangle size={26} />
              </div>

              <div>
                <h2 className="text-xl font-bold tracking-tight text-white">
                  Delete Account
                </h2>

                <p className="mt-1 text-sm text-zinc-400">
                  This action is permanent and cannot be undone.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              disabled={loading}
              className="rounded-xl p-2 text-zinc-500 transition-all duration-300 hover:bg-white/10 hover:text-white disabled:opacity-50"
            >
              <X size={20} />
            </button>
          </div>

          {/* Warning */}
          <div className="mb-7 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 backdrop-blur-xl">
            <p className="mb-3 text-sm font-semibold text-red-300">
              The following data will be permanently deleted:
            </p>

            <ul className="space-y-2 text-sm text-zinc-300">
              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                Your profile
              </li>

              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                All chat conversations
              </li>

              <li className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-400" />
                All saved messages
              </li>
            </ul>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Confirm your password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              placeholder="Enter your password"
              className="
                w-full rounded-2xl
                border border-zinc-700
                bg-black/30
                px-4 py-3
                text-sm text-white
                placeholder:text-zinc-500
                outline-none
                transition-all duration-300
                focus:border-red-500
                focus:bg-black/50
                focus:ring-4
                focus:ring-red-500/20
              "
            />
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              onClick={onClose}
              disabled={loading}
              className="
                w-full rounded-2xl
                border border-zinc-700
                bg-white/5
                px-5 py-3
                text-sm font-medium
                text-zinc-300
                transition-all duration-300
                hover:border-white/20
                hover:bg-white/10
                hover:text-white
                disabled:opacity-50
                sm:w-auto
              "
            >
              Cancel
            </button>

            <button
              onClick={onDelete}
              disabled={loading}
              className="
                flex w-full items-center justify-center gap-2
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
                disabled:cursor-not-allowed
                disabled:opacity-60
                sm:w-auto
              "
            >
              {loading && (
                <Loader2
                  size={17}
                  className="animate-spin"
                />
              )}

              {loading
                ? "Deleting..."
                : "Delete Account"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
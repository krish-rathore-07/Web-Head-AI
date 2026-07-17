import { useState } from "react";
import {
  ArrowLeft,
  LogOut,
  Mail,
  Palette,
  Save,
  Settings,
  ShieldCheck,
  Sparkles,
  User,
  Eye,
EyeOff,
KeyRound,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { deleteAccount, updateProfile } from "../services/userService";
import DeleteAccountModal from "../components/DeleteAccountModel";
import { changePassword } from "../services/userService";
import getErrorMessage from "../utils/getErrorMessage";
import { useAuth } from "../context/AuthContext";
// import { deleteAccount } from "../services/userService";
// import { deleteAccount } from "../services/userService";

const SettingsPage = () => {
  const navigate = useNavigate();

 const {
  user,
  logout,
  updateUser,
} = useAuth();

const [currentPassword, setCurrentPassword] = useState("");
const [newPassword, setNewPassword] = useState("");
const [confirmPassword, setConfirmPassword] = useState("");

const [showCurrentPassword, setShowCurrentPassword] = useState(false);
const [showNewPassword, setShowNewPassword] = useState(false);
const [showConfirmPassword, setShowConfirmPassword] = useState(false);

const [isChangingPassword, setIsChangingPassword] = useState(false);

const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deletePassword, setDeletePassword] = useState("");
const [isDeleting, setIsDeleting] = useState(false);

  const [name, setName] = useState(
    user?.name || ""
  );

  const [isSaving, setIsSaving] =
    useState(false);


const handleDeleteAccount = async () => {

  if (!deletePassword.trim()) {
    toast.error("Please enter your password");
    return;
  }

  try {

    setIsDeleting(true);

    await deleteAccount(deletePassword);

    toast.success("Account deleted successfully");

    logout();

    navigate("/login");

  } catch (error) {

    toast.error(
      getErrorMessage(
        error,
        "Failed to delete account"
      )
    );

  } finally {

    setIsDeleting(false);

  }

};

const handleChangePassword = async () => {

  if (
    !currentPassword ||
    !newPassword ||
    !confirmPassword
  ) {
    toast.error("All fields are required");
    return;
  }

  if (newPassword !== confirmPassword) {
    toast.error("Passwords do not match");
    return;
  }

  try {
    setIsChangingPassword(true);

    await changePassword({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    toast.success("Password changed successfully");

    // Clear fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

  } catch (error) {

    toast.error(
      getErrorMessage(
        error,
        "Failed to change password"
      )
    );

  } finally {

    setIsChangingPassword(false);
  }
};

const handleSaveProfile = async () => {
  const cleanName = name.trim();

  if (!cleanName) {
    toast.error(
      "Name cannot be empty"
    );

    return;
  }

  if (cleanName.length > 50) {
    toast.error(
      "Name cannot be longer than 50 characters"
    );

    return;
  }

  // Don't make an unnecessary API request
  if (cleanName === user?.name) {
    toast(
      "No changes to save"
    );

    return;
  }

  try {
    setIsSaving(true);

    const updatedUser =
      await updateProfile(
        cleanName
      );

    // Update global authentication state
    updateUser(updatedUser);

    toast.success(
      "Profile updated successfully"
    );

  } catch (error) {

    console.error(
      "Failed to update profile:",
      error
    );

    toast.error(
      getErrorMessage(
        error,
        "Failed to update profile"
      )
    );

  } finally {

    setIsSaving(false);
  }
};

  const getInitial = () => {
    return (
      user?.name
        ?.charAt(0)
        ?.toUpperCase() || "U"
    );
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-[#050505] via-[#0b0b0b] to-black text-white">
  {/* ======================== */}
  {/* Top Navigation */}
  {/* ======================== */}

  <header className="sticky top-0 z-30 border-b border-red-500/10 bg-black/60 backdrop-blur-2xl">
    <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/chat")}
          className="
            flex h-10 w-10
            items-center justify-center
            rounded-2xl
            border border-white/10
            bg-white/5
            text-zinc-400
            transition-all duration-300
            hover:-translate-x-1
            hover:border-red-500/20
            hover:bg-red-500/10
            hover:text-white
            active:scale-95
          "
          aria-label="Back to chat"
        >
          <ArrowLeft size={19} />
        </button>

        <div>
          <h1 className="text-lg font-semibold tracking-wide text-white">
            Settings
          </h1>

          <p className="text-xs text-zinc-500">
            Manage your Web Head AI account
          </p>
        </div>
      </div>

      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-red-700 via-red-600 to-red-500 text-white shadow-lg shadow-red-900/40">
        <Sparkles size={19} />
      </div>
    </div>
  </header>

  {/* ======================== */}
  {/* Main Content */}
  {/* ======================== */}

  <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
    <div className="grid gap-6">
      {/* ======================== */}
      {/* Profile Section */}
      {/* ======================== */}

      <section className="overflow-hidden rounded-3xl border border-red-500/10 bg-white/[0.03] backdrop-blur-xl shadow-xl">
        <div className="border-b border-red-500/10 px-5 py-5 sm:px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
              <User size={20} />
            </div>

            <div>
              <h2 className="text-lg font-semibold text-white">
                Profile
              </h2>

              <p className="text-sm text-zinc-500">
                Manage your personal information
              </p>
            </div>
          </div>
        </div>

        <div className="p-5 sm:p-6 lg:p-8">
          {/* Avatar */}

          <div className="mb-8 flex flex-col items-center gap-5 sm:flex-row">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-red-700 via-red-600 to-red-500 text-2xl font-bold text-white shadow-xl shadow-red-900/40">
              {getInitial()}
            </div>

            <div className="min-w-0 flex-1 text-center sm:text-left">
              <p className="truncate text-lg font-semibold text-white">
                {user?.name || "User"}
              </p>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Your profile avatar is automatically generated
                from your name.
              </p>
            </div>
          </div>

       {/* Form */}

<div className="grid gap-6">
  {/* Name */}

  <div>
    <label className="mb-2 block text-sm font-medium text-zinc-300">
      Display Name
    </label>

    <div className="relative">
      <User
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
      />

      <input
        type="text"
        value={name}
        onChange={(event) =>
          setName(event.target.value)
        }
        maxLength={50}
        placeholder="Your name"
        className="
          w-full
          rounded-2xl
          border border-white/10
          bg-white/[0.04]
          py-3.5 pl-12 pr-4
          text-sm text-white
          outline-none
          transition-all duration-300
          placeholder:text-zinc-600
          focus:border-red-500/30
          focus:bg-white/[0.07]
          focus:ring-4
          focus:ring-red-500/10
        "
      />
    </div>
  </div>

  {/* Email */}

  <div>
    <label className="mb-2 block text-sm font-medium text-zinc-300">
      Email Address
    </label>

    <div className="relative">
      <Mail
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
      />

      <input
        type="email"
        value={user?.email || ""}
        disabled
        className="
          w-full
          cursor-not-allowed
          rounded-2xl
          border border-white/10
          bg-white/[0.02]
          py-3.5 pl-12 pr-4
          text-sm text-zinc-500
          outline-none
        "
      />
    </div>

    <p className="mt-2 text-xs text-zinc-500">
      Your email address cannot be changed.
    </p>
  </div>

  {/* Save */}

  <div className="flex justify-end pt-2">
    <button
      onClick={handleSaveProfile}
      disabled={isSaving}
      className="
        flex w-full items-center justify-center gap-2
        rounded-2xl
        bg-gradient-to-r
        from-red-700
        via-red-600
        to-red-500
        px-6 py-3
        text-sm font-semibold
        text-white
        shadow-lg shadow-red-900/30
        transition-all duration-300
        hover:-translate-y-0.5
        hover:shadow-red-700/40
        active:scale-95
        disabled:cursor-not-allowed
        disabled:opacity-50
        sm:w-auto
      "
    >
      <Save size={17} />

      {isSaving ? "Saving..." : "Save Changes"}
    </button>
  </div>
</div>
</div>
</section>

<section className="overflow-hidden rounded-3xl border border-red-500/10 bg-white/[0.03] backdrop-blur-xl shadow-xl">

  {/* Header */}

<div className="border-b border-red-500/10 px-5 py-5 sm:px-6">
  <div className="flex items-center gap-4">
    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
      <KeyRound size={20} />
    </div>

    <div>
      <h2 className="text-lg font-semibold text-white">
        Change Password
      </h2>

      <p className="text-sm text-zinc-500">
        Update your account password.
      </p>
    </div>
  </div>
</div>

<div className="p-5 sm:p-6 lg:p-8">
  {/* Current Password */}

  <div className="mb-6">
    <label className="mb-2 block text-sm font-medium text-zinc-300">
      Current Password
    </label>

    <div className="relative">
      <input
        type={
          showCurrentPassword
            ? "text"
            : "password"
        }
        value={currentPassword}
        onChange={(e) =>
          setCurrentPassword(e.target.value)
        }
        placeholder="Enter current password"
        className="
          w-full
          rounded-2xl
          border border-white/10
          bg-white/[0.04]
          px-4 py-3.5 pr-12
          text-sm text-white
          outline-none
          transition-all duration-300
          placeholder:text-zinc-600
          focus:border-red-500/30
          focus:bg-white/[0.07]
          focus:ring-4
          focus:ring-red-500/10
        "
      />

      <button
        type="button"
        onClick={() =>
          setShowCurrentPassword(
            !showCurrentPassword
          )
        }
        className="
          absolute right-4 top-1/2
          -translate-y-1/2
          rounded-lg
          p-1
          text-zinc-500
          transition
          hover:text-white
        "
      >
        {showCurrentPassword ? (
          <EyeOff size={18} />
        ) : (
          <Eye size={18} />
        )}
      </button>
    </div>
  </div>

  {/* New Password */}

  <div className="mb-6">
    <label className="mb-2 block text-sm font-medium text-zinc-300">
      New Password
    </label>

    <div className="relative">
      <input
        type={
          showNewPassword
            ? "text"
            : "password"
        }
        value={newPassword}
        onChange={(e) =>
          setNewPassword(e.target.value)
        }
        placeholder="Enter new password"
        className="
          w-full
          rounded-2xl
          border border-white/10
          bg-white/[0.04]
          px-4 py-3.5 pr-12
          text-sm text-white
          outline-none
          transition-all duration-300
          placeholder:text-zinc-600
          focus:border-red-500/30
          focus:bg-white/[0.07]
          focus:ring-4
          focus:ring-red-500/10
        "
      />

      <button
        type="button"
        onClick={() =>
          setShowNewPassword(
            !showNewPassword
          )
        }
        className="
          absolute right-4 top-1/2
          -translate-y-1/2
          rounded-lg
          p-1
          text-zinc-500
          transition
          hover:text-white
        "
      >
        {showNewPassword ? (
          <EyeOff size={18} />
        ) : (
          <Eye size={18} />
        )}
      </button>
    </div>
  </div>

  {/* Confirm Password */}

  <div>
    <label className="mb-2 block text-sm font-medium text-zinc-300">
      Confirm Password
    </label>

    <div className="relative">
      <input
        type={
          showConfirmPassword
            ? "text"
            : "password"
        }
        value={confirmPassword}
        onChange={(e) =>
          setConfirmPassword(e.target.value)
        }
        placeholder="Confirm new password"
        className="
          w-full
          rounded-2xl
          border border-white/10
          bg-white/[0.04]
          px-4 py-3.5 pr-12
          text-sm text-white
          outline-none
          transition-all duration-300
          placeholder:text-zinc-600
          focus:border-red-500/30
          focus:bg-white/[0.07]
          focus:ring-4
          focus:ring-red-500/10
        "
      />

      <button
        type="button"
        onClick={() =>
          setShowConfirmPassword(
            !showConfirmPassword
          )
        }
        className="
          absolute right-4 top-1/2
          -translate-y-1/2
          rounded-lg
          p-1
          text-zinc-500
          transition
          hover:text-white
        "
      >
        {showConfirmPassword ? (
          <EyeOff size={18} />
        ) : (
          <Eye size={18} />
        )}
      </button>
    </div>
  </div>

       {/* Button */}

    <div className="mt-8 flex justify-end">
      <button
        onClick={handleChangePassword}
        disabled={isChangingPassword}
        className="
          flex w-full items-center justify-center gap-2
          rounded-2xl
          bg-gradient-to-r
          from-red-700
          via-red-600
          to-red-500
          px-6 py-3
          text-sm font-semibold
          text-white
          shadow-lg shadow-red-900/30
          transition-all duration-300
          hover:-translate-y-0.5
          hover:shadow-red-700/40
          active:scale-95
          disabled:cursor-not-allowed
          disabled:opacity-50
          sm:w-auto
        "
      >
        {isChangingPassword
          ? "Changing..."
          : "Change Password"}
      </button>
    </div>
  </div>
</section>

{/* ======================== */}
{/* Appearance */}
{/* ======================== */}

<section className="overflow-hidden rounded-3xl border border-red-500/10 bg-white/[0.03] backdrop-blur-xl shadow-xl">
  <div className="border-b border-red-500/10 px-5 py-5 sm:px-6">
    <div className="flex items-center gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
        <Palette size={20} />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white">
          Appearance
        </h2>

        <p className="text-sm text-zinc-500">
          Customize your experience
        </p>
      </div>
    </div>
  </div>

  <div className="p-5 sm:p-6 lg:p-8">
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-semibold text-white">
          Theme
        </p>

        <p className="mt-1 text-sm text-zinc-500">
          Web Head AI currently uses dark mode.
        </p>
      </div>

      <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400">
        Dark
      </div>
    </div>
  </div>
</section>

{/* ======================== */}
{/* Account */}
{/* ======================== */}

<section className="overflow-hidden rounded-3xl border border-red-500/10 bg-white/[0.03] backdrop-blur-xl shadow-xl">
  <div className="border-b border-red-500/10 px-5 py-5 sm:px-6">
    <div className="flex items-center gap-4">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-red-500/10 text-red-400">
        <ShieldCheck size={20} />
      </div>

      <div>
        <h2 className="text-lg font-semibold text-white">
          Account
        </h2>

        <p className="text-sm text-zinc-500">
          Manage your account session
        </p>
      </div>
    </div>
  </div>

  <div className="p-5 sm:p-6 lg:p-8">
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-base font-semibold text-white">
          Sign out of Web Head AI
        </p>

        <p className="mt-2 text-sm leading-6 text-zinc-500">
          You will need to sign in again to access your conversations.
        </p>
      </div>

      <button
        onClick={logout}
        className="
          flex w-full items-center justify-center gap-2
          rounded-2xl
          border border-red-500/20
          bg-red-500/10
          px-5 py-3
          text-sm font-semibold
          text-red-400
          transition-all duration-300
          hover:bg-red-500/20
          hover:text-red-300
          sm:w-auto
        "
      >
        <LogOut size={17} />
        Log out
      </button>
    </div>
  </div>
</section>

{/* ======================== */}
{/* Danger Zone */}
{/* ======================== */}

<section className="overflow-hidden rounded-3xl border border-red-500/20 bg-gradient-to-br from-red-950/20 via-red-900/10 to-transparent backdrop-blur-xl shadow-xl">
  <div className="border-b border-red-500/20 px-5 py-5 sm:px-6">
    <h2 className="text-xl font-semibold text-red-400">
      Danger Zone
    </h2>

    <p className="mt-2 text-sm text-zinc-500">
      Deleting your account is permanent and cannot be undone.
    </p>
  </div>

  <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 lg:p-8">
    <div>
      <p className="text-base font-semibold text-white">
        Delete your account
      </p>

      <p className="mt-2 text-sm leading-6 text-zinc-500">
        This will permanently delete your profile, chats and messages.
      </p>
    </div>

    <button
      onClick={() => setShowDeleteModal(true)}
      className="
        w-full
        rounded-2xl
        bg-gradient-to-r
        from-red-700
        via-red-600
        to-red-500
        px-6 py-3
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
      Delete Account
    </button>
  </div>
</section>
      </div>
    </main>

    {showDeleteModal && (
      <DeleteAccountModal
        password={deletePassword}
        setPassword={setDeletePassword}
        onClose={() => {
          setShowDeleteModal(false);
          setDeletePassword("");
        }}
        onDelete={handleDeleteAccount}
        loading={isDeleting}
      />
    )}
  </div>
);
};

export default SettingsPage;
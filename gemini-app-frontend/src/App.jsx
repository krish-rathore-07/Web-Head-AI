import {
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import ChatPage from "./pages/ChatPage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./context/AuthContext";
import RegisterPage from "./pages/RegisterPage";
import { Toaster } from "react-hot-toast";
import SettingsPage from "./pages/SettingsPage";

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <div>
    <Toaster
    position="top-center"
    toastOptions={{
      duration: 3000,
      style: {
        background: "#1a1a1a",
        color: "#ffffff",
        border: "1px solid rgba(255,255,255,0.1)",
      },
    }}
  />

    <Routes>
      {/* Login */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <LoginPage />
          )
        }
      />

      {/* Register */}
      <Route
        path="/register"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <RegisterPage />
          )
        }
      />

      {/* Protected Chat */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <ChatPage />
          </ProtectedRoute>
        }
      />
      <Route
  path="/settings"
  element={
    <ProtectedRoute>
      <SettingsPage />
    </ProtectedRoute>
  }
/>

      {/* Unknown route */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />
    </Routes>
    </div>
  );
}

export default App;
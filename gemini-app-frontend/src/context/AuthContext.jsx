import {
  createContext,
  useContext,
  useState,
} from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() =>
    localStorage.getItem("webHeadToken")
  );

  const [user, setUser] = useState(() => {
    const savedUser =
      localStorage.getItem("webHeadUser");

    return savedUser
      ? JSON.parse(savedUser)
      : null;
  });

  const login = (loginResponse) => {
    const userData = {
      id: loginResponse.userId,
      name: loginResponse.name,
      email: loginResponse.email,
    };

    setToken(loginResponse.token);
    setUser(userData);

    localStorage.setItem(
      "webHeadToken",
      loginResponse.token
    );

    localStorage.setItem(
      "webHeadUser",
      JSON.stringify(userData)
    );
  };

  const updateUser = (
  updatedUser
) => {
  setUser(updatedUser);

  localStorage.setItem(
    "webHeadUser",
    JSON.stringify(updatedUser)
  );
};

  const logout = () => {
    setToken(null);
    setUser(null);

    localStorage.removeItem("webHeadToken");
    localStorage.removeItem("webHeadUser");
  };

  const value = {
    token,
    user,
    updateUser,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
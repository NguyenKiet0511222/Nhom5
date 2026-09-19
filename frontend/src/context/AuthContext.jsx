import { useState } from "react";
import { AuthContext } from "./authContextInstance";

// Key lưu trong localStorage — services/api.js cũng đọc TOKEN_KEY để gắn header Authorization
export const TOKEN_KEY = "agri_token";
export const USER_KEY = "agri_user";

function readStoredAuth() {
  try {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = JSON.parse(localStorage.getItem(USER_KEY) || "null");
    return token && user ? { token, user } : { token: null, user: null };
  } catch {
    return { token: null, user: null };
  }
}

/**
 * Trạng thái đăng nhập toàn cục.
 * user có dạng { id, fullName, email, roles: ["CUSTOMER" | "SELLER" | "ADMIN"] } — do backend trả về khi login.
 */
export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(readStoredAuth);

  const login = ({ token, user }) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setAuth({ token, user });
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setAuth({ token: null, user: null });
  };

  const hasRole = (role) => auth.user?.roles?.includes(role) ?? false;

  return (
    <AuthContext.Provider
      value={{
        user: auth.user,
        token: auth.token,
        isAuthenticated: Boolean(auth.token),
        login,
        logout,
        hasRole
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

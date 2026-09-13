import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth";

/**
 * Chặn route cần đăng nhập. Dùng bọc element hoặc làm layout route:
 *   <Route element={<RequireAuth roles={["ADMIN"]} />}> ...các route con... </Route>
 * Chưa đăng nhập -> về /login (nhớ trang đang vào); sai vai trò -> về trang chủ.
 */
export default function RequireAuth({ roles = [], children }) {
  const { isAuthenticated, hasRole } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (roles.length > 0 && !roles.some(hasRole)) {
    return <Navigate to="/" replace />;
  }
  return children ?? <Outlet />;
}

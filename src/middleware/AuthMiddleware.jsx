import { Navigate } from "react-router-dom";
import { useAuthState } from "../features/hooks/useAuth";
import MainLayout from "../views/layouts/MainLayout";
import AuthLayout from "../views/layouts/AuthLayout";

const AuthMiddleware = ({ element: Element, isPrivate }) => {
  const { isAuthenticated } = useAuthState();

  if (!isAuthenticated && isPrivate) {
    return <Navigate to="/login" />;
  }

  if (isAuthenticated && !isPrivate) {
    return <Navigate to="/" />;
  }

  const Layout = isPrivate ? MainLayout : AuthLayout;

  return <Layout>{Element}</Layout>;
};

export default AuthMiddleware;

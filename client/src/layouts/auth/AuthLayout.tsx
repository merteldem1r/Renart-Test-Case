import { Navigate, Outlet } from "react-router";
import { UserAuth } from "../../context/auth/AuthContext";

const AuthLayout: React.FC = () => {
  const { session } = UserAuth();

  if (session?.user) {
    return <Navigate to="/" state={{ from: location.pathname }} replace />;
  }

  return (
    <>
      <Outlet />
    </>
  );
};

export default AuthLayout;

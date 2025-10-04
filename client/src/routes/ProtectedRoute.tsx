import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import ProtectedRouteLoading from "./components/ProtectedRouteLoading";
import { apiGet } from "../services/client";
import { UserAuth } from "../context/auth/AuthContext";
import { showNotification } from "../hooks/useNotification";
import authEndpoints from "./../pages/auth/endpoints.json";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { t } = useTranslation("errors");
  const { signOut } = UserAuth();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["me"],
    queryFn: async () => (await apiGet(authEndpoints.GetMe)).data,
    retry: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!data && !isLoading && isError) {
      const handleSignOut = async () => {
        await signOut();
        showNotification.error(t("general"));
        navigate("/auth/signin", { replace: true });
      };

      handleSignOut();
    }
  }, [data, isLoading, isError, navigate]);

  if (isLoading) {
    return <ProtectedRouteLoading />;
  }

  if (!data || isError) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

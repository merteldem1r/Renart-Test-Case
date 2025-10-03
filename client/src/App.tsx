import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import SuspenseFallback from "./components/ui/SuspenseFallback";
import { AuthContextProvider } from "./context/auth/AuthContext";
import { useGlobalNotification } from "./hooks/useNotification";
import AppLayout from "./layouts/app/AppLayout";
import AuthLayout from "./layouts/auth/AuthLayout";
import LandingLayout from "./layouts/landing/LandingLayout";
import AuthCallback from "./pages/auth/AuthCallback";
import SignIn from "./pages/auth/sign/SignIn";
import SignUp from "./pages/auth/sign/SignUp";
import LandingHome from "./pages/landing/LandingHome";
import ProtectedRoute from "./routes/ProtectedRoute";

const queryClient = new QueryClient();

function AppContent() {
  const { contextHolder } = useGlobalNotification();

  return (
    <>
      {contextHolder}
      <BrowserRouter>
        <Routes>
          <Route element={<LandingLayout />}>
            <Route path="/" element={<LandingHome />} />
          </Route>

          {/* AUTH */}
          <Route path="auth" element={<AuthLayout />}>
            <Route index element={<Navigate to="signin" replace />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="callback" element={<AuthCallback />} />
          </Route>

          {/* APP (Protected) */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<>Dashboard Home</>} />
            <Route path="products" element={<>Dashboard Products</>} />

            <Route index element={<Navigate to="home" replace />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Suspense fallback={<SuspenseFallback />}>
          <AppContent />
        </Suspense>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

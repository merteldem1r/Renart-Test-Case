import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  LoginOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Button, Card, Result, Typography } from "antd";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { supabase } from "../../supabaseClient";

const { Title } = Typography;

type AuthCallbackPageStatus = "VERIFYING" | "SUCCESS" | "ERROR" | "NONE";

const getHashParams = (location: any) => {
  const raw = location.hash?.startsWith("#")
    ? location.hash.slice(1)
    : location.hash || "";

  return Object.fromEntries(new URLSearchParams(raw)) as Record<string, string>;
};

const AuthCallback: React.FC = () => {
  const { t } = useTranslation("auth");
  const [authStatus, setAuthStatus] =
    useState<AuthCallbackPageStatus>("VERIFYING");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(5);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const { access_token, refresh_token, error, error_code } =
      getHashParams(location);

    if (location.hash) {
      window.history.replaceState(
        null,
        "",
        location.pathname + location.search
      );
    }

    if (error || error_code) {
      setAuthStatus("ERROR");
      setErrorMessage(t("callback.error.messages.invalidLink"));
      return;
    }

    // Missing tokens: nothing to do
    if (!access_token || !refresh_token) {
      setAuthStatus("NONE");
      return;
    }

    setAuthStatus("VERIFYING");

    // Set the session using Supabase's session handling
    const handleAuthCallback = async () => {
      try {
        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (error) {
          setAuthStatus("ERROR");
          setErrorMessage(t("callback.error.messages.verificationFailed"));
          return;
        }

        // Change status to SUCCESS to show the countdown screen
        setAuthStatus("SUCCESS");
      } catch (err) {
        setAuthStatus("ERROR");
        setErrorMessage(t("callback.error.messages.unexpectedError"));
      }
    };

    handleAuthCallback();
  }, []);

  // Countdown timer effect for SUCCESS status
  useEffect(() => {
    if (authStatus === "SUCCESS") {
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            navigate("/dashboard");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [authStatus, navigate]);

  return (
    <div className="min-h-screen bg-theme flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-md w-full">
        <div className="text-center mb-5">
          <NavLink
            to="/"
            className="text-4xl font-bold group hover:text-blue-700 transition-colors duration-200"
          >
            <span className="text-blue-600 group-hover:text-black transition-colors">
              Karat
            </span>
          </NavLink>
        </div>

        <Card className="shadow-lg border-0 bg-theme-card border-theme">
          {authStatus === "VERIFYING" && (
            <Result
              icon={
                <LoadingOutlined
                  style={{ color: "#1890ff", fontSize: "48px" }}
                />
              }
              title={t("callback.processing")}
              subTitle={t("callback.verifying")}
            />
          )}

          {authStatus === "SUCCESS" && (
            <Result
              icon={<CheckCircleOutlined style={{ color: "#52c41a" }} />}
              title={t("callback.success.title")}
              subTitle={t("callback.success.subtitle", {
                count: countdown,
              })}
              extra={
                <div className="mt-4">
                  <Button
                    type="primary"
                    onClick={() => navigate("/dashboard")}
                    className="btn-primary"
                  >
                    {t("callback.success.button")}
                  </Button>
                </div>
              }
            />
          )}

          {authStatus === "ERROR" && (
            <Result
              icon={<CloseCircleOutlined style={{ color: "#ff4d4f" }} />}
              title={t("callback.error.title")}
              subTitle={errorMessage}
              extra={
                <div className="space-y-3">
                  <div className="text-center text-theme-secondary text-sm mb-4">
                    {t("callback.error.help")}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link to="/auth/signin">
                      <Button
                        type="primary"
                        icon={<LoginOutlined />}
                        className="btn-primary w-full sm:w-auto"
                      >
                        {t("callback.error.signInButton")}
                      </Button>
                    </Link>
                    <Link to="/">
                      <Button className="w-full sm:w-auto">
                        {t("callback.error.homeButton")}
                      </Button>
                    </Link>
                  </div>
                </div>
              }
            />
          )}

          {authStatus === "NONE" && (
            <div className="text-center p-4">
              <Title level={4} className="text-theme">
                {t("callback.processing")}
              </Title>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default AuthCallback;

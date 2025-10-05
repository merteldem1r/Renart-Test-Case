import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Card, Divider, Form, Input, Typography } from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useNavigate } from "react-router";
import { UserAuth } from "../../../context/auth/AuthContext";
import { showNotification } from "../../../hooks/useNotification";
import type { SignInForm } from "../models";

const { Title, Text } = Typography;

const SignIn = () => {
  const { t } = useTranslation("auth");

  const { signInUser } = UserAuth();
  const navigate = useNavigate();

  useEffect(() => {
    scrollTo();
  }, []);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values: SignInForm) => signInUser(values),
  });

  const onFinish = async (values: SignInForm) => {
    try {
      const res = await mutateAsync(values);

      if (!res.success) {
        showNotification.error(
          t(`signin.notifications.${res?.errorCode || "error"}`),
        );
        return;
      }

      navigate("/profile");
      showNotification.success(t("signin.notifications.success"));
    } catch (err) {
      const msg =
        (err as any)?.response?.data?.message ??
        (err as Error)?.message ??
        t("signin.notifications.error");

      showNotification.error(msg);
    }
  };

  return (
    <div className="min-h-screen bg-theme flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <NavLink
            to="/"
            className="text-4xl font-bold group hover:text-primary-700 transition-colors duration-200"
          >
            <span className="text-primary-500 group-hover:text-primary-800 transition-colors">
              Karat
            </span>
          </NavLink>
          <Title level={3} className="text-xl font-bold text-theme my-2">
            {t("signin.title")}
          </Title>
        </div>

        {/* SignIn Form */}
        <Card className="shadow-lg border-0 bg-theme-card border-theme">
          <Form
            name="SignIn"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="on"
            size="large"
          >
            <Form.Item
              name="email"
              label={
                <span className="flex items-center gap-2">
                  {t("signin.form.email.label")}
                </span>
              }
              rules={[
                { required: true, message: t("signin.form.email.required") },
                { type: "email", message: t("signin.form.email.invalid") },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder={t("signin.form.email.placeholder")}
                className="rounded-lg"
                autoComplete="email"
                type="email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={t("signin.form.password.label")}
              rules={[
                { required: true, message: t("signin.form.password.required") },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder={t("signin.form.password.placeholder")}
                className="rounded-lg"
                autoComplete="current-password"
              />
            </Form.Item>

            <div className="flex w-full! justify-center my-5">
              <div>
                <Link
                  to="/forgot-password"
                  className="text-primary-600! hover:text-primary-700! text-sm"
                >
                  {t("signin.form.forgotPassword")}
                </Link>
              </div>
            </div>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isPending}
                className="w-full flex items-center px-3 py-1 text-white! hover:bg-primary-50 rounded-md transition-all duration-200 border bg-primary-500! border-transparent hover:border-primary-200!"
              >
                {t("signin.form.submitButton")}
              </Button>
            </Form.Item>
          </Form>

          <Divider className="my-6">
            <Text className="text-theme-secondary">
              {t("signin.footer.noAccount")}{" "}
              <Link
                to="/auth/signup"
                className="text-primary-600! hover:text-primary-700! font-medium"
              >
                {t("signin.footer.signUpLink")}
              </Link>
            </Text>
          </Divider>
        </Card>
      </div>
    </div>
  );
};

export default SignIn;

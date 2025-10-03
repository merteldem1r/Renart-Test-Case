import {
  InfoCircleOutlined,
  LockOutlined,
  MailOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import {
  Button,
  Card,
  Checkbox,
  Divider,
  Form,
  Input,
  Tooltip,
  Typography,
} from "antd";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useNavigate } from "react-router";
import { showNotification } from "../../../hooks/useNotification";
import { useScrollToTop } from "../../../hooks/useScrollToTop";
import { apiPost } from "../../../services/client";
import endpoints from "../endpoints.json";
import type { SignUpForm } from "../models";

const { Title, Text } = Typography;

const SignUp: React.FC = () => {
  const { t } = useTranslation("auth");

  const navigate = useNavigate();
  const { scrollToTop } = useScrollToTop();

  useEffect(() => {
    scrollToTop();
  }, []);

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (values: SignUpForm) => apiPost(endpoints.SignUp, values),
  });

  const onFinish = async (values: SignUpForm) => {
    try {
      const res = await mutateAsync(values);

      if (res.status == 200 || res.status == 201) {
        showNotification.success(
          t("signup.notifications.success.title"),
          t("signup.notifications.success.description")
        );

        console.log("res: ", res);

        navigate("/auth/signin");
      }
    } catch (err) {
      const msg =
        (err as any)?.response?.data?.message ??
        (err as Error)?.message ??
        t("signup.notifications.error");
      showNotification.error(msg);
    }
  };

  return (
    <div className="min-h-screen bg-theme flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <NavLink
            to="/"
            className="text-4xl font-bold group hover:text-blue-700 transition-colors duration-200"
          >
            <span className="text-blue-600 group-hover:text-black transition-colors">
              Name Here
            </span>
          </NavLink>
          <Title level={3} className="text-xl font-bold text-theme mt-2">
            {t("signup.title")}
          </Title>
        </div>

        <Card className="mb-4 bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
          <div className="text-center">
            <Text className="text-green-800 dark:text-green-200 font-medium block mb-2">
              {t("signup.promotion.title")}
            </Text>
            <Text className="text-green-700 dark:text-green-300 text-sm">
              <span
                dangerouslySetInnerHTML={{
                  __html: t("signup.promotion.subtitle"),
                }}
              />
            </Text>
          </div>
        </Card>

        {/* Signup Form */}
        <Card className="shadow-lg border-0 bg-theme-card border-theme">
          <Form
            name="signup"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="on"
            size="large"
          >
            <Form.Item
              name="username"
              label={
                <span className="flex items-center gap-2">
                  {t("signup.form.username.label")}
                  <Tooltip
                    title={t("signup.form.username.tooltip")}
                    placement="top"
                  >
                    <InfoCircleOutlined className="text-gray-400 hover:text-blue-500 cursor-help" />
                  </Tooltip>
                </span>
              }
              rules={[
                { required: true, message: t("signup.form.username.required") },
                { min: 5, message: t("signup.form.username.minLength") },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-400" />}
                placeholder={t("signup.form.username.placeholder")}
                className="rounded-lg"
                autoComplete="username"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={
                <span className="flex items-center gap-2">
                  {t("signup.form.email.label")}
                  <Tooltip
                    title={t("signup.form.email.tooltip")}
                    placement="top"
                  >
                    <InfoCircleOutlined className="text-gray-400 hover:text-blue-500 cursor-help" />
                  </Tooltip>
                </span>
              }
              rules={[
                { required: true, message: t("signup.form.email.required") },
                { type: "email", message: t("signup.form.email.invalid") },
              ]}
            >
              <Input
                prefix={<MailOutlined className="text-gray-400" />}
                placeholder={t("signup.form.email.placeholder")}
                className="rounded-lg"
                autoComplete="email"
                type="email"
              />
            </Form.Item>

            <Form.Item
              name="password"
              label={t("signup.form.password.label")}
              rules={[
                { required: true, message: t("signup.form.password.required") },
                { min: 8, message: t("signup.form.password.minLength") },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                  message: t("signup.form.password.pattern"),
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder={t("signup.form.password.placeholder")}
                className="rounded-lg"
                autoComplete="new-password"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label={t("signup.form.confirmPassword.label")}
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: t("signup.form.confirmPassword.required"),
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(t("signup.form.confirmPassword.mismatch"))
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="text-gray-400" />}
                placeholder={t("signup.form.confirmPassword.placeholder")}
                className="rounded-lg"
                autoComplete="new-password"
              />
            </Form.Item>

            <Form.Item
              name="agreeToTerms"
              valuePropName="checked"
              rules={[
                {
                  validator: (_, value) =>
                    value
                      ? Promise.resolve()
                      : Promise.reject(
                          new Error(t("signup.form.agreeToTerms.required"))
                        ),
                },
              ]}
            >
              <Checkbox>
                <Text className="text-sm text-theme-secondary">
                  {t("signup.form.agreeToTerms.text")}{" "}
                  <Link
                    to="/terms"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {t("signup.form.agreeToTerms.termsOfService")}
                  </Link>{" "}
                  {t("signup.form.agreeToTerms.and")}{" "}
                  <Link
                    to="/privacy"
                    className="text-blue-600 hover:text-blue-700"
                  >
                    {t("signup.form.agreeToTerms.privacyPolicy")}
                  </Link>
                </Text>
              </Checkbox>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={isPending}
                className="w-full btn-primary h-12 text-base font-medium"
              >
                {t("signup.form.submitButton")}
              </Button>
            </Form.Item>
          </Form>

          <Divider className="my-6">
            <Text className="text-theme-secondary">
              {t("signup.footer.hasAccount")}{" "}
              <Link
                to="/auth/signin"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {t("signup.footer.signInLink")}
              </Link>
            </Text>
          </Divider>
        </Card>
      </div>
    </div>
  );
};

export default SignUp;

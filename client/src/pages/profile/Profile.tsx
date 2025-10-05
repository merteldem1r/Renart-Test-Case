import {
  CalendarOutlined,
  CheckCircleOutlined,
  CrownOutlined,
  LogoutOutlined,
  MailOutlined,
  ShoppingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Modal,
  Row,
  Tag,
  Typography,
} from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import CartItems from "../../components/cart/CartItems";
import { UserAuth } from "../../context/auth/AuthContext";
import { useCart } from "../../context/cart/CartContext";

const { Title, Text } = Typography;

export const Profile: React.FC = () => {
  const { session, signOut } = UserAuth();
  const { t } = useTranslation("common");
  const { items, totalPrice, clearCart } = useCart();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleBuyNow = () => {
    setIsModalVisible(true);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    clearCart();
  };

  const handleLogout = async () => {
    try {
      await signOut();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Text className="text-gray-500">{t("profile.signInRequired")}</Text>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-gradient-to-b mt-6 from-white to-primary-100 p-6">
      <div className="max-w-4xl mx-auto mb-7">
        <Card className="shadow-lg border-primary-200">
          <div className="text-center mb-8">
            <Avatar
              size={120}
              icon={<UserOutlined />}
              className="mb-4 bg-primary-500"
            />
            <Title level={2} className="text-primary-800 mb-2">
              {user?.email || t("profile.user")}
            </Title>
            <Text className="text-primary-600 text-lg">
              @{session.user.user_metadata.username}
            </Text>
            <div className="mt-4">
              <Button
                type="default"
                icon={<LogoutOutlined />}
                onClick={handleLogout}
                className="flex items-center px-4 py-2 text-red-600! hover:text-red-700! hover:bg-red-50 border-red-200! hover:border-red-300! rounded-md transition-all duration-200"
              >
                {t("profile.logout")}
              </Button>
            </div>
          </div>

          <Divider orientation="left" className="text-primary-700">
            <CrownOutlined className="mr-2" />
            {t("profile.personalInfo")}
          </Divider>

          <Row gutter={[24, 16]} className="mb-8">
            <Col xs={24} sm={12}>
              <Card size="small" className="h-full border-primary-200">
                <div className="flex items-center">
                  <MailOutlined className="text-primary-500 text-xl mr-3" />
                  <div>
                    <Text strong className="block text-primary-800">
                      {t("profile.email")}
                    </Text>
                    <Text className="text-primary-600">
                      {user?.email || t("profile.notProvided")}
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12}>
              <Card size="small" className="h-full border-primary-200">
                <div className="flex items-center">
                  <UserOutlined className="text-primary-500 text-xl mr-3" />
                  <div>
                    <Text strong className="block text-primary-800">
                      {t("profile.phone")}
                    </Text>
                    <Text className="text-primary-600">
                      {user?.phone || t("profile.notProvided")}
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          <Divider orientation="left" className="text-primary-700">
            <CalendarOutlined className="mr-2" />
            {t("profile.accountDetails")}
          </Divider>

          <Row gutter={[24, 16]}>
            <Col xs={24} sm={12}>
              <Card size="small" className="h-full border-primary-200">
                <div>
                  <Text strong className="block text-primary-800 mb-2">
                    {t("profile.emailVerified")}
                  </Text>
                  <Tag color={user?.email_confirmed_at ? "success" : "warning"}>
                    {user?.email_confirmed_at
                      ? t("profile.verified")
                      : t("profile.notVerified")}
                  </Tag>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12}>
              <Card size="small" className="h-full border-primary-200">
                <div>
                  <Text strong className="block text-primary-800 mb-2">
                    {t("profile.memberSince")}
                  </Text>
                  <Text className="text-primary-600">
                    {user?.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : t("profile.unknown")}
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>
        </Card>

        {/* Cart Items Section */}
        <div className="mt-8">
          <CartItems />

          {/* Buy Now Button */}
          {items.length > 0 && (
            <div className="mt-6 text-center">
              <Button
                type="primary"
                size="large"
                icon={<ShoppingOutlined />}
                onClick={handleBuyNow}
                className="w-full flex items-center px-3 py-1 text-white! hover:bg-primary-50 rounded-md transition-all duration-200 border bg-primary-500! border-transparent hover:border-primary-200!"
              >
                {t("cart.buyNow")} - ${totalPrice.toFixed(2)}
              </Button>
            </div>
          )}
        </div>

        {/* Purchase Success Modal */}
        <Modal
          title={
            <div className="flex items-center justify-center">
              <CheckCircleOutlined className="text-green-500 text-3xl mr-2" />
              <span className="text-xl">{t("cart.purchaseSuccess")} 🎉</span>
            </div>
          }
          open={isModalVisible}
          onOk={handleModalOk}
          onCancel={handleModalOk}
          okText={t("cart.continueShopping")}
          cancelButtonProps={{ style: { display: "none" } }}
          centered
          className="purchase-modal"
          okButtonProps={{
            className:
              "w-full flex items-center px-3 py-1 text-white! hover:bg-primary-50 rounded-md transition-all duration-200 border bg-primary-500! border-transparent hover:border-primary-200!",
          }}
        >
          <div className="text-center py-6">
            <Typography.Title level={3} className="text-primary-600 mb-4">
              {t("cart.purchaseMessage")}
            </Typography.Title>
            <Typography.Text className="text-lg text-gray-600">
              {t("cart.purchaseDescription")}
              <br />
              <br />
              {t("cart.purchaseThankYou")}
            </Typography.Text>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Profile;

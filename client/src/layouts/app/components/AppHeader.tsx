import {
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Avatar, Button, Dropdown, Layout, Space, Typography } from "antd";
import React from "react";

import { UserAuth } from "../../../context/auth/AuthContext";

const { Header } = Layout;
const { Text } = Typography;

interface AppHeaderProps {
  isMobile: boolean;
  collapsed: boolean;
  toggleMobileDrawer: () => void;
  setCollapsed: (collapsed: boolean) => void;
  colorBgContainer: string;
}

const AppHeader: React.FC<AppHeaderProps> = ({
  isMobile,
  collapsed,
  toggleMobileDrawer,
  setCollapsed,
  colorBgContainer,
}) => {
  const { session } = UserAuth();

  // User dropdown menu items
  const userMenuItems: MenuProps["items"] = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: "Profile",
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: "Settings",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      icon: <LogoutOutlined />,
    },
  ];

  return (
    <Header
      style={{
        padding: "0 24px",
        background: colorBgContainer,
        borderBottom: "1px solid #f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        right: 0,
        left: !isMobile ? (collapsed ? 80 : 250) : 0,
        zIndex: 99,
        transition: "left 0.2s",
      }}
    >
      {/* Collapse/Menu Button */}
      <Button
        type="text"
        icon={
          isMobile ? (
            <MenuUnfoldOutlined />
          ) : collapsed ? (
            <MenuUnfoldOutlined />
          ) : (
            <MenuFoldOutlined />
          )
        }
        onClick={isMobile ? toggleMobileDrawer : () => setCollapsed(!collapsed)}
        style={{
          fontSize: "16px",
          width: 40,
          height: 40,
        }}
      />

      {/* User Profile Section */}
      <Space>
        <Text strong style={{ marginRight: 8 }}>
          @{session?.user?.user_metadata?.username || "user"}
        </Text>
        <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow>
          <Avatar
            size="default"
            icon={<UserOutlined />}
            style={{
              backgroundColor: "#1890ff",
              cursor: "pointer",
            }}
          />
        </Dropdown>
      </Space>
    </Header>
  );
};

export default AppHeader;

import React from "react";
import { Layout, Menu, Typography } from "antd";
import {
  DashboardOutlined,
  PlayCircleOutlined,
  SafetyCertificateOutlined,
  UsergroupAddOutlined,
  HistoryOutlined,
  UserOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation, useNavigate } from "react-router";

const { Sider } = Layout;
const { Text } = Typography;

interface AppSidebarProps {
  collapsed: boolean;
  isMobile: boolean;
  colorBgContainer: string;
  onLogoClick?: () => void;
}

// Menu items
const menuItems = [
  {
    key: "/dashboard/home",
    icon: <DashboardOutlined />,
    label: "Dashboard",
  },
  {
    key: "/dashboard/practice",
    icon: <PlayCircleOutlined />,
    label: "Start Practice",
  },
  {
    key: "/dashboard/experience",
    icon: <SafetyCertificateOutlined />,
    label: "Verified Experience",
  },
  {
    key: "/dashboard/friends",
    icon: <UsergroupAddOutlined />,
    label: "Friends Activity",
  },
  {
    key: "/dashboard/history",
    icon: <HistoryOutlined />,
    label: "Interview History",
  },
  {
    key: "/dashboard/profile",
    icon: <UserOutlined />,
    label: "Profile",
  },
  {
    key: "/dashboard/settings",
    icon: <SettingOutlined />,
    label: "Settings",
  },
];

const AppSidebar: React.FC<AppSidebarProps> = ({
  collapsed,
  isMobile,
  colorBgContainer,
  onLogoClick,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);

    if (isMobile && onLogoClick) {
      onLogoClick();
    }
  };

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{
        background: colorBgContainer,
        borderRight: "1px solid #f0f0f0",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        overflow: "auto",
        zIndex: 100,
      }}
      width={250}
      collapsedWidth={80}
    >
      {/* Logo */}
      <div
        style={{
          height: 64,
          margin: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed && !isMobile ? "center" : "flex-start",
        }}
      >
        {!collapsed || isMobile ? (
          <Text
            strong
            style={{
              fontSize: "20px",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/dashboard");
              onLogoClick?.();
            }}
          >
            <NavLink
              to={"/dashboard"}
              className="text-2xl font-bold group hover:text-blue-700 transition-colors duration-200"
            >
              <span className="text-blue-600 group-hover:text-black transition-colors">
                Karat
              </span>
            </NavLink>
          </Text>
        ) : (
          <Text
            strong
            style={{
              fontSize: "16px",
              color: "#1890ff",
              cursor: "pointer",
            }}
            onClick={() => {
              navigate("/dashboard");
              onLogoClick?.();
            }}
          >
            <span className="text-blue-600">V</span>
            <span className="text-black">R</span>
          </Text>
        )}
      </div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        onClick={handleMenuClick}
        style={{
          borderRight: 0,
          background: "transparent",
        }}
      />
    </Sider>
  );
};

export default AppSidebar;

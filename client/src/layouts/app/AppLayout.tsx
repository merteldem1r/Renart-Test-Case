import { Layout, theme } from "antd";
import React, { useEffect, useState } from "react";
import { Outlet } from "react-router";
import AppFooter from "./components/AppFooter";
import AppHeader from "./components/AppHeader";
import AppSidebar from "./components/AppSidebar";
import MobileDrawer from "./components/MobileDrawer";

const { Content } = Layout;

const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  // Handle mobile breakpoint
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992; // lg breakpoint
      setIsMobile(mobile);
      if (mobile) {
        setMobileDrawerVisible(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMobileDrawer = () => {
    setMobileDrawerVisible(!mobileDrawerVisible);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Desktop Sidebar - Hidden on mobile */}
      {!isMobile && (
        <AppSidebar
          collapsed={collapsed}
          isMobile={isMobile}
          colorBgContainer={colorBgContainer}
        />
      )}

      {/* Mobile Drawer */}
      <MobileDrawer
        isMobile={isMobile}
        mobileDrawerVisible={mobileDrawerVisible}
        setMobileDrawerVisible={setMobileDrawerVisible}
        colorBgContainer={colorBgContainer}
      />

      <Layout
        style={{
          marginLeft: !isMobile ? (collapsed ? 80 : 250) : 0,
          transition: "margin-left 0.2s",
        }}
      >
        {/* Header */}
        <AppHeader
          isMobile={isMobile}
          collapsed={collapsed}
          toggleMobileDrawer={toggleMobileDrawer}
          setCollapsed={setCollapsed}
          colorBgContainer={colorBgContainer}
        />

        {/* Main Content */}
        <Content
          style={{
            margin: "18px",
            marginTop: "80px",
            padding: "24px",
            minHeight: 280,
            // background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>

        {/* Footer */}
        <AppFooter colorBgContainer={colorBgContainer} />
      </Layout>
    </Layout>
  );
};

export default AppLayout;

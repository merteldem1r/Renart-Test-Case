import React from 'react';
import { Drawer } from 'antd';
import AppSidebar from './AppSidebar';

interface MobileDrawerProps {
  isMobile: boolean;
  mobileDrawerVisible: boolean;
  setMobileDrawerVisible: (visible: boolean) => void;
  colorBgContainer: string;
}

const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isMobile,
  mobileDrawerVisible,
  setMobileDrawerVisible,
  colorBgContainer,
}) => {
  return (
    <Drawer
      title={null}
      placement="left"
      onClose={() => setMobileDrawerVisible(false)}
      open={mobileDrawerVisible}
      bodyStyle={{ padding: 0 }}
      width={250}
      style={{ display: isMobile ? 'block' : 'none' }}
    >
      <div style={{ background: colorBgContainer, height: '100%' }}>
        <AppSidebar
          collapsed={false}
          isMobile={true}
          colorBgContainer={colorBgContainer}
          onLogoClick={() => setMobileDrawerVisible(false)}
        />
      </div>
    </Drawer>
  );
};

export default MobileDrawer;
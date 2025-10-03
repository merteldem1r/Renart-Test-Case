import React from 'react';
import { Layout, Space, Typography } from 'antd';
import { HeartOutlined } from '@ant-design/icons';

const { Footer } = Layout;
const { Text } = Typography;

interface AppFooterProps {
  colorBgContainer: string;
}

const AppFooter: React.FC<AppFooterProps> = ({ colorBgContainer }) => {
  return (
    <Footer
      style={{
        textAlign: 'center',
        background: colorBgContainer,
        borderTop: '1px solid #f0f0f0',
      }}
    >
      <Space>
        <Text type="secondary">
          Made with <HeartOutlined style={{ color: '#ff4d4f' }} /> by{' '}
          <Text strong>Mert Eldemir</Text>
        </Text>
      </Space>
    </Footer>
  );
};

export default AppFooter;
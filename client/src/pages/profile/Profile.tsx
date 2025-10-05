import React from 'react';
import { Card, Typography, Avatar, Row, Col, Tag, Divider } from 'antd';
import { UserOutlined, MailOutlined, CalendarOutlined, CrownOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
import { UserAuth } from '../../context/auth/AuthContext';
import CartItems from '../../components/cart/CartItems';

const { Title, Text } = Typography;

export const Profile: React.FC = () => {
  const { session } = UserAuth();
  const { t } = useTranslation('common');

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Text className="text-gray-500">{t('profile.signInRequired')}</Text>
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
              {user?.email || t('profile.user')}
            </Title>
            <Text className="text-primary-600 text-lg">
              {t('profile.welcome')}
            </Text>
          </div>

          <Divider orientation="left" className="text-primary-700">
            <CrownOutlined className="mr-2" />
            {t('profile.personalInfo')}
          </Divider>

          <Row gutter={[24, 16]} className="mb-8">
            <Col xs={24} sm={12}>
              <Card size="small" className="h-full border-primary-200">
                <div className="flex items-center">
                  <MailOutlined className="text-primary-500 text-xl mr-3" />
                  <div>
                    <Text strong className="block text-primary-800">{t('profile.email')}</Text>
                    <Text className="text-primary-600">
                      {user?.email || t('profile.notProvided')}
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
                    <Text strong className="block text-primary-800">{t('profile.phone')}</Text>
                    <Text className="text-primary-600">
                      {user?.phone || t('profile.notProvided')}
                    </Text>
                  </div>
                </div>
              </Card>
            </Col>
          </Row>

          <Divider orientation="left" className="text-primary-700">
            <CalendarOutlined className="mr-2" />
            {t('profile.accountDetails')}
          </Divider>

          <Row gutter={[24, 16]}>
            <Col xs={24} sm={12}>
              <Card size="small" className="h-full border-primary-200">
                <div>
                  <Text strong className="block text-primary-800 mb-2">{t('profile.emailVerified')}</Text>
                  <Tag color={user?.email_confirmed_at ? 'success' : 'warning'}>
                    {user?.email_confirmed_at ? t('profile.verified') : t('profile.notVerified')}
                  </Tag>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} sm={12}>
              <Card size="small" className="h-full border-primary-200">
                <div>
                  <Text strong className="block text-primary-800 mb-2">{t('profile.memberSince')}</Text>
                  <Text className="text-primary-600">
                    {user?.created_at 
                      ? new Date(user.created_at).toLocaleDateString()
                      : t('profile.unknown')
                    }
                  </Text>
                </div>
              </Card>
            </Col>
          </Row>
        </Card>

        {/* Cart Items Section */}
        <div className="mt-8">
          <CartItems />
        </div>
      </div>
    </div>
  );
};

export default Profile;

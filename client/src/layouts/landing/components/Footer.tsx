import { GithubOutlined, LinkedinOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useTranslation } from "react-i18next";

const { Title, Text } = Typography;

const Footer: React.FC = () => {
  const { t } = useTranslation('landing');
  return (
    <footer className="bg-gradient-to-br from-blue-50 to-indigo-100 py-12 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold">{t('footer.company.name')}</span>
            </div>
            <Text className="mb-4 block">
              {t('footer.company.description')}
            </Text>
            <div className="flex space-x-4">
              <a
                href="https://github.com/your-username/interviewer-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200"
              >
                <GithubOutlined className="text-2xl" />
              </a>
              <a
                href="https://linkedin.com/company/interviewer-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200"
              >
                <LinkedinOutlined className="text-2xl" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <Title level={4} className="mb-4">
              {t('footer.quickLinks.title')}
            </Title>
            <div className="space-y-2">
              <a href="/" className="block transition-colors duration-200">
                {t('footer.quickLinks.home')}
              </a>
              <a
                href="/pricing"
                className="block transition-colors duration-200"
              >
                {t('footer.quickLinks.pricing')}
              </a>
              <a href="/faq" className="block transition-colors duration-200">
                {t('footer.quickLinks.faq')}
              </a>
              <a href="/login" className="block transition-colors duration-200">
                {t('footer.quickLinks.login')}
              </a>
            </div>
          </div>

          {/* Support */}
          <div>
            <Title level={4} className="text-white mb-4">
              {t('footer.support.title')}
            </Title>
            <div className="space-y-2">
              <a href="/faq" className="block transition-colors duration-200">
                {t('footer.support.helpCenter')}
              </a>
              <a
                href="mailto:support@interviewerai.com"
                className="block transition-colors duration-200"
              >
                {t('footer.support.contactUs')}
              </a>
              <a href="/terms" className="block transition-colors duration-200">
                {t('footer.support.termsOfService')}
              </a>
              <a
                href="/privacy"
                className="block transition-colors duration-200"
              >
                {t('footer.support.privacyPolicy')}
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <Text className="text-gray-400">
            {t('footer.copyright')}
          </Text>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { Collapse, Typography } from 'antd';
import { useTranslation } from 'react-i18next';
import { QuestionCircleOutlined } from '@ant-design/icons';

const { Title, Paragraph } = Typography;

const FAQ: React.FC = () => {
  const { t } = useTranslation('landing');

  const faqItems = [
    {
      key: '1',
      label: t('faq.items.quality.question'),
      children: (
        <Paragraph className="text-gray-600">
          {t('faq.items.quality.answer')}
        </Paragraph>
      ),
    },
    {
      key: '2', 
      label: t('faq.items.shipping.question'),
      children: (
        <Paragraph className="text-gray-600">
          {t('faq.items.shipping.answer')}
        </Paragraph>
      ),
    },
    {
      key: '3',
      label: t('faq.items.sizing.question'),
      children: (
        <Paragraph className="text-gray-600">
          {t('faq.items.sizing.answer')}
        </Paragraph>
      ),
    },
    {
      key: '4',
      label: t('faq.items.returns.question'),
      children: (
        <Paragraph className="text-gray-600">
          {t('faq.items.returns.answer')}
        </Paragraph>
      ),
    },
    {
      key: '5',
      label: t('faq.items.maintenance.question'),
      children: (
        <Paragraph className="text-gray-600">
          {t('faq.items.maintenance.answer')}
        </Paragraph>
      ),
    },
    {
      key: '6',
      label: t('faq.items.customization.question'),
      children: (
        <Paragraph className="text-gray-600">
          {t('faq.items.customization.answer')}
        </Paragraph>
      ),
    },
  ];

  return (
    <section id="faq" className="py-20 bg-gradient-to-br from-primary-50 to-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <QuestionCircleOutlined className="text-6xl text-primary-500 mb-6" />
          <Title level={2} className="text-4xl font-bold text-gray-800 mb-4">
            {t('faq.title')}
          </Title>
          <Paragraph className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </Paragraph>
        </div>

        <Collapse
          items={faqItems}
          size="large"
          className="bg-white/80 backdrop-blur-sm border-primary-200"
          expandIconPosition="end"
          ghost={false}
        />

        <div className="text-center mt-12">
          <Paragraph className="text-gray-600 mb-4">
            {t('faq.stillHaveQuestions')}
          </Paragraph>
          <a 
            href="mailto:support@renartgold.com" 
            className="inline-flex items-center px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200"
          >
            {t('faq.contactUs')}
          </a>
        </div>
      </div>
    </section>
  )
}

export default FAQ;
import { Button, Card, Col, Row, Typography } from "antd";
import {
  CrownOutlined,
  SafetyOutlined,
  StarOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import { UserAuth } from "../../../context/auth/AuthContext";

const { Title, Paragraph } = Typography;

const AboutUs: React.FC = () => {
  const { t } = useTranslation("landing");
  const navigate = useNavigate();
  const { session } = UserAuth();

  const features = [
    {
      icon: <CrownOutlined className="text-4xl text-primary-500" />,
      title: t("aboutUs.features.premium.title"),
      description: t("aboutUs.features.premium.description"),
    },
    {
      icon: <SafetyOutlined className="text-4xl text-primary-500" />,
      title: t("aboutUs.features.certified.title"),
      description: t("aboutUs.features.certified.description"),
    },
    {
      icon: <StarOutlined className="text-4xl text-primary-500" />,
      title: t("aboutUs.features.craftsmanship.title"),
      description: t("aboutUs.features.craftsmanship.description"),
    },
    {
      icon: <TrophyOutlined className="text-4xl text-primary-500" />,
      title: t("aboutUs.features.lifetime.title"),
      description: t("aboutUs.features.lifetime.description"),
    },
  ];

  return (
    <section
      id="about-us"
      className="py-20 bg-gradient-to-br from-white to-primary-50"
    >
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Title
            level={1}
            className="text-5xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent mb-6"
          >
            {t("aboutUs.hero.title")}
          </Title>
          <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t("aboutUs.hero.subtitle")}
          </Paragraph>
          <div className="mt-8 space-x-4">
            <Button
              type="primary"
              size="large"
              className="bg-primary-500 hover:bg-primary-600 border-none px-8 py-6 h-auto rounded-lg text-lg font-medium"
              onClick={() => {
                document
                  .getElementById("products")
                  ?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              {t("aboutUs.hero.viewProducts")}
            </Button>
            <Button
              size="large"
              className="border-primary-500 text-primary-600 hover:border-primary-600 hover:text-primary-700 px-8 py-6 h-auto rounded-lg text-lg font-medium"
              onClick={() => {
                if (session) {
                  navigate("/profile");
                } else {
                  navigate("/auth/signup");
                }
              }}
            >
              {session
                ? t("header.actions.dashboard")
                : t("header.actions.dashboard")}
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <Row gutter={[32, 32]} className="mt-20">
          {features.map((feature, index) => (
            <Col xs={24} sm={12} lg={6} key={index}>
              <Card
                className="text-center h-full border-primary-200 hover:border-primary-400 hover:shadow-lg transition-all duration-300 bg-white/80 backdrop-blur-sm"
                bodyStyle={{ padding: "2rem 1.5rem" }}
              >
                <div className="mb-4">{feature.icon}</div>
                <Title level={4} className="text-gray-800 mb-3">
                  {feature.title}
                </Title>
                <Paragraph className="text-gray-600 leading-relaxed">
                  {feature.description}
                </Paragraph>
              </Card>
            </Col>
          ))}
        </Row>

        {/* About Section */}
        <div className="mt-20 text-center">
          <Row gutter={48} align="middle">
            <Col xs={24} lg={12}>
              <div className="mb-8 lg:mb-0">
                <Title
                  level={2}
                  className="text-3xl font-bold text-gray-800 mb-6"
                >
                  {t("aboutUs.story.title")}
                </Title>
                <Paragraph className="text-lg text-gray-600 leading-relaxed mb-6">
                  {t("aboutUs.story.description")}
                </Paragraph>
                <div className="flex justify-center space-x-8 text-center">
                  <div>
                    <Title
                      level={3}
                      className="text-primary-600 font-bold mb-2"
                    >
                      50+
                    </Title>
                    <Paragraph className="text-gray-600">
                      {t("aboutUs.stats.years")}
                    </Paragraph>
                  </div>
                  <div>
                    <Title
                      level={3}
                      className="text-primary-600 font-bold mb-2"
                    >
                      10K+
                    </Title>
                    <Paragraph className="text-gray-600">
                      {t("aboutUs.stats.customers")}
                    </Paragraph>
                  </div>
                  <div>
                    <Title
                      level={3}
                      className="text-primary-600 font-bold mb-2"
                    >
                      99%
                    </Title>
                    <Paragraph className="text-gray-600">
                      {t("aboutUs.stats.satisfaction")}
                    </Paragraph>
                  </div>
                </div>
              </div>
            </Col>
            <Col xs={24} lg={12}>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                  alt="Jewelry Craftsmanship"
                  className="rounded-lg shadow-xl w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;

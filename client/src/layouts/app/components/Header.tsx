import { CheckOutlined, CloseOutlined, MenuOutlined } from "@ant-design/icons";
import { Button, Dropdown, Space } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, NavLink, useLocation, useNavigate } from "react-router";
import { UserAuth } from "../../../context/auth/AuthContext";
import { useScrollToTop } from "../../../hooks/useScrollToTop";
import CartIcon from "../../../components/cart/CartIcon";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { session } = UserAuth();
  const { scrollToElement, scrollToTop } = useScrollToTop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { i18n, t } = useTranslation("landing");

  const languages = {
    en: { key: "en", flag: "🇬🇧", name: "English" },
    tr: { key: "tr", flag: "🇹🇷", name: "Türkçe" },
  };

  const currentLanguage =
    languages[i18n.language as keyof typeof languages] || languages.en;

  const handleLanguageChange = (language: string) => {
    i18n.changeLanguage(language);
  };

  const navItems = [
    { label: t("header.navigation.aboutUs"), scrollElement: "about-us" },
    { label: t("header.navigation.products"), scrollElement: "products" },
    { label: t("header.navigation.faq"), scrollElement: "faq" },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link
              to={""}
              onClick={() => scrollToTop()}
              className="text-2xl font-bold group transition-colors duration-200"
            >
              <span className="text-primary-500 group-hover:text-primary-600 transition-colors">
                Renart Karat
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                onClick={() =>
                  scrollToElement(item.scrollElement, {
                    navigateTo: location.pathname == "/" ? null : "/",
                  })
                }
                className="text-gray-700 hover:text-primary-600 font-medium transition-colors duration-200 cursor-pointer"
              >
                {item.label}
              </a>
            ))}

            {/* Language Toggler */}
            <Dropdown
              menu={{
                items: Object.values(languages).map((lang) => ({
                  key: lang.key,
                  label: (
                    <Space>
                      <span className="">{lang.flag}</span>
                      {lang.name}
                      {i18n.language === lang.key && (
                        <CheckOutlined style={{ color: "#52c41a" }} />
                      )}
                    </Space>
                  ),
                  onClick: () => handleLanguageChange(lang.key),
                })),
              }}
              trigger={["click"]}
              placement="bottomRight"
            >
              <Button
                type="text"
                className="flex items-center px-3 py-1 text-gray-700 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-all duration-200 border border-transparent hover:border-primary-200"
              >
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="text-sm font-medium">
                  {currentLanguage.key.toUpperCase()}
                </span>
              </Button>
            </Dropdown>

            {session ? (
              <div className="flex items-center space-x-3">
                <NavLink
                  to="profile"
                  className="hover:text-primary-700 transition-colors"
                >
                  @{session.user.user_metadata.username}
                </NavLink>

                <CartIcon />
              </div>
            ) : (
              <Button
                type="primary"
                size="middle"
                className="ml-4 bg-primary-500 hover:bg-primary-600 border-none rounded-lg px-6"
                onClick={() => navigate("auth/signup")}
              >
                {t("header.actions.getStarted")}
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              type="text"
              icon={mobileMenuOpen ? <CloseOutlined /> : <MenuOutlined />}
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-primary-600 transition-colors"
            />
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <nav className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  onClick={() => {
                    scrollToElement(item.scrollElement);
                    toggleMobileMenu();
                  }}
                  className="block text-gray-700 hover:text-primary-600 font-medium py-1 transition-colors duration-200 cursor-pointer"
                >
                  {item.label}
                </a>
              ))}

              {/* Mobile Language Selector */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="text-gray-500 text-sm font-medium mb-2">
                  {t("header.language.label")}
                </div>
                <div className="flex space-x-2">
                  {Object.values(languages).map((lang) => (
                    <Button
                      key={lang.key}
                      size="small"
                      type={i18n.language === lang.key ? "primary" : "default"}
                      className={`flex items-center space-x-1 ${
                        i18n.language === lang.key
                          ? "bg-primary-500 border-primary-500 text-white"
                          : "border-primary-600 text-primary-600 hover:bg-primary-50"
                      }`}
                      onClick={() => {
                        handleLanguageChange(lang.key);
                        toggleMobileMenu();
                      }}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.key.toUpperCase()}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {session ? (
                <div className="mt-4 space-y-3">
                  <div className="text-gray-700 font-medium text-center py-2">
                    {t("header.actions.welcome", {
                      username: session.user.user_metadata.username,
                    })}
                  </div>
                  <Button
                    type="primary"
                    size="large"
                    className="w-full bg-primary-500 hover:bg-primary-600 border-none rounded-lg"
                    onClick={() => {
                      navigate("/profile");
                      toggleMobileMenu();
                    }}
                  >
                    {t("header.actions.dashboard")}
                  </Button>
                </div>
              ) : (
                <Button
                  type="primary"
                  size="large"
                  className="mt-4 w-full bg-primary-500 hover:bg-primary-600 border-none rounded-lg"
                  onClick={() => {
                    navigate("auth/signup");
                    toggleMobileMenu();
                  }}
                >
                  {t("header.actions.getStarted")}
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

import { ReloadOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Col, Input, Row, Slider, Typography } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const { Text } = Typography;

export interface FilterValues {
  priceRange: [number, number];
  popularityRange: [number, number];
  search: string;
}

interface ProductFiltersProps {
  onFilter: (filters: FilterValues) => void;
  loading?: boolean;
  onReset?: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  onFilter,
  loading,
  onReset,
}) => {
  const { t } = useTranslation("landing");

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [popularityRange, setPopularityRange] = useState<[number, number]>([
    0, 1,
  ]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleFilter = () => {
    onFilter({
      priceRange,
      popularityRange,
      search: searchTerm,
    });
  };

  const handleReset = () => {
    setPriceRange([0, 1000]);
    setPopularityRange([0, 1]);
    setSearchTerm("");
    onReset?.();
  };

  return (
    <div className="">
      <div className="flex w-full px-5 md:px-0 justify-center">
        {/* Filter Title */}
        <Row gutter={[24, 16]} align="middle">
          <Col xs={24} sm={12} lg={6}>
            <div className="space-y-2">
              <Text strong className="text-gray-700">
                {t("products.priceRange") || "Price Range"}
              </Text>
              <div className="px-2">
                <Slider
                  range
                  min={0}
                  max={1000}
                  step={10}
                  value={priceRange}
                  onChange={(value) => setPriceRange(value as [number, number])}
                  tooltip={{
                    formatter: (value) => `$${value}`,
                  }}
                  trackStyle={[{ backgroundColor: "#df7e1a" }]}
                  handleStyle={[
                    { borderColor: "#df7e1a", backgroundColor: "#df7e1a" },
                    { borderColor: "#df7e1a", backgroundColor: "#df7e1a" },
                  ]}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}</span>
              </div>
            </div>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <div className="space-y-2">
              <Text strong className="text-gray-700">
                {t("products.popularityRange") || "Popularity"}
              </Text>
              <div className="px-2">
                <Slider
                  range
                  min={0}
                  max={1}
                  step={0.1}
                  value={popularityRange}
                  onChange={(value) =>
                    setPopularityRange(value as [number, number])
                  }
                  tooltip={{
                    formatter: (value) => `${((value || 0) * 100).toFixed(0)}%`,
                  }}
                  trackStyle={[{ backgroundColor: "#df7e1a" }]}
                  handleStyle={[
                    { borderColor: "#df7e1a", backgroundColor: "#df7e1a" },
                    { borderColor: "#df7e1a", backgroundColor: "#df7e1a" },
                  ]}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>{(popularityRange[0] * 100).toFixed(0)}%</span>
                <span>{(popularityRange[1] * 100).toFixed(0)}%</span>
              </div>
            </div>
          </Col>

          {/* Search Input */}
          <Col xs={24} sm={12} lg={8}>
            <div className="space-y-2">
              <Text strong className="text-gray-700">
                {t("products.search") || "Search Products"}
              </Text>
              <Input
                placeholder={
                  t("products.searchPlaceholder") || "Search by name..."
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onPressEnter={handleFilter}
                className="border-gray-300 focus:border-primary-500"
              />
            </div>
          </Col>

          {/* Action Buttons */}
          <Col xs={24} sm={12} lg={4}>
            <div className="flex gap-2 mt-6">
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleFilter}
                loading={loading}
                className="bg-primary-500 hover:bg-primary-600 border-0 flex-1"
              >
                {t("products.filter") || "Filter"}
              </Button>
              <Button
                icon={<ReloadOutlined />}
                onClick={handleReset}
                className="border-primary-300 text-primary-600 hover:border-primary-500"
              >
                {t("products.reset") || "Reset"}
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ProductFilters;

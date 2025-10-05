import { useQuery } from "@tanstack/react-query";
import { Alert, Typography } from "antd";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CustomSlider from "../../../components/ui/CustomSlider";
import type { FilterValues } from "./components/ProductFilters";
import ProductFilters from "./components/ProductFilters";
import ProductItem from "./components/ProductItem";
import type { ProductFilters as ProductFiltersType } from "./services/productsService";
import { getProducts } from "./services/productsService";

const { Title, Paragraph } = Typography;

const Products: React.FC = () => {
  const { t } = useTranslation(["landing", "common"]);
  const [filters, setFilters] = useState<ProductFiltersType | undefined>(
    undefined,
  );

  // Fetch products using TanStack Query
  const {
    data: products,
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["products", filters],
    queryFn: () => getProducts(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });

  const handleFilter = (filterValues: FilterValues) => {
    setFilters({
      priceRange: filterValues.priceRange,
      popularityRange: filterValues.popularityRange,
      search: filterValues.search,
    });
  };

  const handleResetFilters = () => {
    setFilters(undefined);
  };

  return (
    <section
      id="products"
      className="py-20 bg-gradient-to-br from-white to-gray-50"
    >
      <div className="max-w-[1600px] mx-auto md:px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Title level={2} className="text-4xl font-bold text-gray-800 mb-4">
            {t("products.title")}
          </Title>
          <Paragraph className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t("products.subtitle")}
          </Paragraph>
        </div>

        <ProductFilters
          onFilter={handleFilter}
          onReset={handleResetFilters}
          loading={isLoading}
        />

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <span className="ml-4 text-lg text-gray-600">
              {t("common:loading")}
            </span>
          </div>
        )}

        {isError && (
          <div className="flex justify-center py-20">
            <Alert
              message={t("error") || "Error"}
              description={
                error?.message ||
                "Failed to load products. Please try again later."
              }
              type="error"
              showIcon
            />
          </div>
        )}

        {/* Products */}
        {!isLoading && !isError && products && products.length > 0 && (
          <CustomSlider>
            {products.map((product) => (
              <div key={product.id}>
                <ProductItem
                  id={product.id}
                  name={product.name}
                  popularity_score={product.popularity_score}
                  images={product.images}
                  price={product.price}
                />
              </div>
            ))}
          </CustomSlider>
        )}

        {/* Empty State */}
        {!isLoading && !isError && (!products || products.length === 0) && (
          <div className="text-center py-20">
            <Title level={3} className="text-gray-500 mb-4">
              {t("products.noProducts") || "No products available"}
            </Title>
            <Paragraph className="text-gray-400">
              {t("products.checkBackLater") ||
                "Please check back later for new arrivals."}
            </Paragraph>
          </div>
        )}
      </div>
    </section>
  );
};

export default Products;

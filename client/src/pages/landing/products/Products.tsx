import { useQuery } from "@tanstack/react-query";
import { Alert, Typography, Button } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
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
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 300 : 350;
      scrollContainerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      const scrollAmount = window.innerWidth < 768 ? 300 : 350;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
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
          <div className="relative px-4 lg:px-16 xl:px-20">
            <Button
              type="text"
              icon={<LeftOutlined className="text-2xl!" />}
              onClick={scrollLeft}
              className="flex absolute! left-1 sm:-left-6 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full w-12 h-12 sm:w-16 sm:h-16 items-center justify-center border border-gray-200"
            />
            <Button
              type="text"
              icon={<RightOutlined className="text-2xl!" />}
              onClick={scrollRight}
              className="flex absolute! right-1 sm:-right-6 top-1/2 transform -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full w-12 h-12 sm:w-16 sm:h-16 items-center justify-center border border-gray-200"
            />

            {/* Horizontal scroll container */}
            <div
              ref={scrollContainerRef}
              className="overflow-x-auto pb-4 horizontal-scroll"
            >
              <div className="flex gap-6 w-max min-w-full">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="flex-shrink-0 w-[calc(100vw-2rem)] sm:w-[calc(50vw-3rem)] lg:w-[calc(33.333vw-4rem)] xl:w-[calc(25vw-4.5rem)] max-w-[320px]"
                  >
                    <ProductItem
                      id={product.id}
                      name={product.name}
                      popularity_score={product.popularity_score}
                      images={product.images}
                      price={product.price}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
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

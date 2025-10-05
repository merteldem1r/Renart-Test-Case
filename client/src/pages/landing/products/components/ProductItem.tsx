import { Rate, Button } from "antd";
import { ShoppingCartOutlined, CheckOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "../../../../context/cart/CartContext";
import { useNavigate } from "react-router";
import { UserAuth } from "../../../../context/auth/AuthContext";

interface ProductImages {
  yellow: string;
  rose: string;
  white: string;
}

interface ProductItemProps {
  id: string;
  name: string;
  popularity_score: number;
  images: ProductImages;
  price: number;
}

const ProductItem: React.FC<ProductItemProps> = ({
  id,
  name,
  popularity_score,
  price,
  images,
}) => {
  const navigate = useNavigate();
  const { session } = UserAuth();
  const { t } = useTranslation("landing");
  const { addToCart, isInCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<
    "yellow" | "white" | "rose"
  >("yellow");

  const colorOptions = [
    { key: "yellow" as const, name: "Yellow Gold", color: "#E6CA97" },
    { key: "white" as const, name: "White Gold", color: "#D9D9D9" },
    { key: "rose" as const, name: "Rose Gold", color: "#E1A4A9" },
  ];

  const starRating = Number((popularity_score * 5).toFixed(1));
  const itemInCart = isInCart(id, selectedColor);

  const handleAddToCart = () => {
    addToCart({
      id,
      name,
      price,
      selectedColor,
      image: images[selectedColor],
      popularity_score,
    });
  };

  return (
    <div className="rounded-lg p-4 max-w-sm mx-auto">
      {/* Product Image */}
      <div className="rounded-[20px] mb-4 flex items-center justify-center overflow-hidden">
        <img
          src={images[selectedColor]}
          alt={name}
          className="w-full h-full object-contain"
        />
      </div>

      {/* Product Title */}
      <h3 className="text-gray-900 font-medium text-base mb-2">{name}</h3>

      {/* Price */}
      <p className="text-xl font-bold text-gray-900 mb-4">
        ${price.toFixed(2)} USD
      </p>

      {/* Color Picker */}
      <div className="flex gap-2 mb-2">
        {colorOptions.map((option) => (
          <button
            key={option.key}
            onClick={() => setSelectedColor(option.key)}
            className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer duration-200 ${
              selectedColor === option.key
                ? "border-gray-400 scale-110"
                : "border-gray-300 hover:border-gray-400"
            }`}
            style={{ backgroundColor: option.color }}
            title={option.name}
          />
        ))}
      </div>

      {/* Selected Color Name */}
      <p className="text-gray-600 text-sm mb-3">
        {colorOptions.find((option) => option.key === selectedColor)?.name}
      </p>

      {/* Popularity Score (Star Rating) */}
      <div className="flex mb-4">
        <Rate
          disabled
          defaultValue={starRating}
          className="text-sm"
          style={{ fontSize: "14px" }}
        />
        <span className="ml-2 text-gray-600 text-sm">{starRating}/5</span>
      </div>

      {/* Add to Cart Button */}
      <Button
        type="primary"
        icon={itemInCart ? <CheckOutlined /> : <ShoppingCartOutlined />}
        onClick={() => {
          if (!session) {
            navigate("/auth/signup");
          } else if (!itemInCart) {
            handleAddToCart();
          } else {
            navigate("/profile");
          }
        }}
        className={`w-full ${
          itemInCart
            ? "bg-green-500! hover:bg-green-600! border-green-500!"
            : "bg-primary-500! hover:bg-primary-600! border-primary-500!"
        }`}
        size="middle"
      >
        {itemInCart
          ? t("products.addedToCart") || "Added to Cart"
          : t("products.addToCart") || "Add to Cart"}
      </Button>
    </div>
  );
};

export default ProductItem;

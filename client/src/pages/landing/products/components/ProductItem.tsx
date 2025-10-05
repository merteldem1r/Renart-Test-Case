import { Rate } from "antd";
import React, { useState } from "react";

interface ProductImages {
  yellow: string;
  rose: string;
  white: string;
}

interface ProductItemProps {
  name: string;
  popularity_score: number;
  images: ProductImages;
  price: number;
}

const ProductItem: React.FC<ProductItemProps> = ({
  name,
  popularity_score,
  price,
  images,
}) => {
  const [selectedColor, setSelectedColor] = useState<
    "yellow" | "white" | "rose"
  >("yellow");

  const colorOptions = [
    { key: "yellow" as const, name: "Yellow Gold", color: "#E6CA97" },
    { key: "white" as const, name: "White Gold", color: "#D9D9D9" },
    { key: "rose" as const, name: "Rose Gold", color: "#E1A4A9" },
  ];

  const starRating = Number((popularity_score * 5).toFixed(1));

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
      <div className="flex">
        <Rate
          disabled
          defaultValue={starRating}
          className="text-sm"
          style={{ fontSize: "14px" }}
        />
        <span className="ml-2 text-gray-600 text-sm">{starRating}/5</span>
      </div>
    </div>
  );
};

export default ProductItem;

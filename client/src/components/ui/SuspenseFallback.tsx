import { Spin } from "antd";
import React from "react";

const SuspenseFallback: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center space-y-4">
        <Spin size="large" className="mb-5!" />
        <div className="text-center">
          <div className="text-2xl font-bold group hover:text-blue-700 transition-colors duration-200 mb-2">
            <span className="text-blue-600 group-hover:text-black transition-colors">
              Karat
            </span>
          </div>

          <p className="text-sm text-gray-500">Preparing your platform...</p>
        </div>
      </div>
    </div>
  );
};

export default SuspenseFallback;

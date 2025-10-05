import React from "react";

const SuspenseFallback: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center space-y-4">
        <div className="text-center">
          <div className="text-2xl font-bold group transition-colors duration-200 mb-2">
            <span className="text-primary-500 group-hover:text-primary-600 transition-colors">
              Renart Karat
            </span>
          </div>

          <p className="text-sm text-gray-500">Veryfing user...</p>
        </div>
      </div>
    </div>
  );
};

export default SuspenseFallback;

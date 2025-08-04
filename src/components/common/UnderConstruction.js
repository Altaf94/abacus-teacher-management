import React from 'react';

const UnderConstruction = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-md mx-auto">
        {/* Single layer content card */}
        <div className="relative bg-[#faf9ed] rounded-xl p-6 shadow-xl border-2 border-yellow-300">
          {/* Simple decorative elements */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-2 left-2 w-6 h-6 opacity-10">
              <span className="text-blue-400 text-lg">➕</span>
            </div>
            <div className="absolute bottom-2 right-2 w-6 h-6 opacity-10">
              <span className="text-yellow-600 text-lg">⬟</span>
            </div>
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center">
            <h1 className="text-xl md:text-2xl font-bold text-black">
              UNDER CONSTRUCTION 🙂
            </h1>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-6 h-6 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-4 h-4 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;

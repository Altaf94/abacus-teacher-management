import React from 'react';

const UnderConstruction = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="relative w-full max-w-2xl mx-auto">
        {/* Single layer content card */}
        <div className="relative bg-[#faf9ed] rounded-2xl p-8 shadow-2xl border-2 border-yellow-300">
          {/* Scientific symbols overlay (left side) */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-4 left-4 w-16 h-16 opacity-10">
              {/* DNA helix */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-full h-full text-blue-400"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <div className="absolute top-8 left-8 w-12 h-12 opacity-10">
              {/* Beaker */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-full h-full text-blue-400"
              >
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z" />
              </svg>
            </div>
            <div className="absolute top-12 left-12 w-10 h-10 opacity-10">
              {/* Magnifying glass */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-full h-full text-blue-400"
              >
                <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
              </svg>
            </div>

            {/* Mathematical symbols overlay (right side) */}
            <div className="absolute top-4 right-4 w-12 h-12 opacity-10">
              {/* Plus sign */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-full h-full text-yellow-600"
              >
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </svg>
            </div>
            <div className="absolute top-8 right-8 w-10 h-10 opacity-10">
              {/* Minus sign */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-full h-full text-yellow-600"
              >
                <path d="M19 13H5v-2h14v2z" />
              </svg>
            </div>
            <div className="absolute top-12 right-12 w-8 h-8 opacity-10">
              {/* Multiplication sign */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-full h-full text-yellow-600"
              >
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </div>

            {/* Geometric shapes */}
            <div className="absolute bottom-4 right-4 w-14 h-14 opacity-10">
              {/* Triangle */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-full h-full text-yellow-600"
              >
                <path d="M12 2L2 19h20L12 2z" />
              </svg>
            </div>
            <div className="absolute bottom-8 right-8 w-12 h-12 opacity-10">
              {/* Square */}
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-full h-full text-yellow-600"
              >
                <path d="M3 3v18h18V3H3zm16 16H5V5h14v14z" />
              </svg>
            </div>
          </div>

          {/* Main content */}
          <div className="relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black">
              UNDER CONSTRUCTION 🙂
            </h1>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-600"
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

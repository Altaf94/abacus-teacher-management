import React from 'react';
import { useNavigate } from 'react-router-dom';

const Worksheets = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const handleWorksheetDownload = worksheetNumber => {
    // Handle worksheet download logic here
    console.log(`Downloading Worksheet ${worksheetNumber}...`);
  };

  // Generate 14 worksheets
  const worksheets = Array.from({ length: 14 }, (_, index) => index + 1);

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-yellow-50"
      style={{
        backgroundImage: 'url(/bg-pattern.png)',
        backgroundSize: 'cover',
      }}
    >
      <div
        className="relative w-full max-w-6xl mx-auto bg-[#faf9ed] rounded-3xl shadow-2xl border border-yellow-300 p-8 md:p-16 flex flex-col items-center"
        style={{ minHeight: '80vh' }}
      >
        {/* Header Section */}
        <div className="w-full flex items-center justify-between mb-8">
          {/* Left Icon - Mathematical Theme */}
          <div className="flex items-center">
            <div className="relative">
              {/* Pencil */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#87ceeb"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute -top-2 -left-2"
              >
                <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>

              {/* Calculator */}
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ffd700"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute top-0 right-0"
              >
                <rect x="4" y="2" width="16" height="20" rx="2" />
                <rect x="8" y="6" width="8" height="4" />
                <rect x="6" y="12" width="2" height="2" />
                <rect x="10" y="12" width="2" height="2" />
                <rect x="14" y="12" width="2" height="2" />
                <rect x="6" y="16" width="2" height="2" />
                <rect x="10" y="16" width="2" height="2" />
                <rect x="14" y="16" width="2" height="2" />
              </svg>

              {/* Cube */}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#ff4444"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="absolute bottom-0 left-1"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                <polyline points="3.27,6.96 12,12.01 20.73,6.96" />
                <line x1="12" y1="22.08" x2="12" y2="12" />
              </svg>

              {/* Connecting lines */}
              <svg
                width="60"
                height="60"
                viewBox="0 0 60 60"
                fill="none"
                stroke="black"
                strokeWidth="1"
                className="absolute inset-0"
              >
                <line x1="20" y1="15" x2="35" y2="15" />
                <line x1="35" y1="15" x2="35" y2="30" />
                <line x1="15" y1="45" x2="25" y2="35" />
              </svg>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold font-serif text-black text-center">
            WORKSHEETS
          </h1>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center group focus:outline-none"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#87ceeb"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-12 h-12 mb-1"
            >
              <rect x="3" y="7" width="13" height="10" rx="2" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span className="text-black text-lg font-serif group-hover:underline">
              Logout
            </span>
          </button>
        </div>

        {/* Worksheets Grid */}
        <div className="w-full flex-1">
          <div className="grid grid-cols-7 gap-4 mb-6">
            {worksheets.map(worksheetNumber => (
              <button
                key={worksheetNumber}
                onClick={() => handleWorksheetDownload(worksheetNumber)}
                className="flex flex-col items-center bg-white rounded-xl shadow-md p-4 transition transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 border border-yellow-200"
              >
                {/* Worksheet Icon */}
                <div className="relative mb-2">
                  {/* Document */}
                  <svg
                    width="48"
                    height="48"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="black"
                    strokeWidth="1"
                    className="w-12 h-12"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14,2 14,8 20,8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                    <polyline points="10,9 9,9 8,9" />
                  </svg>

                  {/* Curled corner */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffd700"
                    strokeWidth="2"
                    className="absolute top-0 right-0 w-4 h-4"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7,10 12,15 17,10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>

                  {/* Red line near top */}
                  <div className="absolute top-3 left-2 right-2 h-0.5 bg-red-500"></div>

                  {/* Text lines */}
                  <div className="absolute top-6 left-2 right-2 space-y-1">
                    <div className="h-0.5 bg-black"></div>
                    <div className="h-0.5 bg-black"></div>
                    <div className="h-0.5 bg-black"></div>
                  </div>

                  {/* Pen */}
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#87ceeb"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="absolute -right-1 top-2 w-4 h-4"
                  >
                    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                    <path d="m15 5 4 4" />
                  </svg>
                </div>

                {/* Worksheet Label */}
                <span className="text-sm font-serif text-black text-center">
                  Worksheet {worksheetNumber}
                </span>
              </button>
            ))}
          </div>

          {/* Instruction */}
          <p className="text-center text-gray-600 italic text-lg font-serif">
            Click on worksheet to download
          </p>
        </div>

        {/* Footer Navigation */}
        <div className="w-full flex justify-start items-center mt-8">
          {/* Dashboard Button */}
          <button
            onClick={handleDashboard}
            className="flex flex-col items-center group focus:outline-none"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-12 h-12 mb-1"
            >
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
              <polyline points="9,22 9,12 15,12 15,22" />
            </svg>
            <span className="text-black text-lg font-serif group-hover:underline">
              DASHBOARD
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Worksheets;

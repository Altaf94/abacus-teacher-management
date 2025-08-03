import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Reports = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState('2024-03-24');
  const [endDate, setEndDate] = useState('2024-03-24');

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleExport = () => {
    // Handle export logic here
    console.log('Exporting reports...');
  };

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
          {/* Student Icon */}
          <div className="flex items-center">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-12 h-12 mr-4"
            >
              <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
              <path d="M6 12v5c3 3 9 3 12 0v-5" />
            </svg>
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold font-serif text-black text-center">
            REPORTS
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
              stroke="#3b82f6"
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

        {/* Duration Selection */}
        <div className="w-full mb-8">
          <h2 className="text-2xl font-bold font-serif text-black mb-4 text-center">
            Select the Duration
          </h2>
          <div className="flex items-center justify-center space-x-4">
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-lg font-serif"
            />
            <span className="text-xl font-serif text-black">to</span>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-lg font-serif"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="w-full flex-1">
          {/* Table Header */}
          <div className="bg-blue-600 text-white rounded-t-lg p-4">
            <div className="grid grid-cols-5 gap-4 text-center font-bold text-lg">
              <div>Date/Time</div>
              <div>Questions</div>
              <div>Answer</div>
              <div>Response</div>
              <div>Accuracy</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="bg-white border border-gray-300 rounded-b-lg min-h-96 flex items-center justify-center">
            <div className="text-gray-500 text-lg font-serif">
              No report data available for the selected duration
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="w-full flex justify-between items-center mt-8">
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

          {/* Go Back Button */}
          <button
            onClick={handleGoBack}
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
              <path d="M9 12l2 2 4-4" />
              <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" />
            </svg>
            <span className="text-black text-lg font-serif group-hover:underline">
              Go Back
            </span>
          </button>

          {/* Export Button */}
          <button
            onClick={handleExport}
            className="flex flex-col items-center group focus:outline-none"
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ef4444"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-12 h-12 mb-1"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="text-black text-lg font-serif group-hover:underline">
              EXPORT
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutImage from '../assets/images/Logout.png';
import UniversityImage from '../assets/images/university.png';
import ReportsImage from '../assets/images/Reports.png';
import StudentMaleImage from '../assets/images/student-male.png';

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
    <div className="h-screen w-full bg-yellow-50 p-1 sm:p-2 md:p-4 overflow-hidden">
      <div className="h-full w-full max-w-6xl mx-auto bg-[#faf9ed] rounded-2xl sm:rounded-3xl shadow-2xl border border-yellow-300 p-2 sm:p-3 md:p-4 lg:p-6 flex flex-col overflow-hidden">
        {/* Header Section */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-2 sm:mb-3 md:mb-4 gap-2 sm:gap-0 flex-shrink-0">
          {/* Student Icon */}
          <div className="flex items-center order-2 sm:order-1">
            <img
              src={StudentMaleImage}
              alt="Student"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 mr-1 sm:mr-2 md:mr-3"
            />
          </div>

          {/* Title */}
          <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-extrabold font-serif text-black text-center order-1 sm:order-2">
            REPORTS
          </h1>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center group focus:outline-none order-3"
          >
            <img
              src={LogoutImage}
              alt="Logout"
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mb-0.5 sm:mb-1"
            />
            <span className="text-black text-xs sm:text-sm md:text-base font-serif group-hover:underline">
              Logout
            </span>
          </button>
        </div>

        {/* Duration Selection */}
        <div className="w-full mb-2 sm:mb-3 md:mb-4 flex-shrink-0">
          <h2 className="text-sm sm:text-base md:text-lg lg:text-xl font-bold font-serif text-black mb-1 sm:mb-2 md:mb-3 text-center">
            Select the Duration
          </h2>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-1 sm:space-y-0 sm:space-x-2 md:space-x-3">
            <input
              type="date"
              value={startDate}
              onChange={e => setStartDate(e.target.value)}
              className="px-1 sm:px-2 md:px-3 py-1 border border-gray-300 rounded text-xs sm:text-sm md:text-base font-serif w-full sm:w-auto"
            />
            <span className="text-xs sm:text-sm md:text-base lg:text-lg font-serif text-black">
              to
            </span>
            <input
              type="date"
              value={endDate}
              onChange={e => setEndDate(e.target.value)}
              className="px-1 sm:px-2 md:px-3 py-1 border border-gray-300 rounded text-xs sm:text-sm md:text-base font-serif w-full sm:w-auto"
            />
          </div>
        </div>

        {/* Table Section */}
        <div className="w-full flex-1 min-h-0 overflow-hidden">
          {/* Table Header */}
          <div className="bg-blue-600 text-white rounded-t-lg p-1 sm:p-2 md:p-3">
            <div className="grid grid-cols-5 gap-1 sm:gap-2 md:gap-3 text-center font-bold text-xs sm:text-sm md:text-base">
              <div className="truncate px-1">Date/Time</div>
              <div className="truncate px-1">Questions</div>
              <div className="truncate px-1">Answer</div>
              <div className="truncate px-1">Response</div>
              <div className="truncate px-1">Accuracy</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="bg-white border border-gray-300 rounded-b-lg h-full flex items-center justify-center overflow-auto">
            <div className="text-gray-500 text-xs sm:text-sm md:text-base font-serif p-2 sm:p-3 text-center max-w-full">
              No report data available for the selected duration
            </div>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-center mt-2 sm:mt-3 md:mt-4 gap-2 sm:gap-0 flex-shrink-0">
          {/* Left side - Dashboard and Go Back buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
            {/* Dashboard Button */}
            <button
              onClick={handleDashboard}
              className="flex flex-col items-center group focus:outline-none"
            >
              <img
                src={UniversityImage}
                alt="Dashboard"
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mb-0.5 sm:mb-1"
              />
              <span className="text-black text-xs sm:text-sm md:text-base font-serif group-hover:underline text-center">
                DASHBOARD
              </span>
            </button>

            {/* Go Back Button */}
            <button
              onClick={handleGoBack}
              className="flex flex-col items-center group focus:outline-none"
            >
              <img
                src={ReportsImage}
                alt="Go Back"
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mb-0.5 sm:mb-1"
              />
              <span className="text-black text-xs sm:text-sm md:text-base font-serif group-hover:underline text-center">
                Go Back
              </span>
            </button>
          </div>

          {/* Right side - Export Button */}
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
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 mb-0.5 sm:mb-1"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7,10 12,15 17,10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="text-black text-xs sm:text-sm md:text-base font-serif group-hover:underline text-center">
              EXPORT
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reports;

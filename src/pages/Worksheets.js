import React from 'react';
import { useNavigate } from 'react-router-dom';
import worksheetsIcon from '../assets/images/Worksheets.png';
import studentNotesIcon from '../assets/images/student-notes.png';
import universityIcon from '../assets/images/university.png';
import logoutIcon from '../assets/images/Logout.png';

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
    <div className="min-h-screen w-full flex items-center justify-center bg-yellow-50">
      <div
        className="relative w-full max-w-6xl mx-auto bg-[#faf9ed] rounded-3xl shadow-2xl border border-yellow-300 p-4 sm:p-6 md:p-8 lg:p-16 flex flex-col items-center"
        style={{ minHeight: '80vh' }}
      >
        {/* Header Section */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between mb-4 sm:mb-8 gap-4 sm:gap-0">
          {/* Left Icon - Worksheets Theme */}
          <div className="flex items-center order-2 sm:order-1">
            <img
              src={worksheetsIcon}
              alt="Worksheets"
              className="w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 mr-2 sm:mr-4"
            />
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif text-black text-center order-1 sm:order-2">
            WORKSHEETS
          </h1>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center group focus:outline-none order-3"
          >
            <img src={logoutIcon} alt="Logout" className="w-8 h-8 sm:w-12 sm:h-12 mb-1" />
            <span className="text-black text-sm sm:text-lg font-serif group-hover:underline">
              Logout
            </span>
          </button>
        </div>

        {/* Worksheets Grid */}
        <div className="w-full flex-1">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
            {worksheets.map(worksheetNumber => (
              <button
                key={worksheetNumber}
                onClick={() => handleWorksheetDownload(worksheetNumber)}
                className="flex flex-col items-center bg-white rounded-xl shadow-md p-2 sm:p-3 md:p-4 transition transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 border border-yellow-200"
              >
                {/* Worksheet Icon */}
                <img
                  src={studentNotesIcon}
                  alt="Student Notes"
                  className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 mb-1 sm:mb-2"
                />

                {/* Worksheet Label */}
                <span className="text-xs sm:text-sm font-serif text-black text-center font-bold">
                  Worksheet {worksheetNumber}
                </span>
              </button>
            ))}
          </div>

          {/* Instruction */}
          <p className="text-center text-gray-600 italic text-sm sm:text-base md:text-lg font-serif font-bold">
            Click on worksheet to download
          </p>
        </div>

        {/* Footer Navigation */}
        <div className="w-full flex justify-start items-center mt-4 sm:mt-8">
          {/* Dashboard Button */}
          <button
            onClick={handleDashboard}
            className="flex flex-col items-center group focus:outline-none"
          >
            <img
              src={universityIcon}
              alt="Dashboard"
              className="w-8 h-8 sm:w-12 sm:h-12 mb-1"
            />
            <span className="text-black text-sm sm:text-lg font-serif group-hover:underline">
              DASHBOARD
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Worksheets;

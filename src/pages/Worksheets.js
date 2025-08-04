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
        className="relative w-full max-w-6xl mx-auto bg-[#faf9ed] rounded-3xl shadow-2xl border border-yellow-300 p-8 md:p-16 flex flex-col items-center"
        style={{ minHeight: '80vh' }}
      >
        {/* Header Section */}
        <div className="w-full flex items-center justify-between mb-8">
          {/* Left Icon - Worksheets Theme */}
          <div className="flex items-center">
            <img
              src={worksheetsIcon}
              alt="Worksheets"
              className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 mr-4"
            />
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
            <img src={logoutIcon} alt="Logout" className="w-12 h-12 mb-1" />
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
                <img
                  src={studentNotesIcon}
                  alt="Student Notes"
                  className="w-12 h-12 mb-2"
                />

                {/* Worksheet Label */}
                <span className="text-sm font-serif text-black text-center font-bold">
                  Worksheet {worksheetNumber}
                </span>
              </button>
            ))}
          </div>

          {/* Instruction */}
          <p className="text-center text-gray-600 italic text-lg font-serif font-bold">
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
            <img
              src={universityIcon}
              alt="Dashboard"
              className="w-12 h-12 mb-1"
            />
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

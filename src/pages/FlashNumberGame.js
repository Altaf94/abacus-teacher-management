import React from 'react';
import { useNavigate } from 'react-router-dom';
import flashNumberIcon from '../assets/images/Flashnumber.png';
import logoutIcon from '../assets/images/Logout.png';
import universityIcon from '../assets/images/university.png';
import chemistryIcon from '../assets/images/chemistry.png';

const activities = Array.from({ length: 12 }, (_, i) => {
  const activityTypes = [
    'Flash Number Game',
    'Abacus Addition',
    'Abacus Subtraction',
    'Abacus Multiplication',
    'Large Number Recognition',
  ];
  const typeIndex = i % activityTypes.length;
  return {
    id: i + 1,
    title: activityTypes[typeIndex],
  };
});

export default function FlashNumberGame() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center">
      <div className="bg-[#faf9ed] rounded-3xl shadow-lg w-[95vw] max-w-[1600px] min-h-[90vh] p-4 sm:p-6 md:p-8 flex flex-col relative">
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start mb-4 sm:mb-6 md:mb-8 gap-4 sm:gap-0">
          {/* Left Icon */}
          <div className="flex flex-col items-center order-2 sm:order-1">
            <img
              src={flashNumberIcon}
              alt="Flash Number"
              className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24"
            />
          </div>
          {/* Title */}
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center tracking-wide order-1 sm:order-2"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            ABACUS FLASH GAME
          </h1>
          {/* Logout */}
          <div
            className="flex flex-col items-center order-3 cursor-pointer hover:scale-105 transition-transform p-2 rounded-lg hover:bg-gray-100"
            onClick={() => navigate('/login')}
          >
            <img
              src={logoutIcon}
              alt="Logout"
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 drop-shadow-sm"
            />
            <span className="text-sm sm:text-base md:text-xl mt-1 sm:mt-2 font-medium text-gray-700">
              Logout
            </span>
          </div>
        </div>
        {/* Activities Grid */}
        <div className="flex-1 flex items-center justify-center px-4 pb-20 sm:pb-24 md:pb-28">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12">
            {activities.map(activity => (
              <div
                key={activity.id}
                className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                onClick={() => {
                  navigate(`/activity/${activity.id}`);
                }}
              >
                <img
                  src={chemistryIcon}
                  alt="Activity"
                  className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28"
                />
                <span className="mt-2 text-xs sm:text-sm md:text-base lg:text-lg font-serif text-center px-1">
                  {activity.title}
                </span>
              </div>
            ))}
          </div>
        </div>
        {/* Bottom Left Dashboard */}
        <div
          className="absolute left-2 sm:left-4 md:left-8 bottom-2 sm:bottom-4 md:bottom-6 flex flex-col items-center z-10 cursor-pointer hover:scale-105 transition-transform p-2 rounded-lg hover:bg-gray-100"
          onClick={() => navigate('/dashboard')}
        >
          <img
            src={universityIcon}
            alt="University"
            className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 drop-shadow-sm"
          />
          <span className="text-xs sm:text-sm md:text-lg font-medium mt-1 text-center text-gray-700">
            DASHBOARD
          </span>
        </div>

        {/* Direct Flash Game Link */}
        <div className="absolute right-2 sm:right-4 md:right-8 bottom-2 sm:bottom-4 md:bottom-6 flex flex-col items-center z-10">
          <button
            onClick={() => navigate('/activity/1')}
            className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform p-2 rounded-lg hover:bg-gray-100"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-red-500 rounded-lg flex items-center justify-center mb-2">
              <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-yellow-400 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm md:text-base font-bold">
                    F
                  </span>
                </div>
              </div>
            </div>
            <span className="text-xs sm:text-sm md:text-lg font-medium text-center text-gray-700">
              DIRECT FLASH
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

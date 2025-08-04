import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoutIcon from '../assets/images/Logout.png';
import universityIcon from '../assets/images/university.png';
import notificationsIcon from '../assets/images/Notifications.png';
import notificationBulbIcon from '../assets/images/Notification-Blub.png';
import { getTypographyClass } from '../utils/typography';

const Notifications = () => {
  const navigate = useNavigate();

  // Sample notification data
  const notifications = [
    {
      id: 1,
      date: 'March 23, 2025',
      time: '13:42',
      message:
        'Miss Sarah has assigned you a challenge on flash game which need to complete by April 2, 2025',
      subMessage: 'Attempt the challenge and get 5 points.',
      status: 'active', // active = yellow lightbulb, inactive = blue lightbulb
    },
    {
      id: 2,
      date: 'March 18, 2025',
      time: '13:42',
      message:
        'Miss Sarah has assigned you a worksheet which needs to be completed by April 1, 2025',
      subMessage: 'Submit the worksheet and get 10 points.',
      status: 'inactive',
    },
  ];

  const handleLogout = () => {
    // Add logout logic here
    navigate('/login');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background - Full light yellow */}
      <div className="absolute inset-0 bg-yellow-50">
        {/* Mathematical symbols pattern scattered across the background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 text-yellow-400 text-4xl">
            ➕
          </div>
          <div className="absolute top-20 right-20 text-yellow-400 text-3xl">
            ➗
          </div>
          <div className="absolute top-40 left-20 text-yellow-400 text-2xl">
            △
          </div>
          <div className="absolute top-60 right-10 text-yellow-400 text-3xl">
            ⬟
          </div>
          <div className="absolute top-80 left-10 text-yellow-400 text-2xl">
            π
          </div>
          <div className="absolute top-30 right-40 text-yellow-400 text-3xl">
            ×
          </div>
          <div className="absolute top-70 left-40 text-yellow-400 text-2xl">
            ÷
          </div>
          <div className="absolute top-90 right-30 text-yellow-400 text-3xl">
            =
          </div>
        </div>
      </div>

      {/* Main content panel */}
      <div className="relative w-full max-w-4xl mx-auto bg-[#faf9ed] rounded-2xl shadow-xl border border-yellow-300 p-6 md:p-8 lg:p-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {/* Left side - Notification icon */}
          <div className="flex items-center space-x-4">
            <img
              src={notificationsIcon}
              alt="Notifications"
              className="w-20 h-24"
            />
          </div>

          {/* Center - Title */}
          <div className="flex items-center">
            <h1
              className={`${getTypographyClass('h1')} text-black tracking-wide`}
            >
              NOTIFICATION
            </h1>
          </div>

          {/* Right side - Logout button */}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center group focus:outline-none"
          >
            <img src={logoutIcon} alt="Logout" className="w-16 h-16 mb-1" />
            <span
              className={`text-black ${getTypographyClass('nav')} group-hover:underline`}
            >
              Logout
            </span>
          </button>
        </div>

        {/* Notifications Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Table Header */}
          <div className="bg-blue-500 text-white px-6 py-4">
            <div
              className={`grid grid-cols-12 gap-4 ${getTypographyClass('nav')}`}
            >
              <div className="col-span-3">Date/Time</div>
              <div className="col-span-8">Notifications</div>
              <div className="col-span-1">Status</div>
            </div>
          </div>

          {/* Table Body */}
          <div className="divide-y divide-gray-200">
            {notifications.map((notification, index) => (
              <div key={notification.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="grid grid-cols-12 gap-4 items-start">
                  {/* Date/Time */}
                  <div className="col-span-3">
                    <div
                      className={`${getTypographyClass('bodySmall')} font-medium text-gray-900`}
                    >
                      {notification.date}
                    </div>
                    <div
                      className={`${getTypographyClass('caption')} text-gray-500`}
                    >
                      {notification.time}
                    </div>
                  </div>

                  {/* Notification Message */}
                  <div className="col-span-8">
                    <div
                      className={`${getTypographyClass('bodySmall')} text-gray-900 mb-1`}
                    >
                      {notification.message}
                    </div>
                    <div
                      className={`${getTypographyClass('caption')} text-gray-600 ml-4`}
                    >
                      {notification.subMessage}
                    </div>
                  </div>

                  {/* Status Icon */}
                  <div className="col-span-1 flex justify-center">
                    <img
                      src={notificationBulbIcon}
                      alt="Status"
                      className={`w-10 h-10 ${notification.status === 'active' ? 'opacity-100' : 'opacity-60'}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer - Dashboard button */}
        <div className="mt-8 flex justify-start">
          <button
            onClick={handleDashboard}
            className="flex flex-col items-center group focus:outline-none"
          >
            <img
              src={universityIcon}
              alt="Dashboard"
              className="w-16 h-16 mb-2"
            />
            <span
              className={`text-black ${getTypographyClass('nav')} group-hover:underline`}
            >
              DASHBOARD
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

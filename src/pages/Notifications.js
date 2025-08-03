import React from 'react';
import { useNavigate } from 'react-router-dom';

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
      {/* Background with geometric shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-300 to-yellow-300">
        {/* Blue section with white shapes */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-blue-400">
          <div className="absolute top-4 left-4 w-8 h-8 bg-white rounded-full opacity-20"></div>
          <div className="absolute top-12 right-8 w-6 h-6 bg-white rounded-lg opacity-20"></div>
          <div className="absolute top-20 left-1/4 w-10 h-10 bg-white rounded-full opacity-20"></div>
        </div>

        {/* Yellow section with geometric shapes */}
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-yellow-300">
          <div className="absolute bottom-8 right-8 w-6 h-6 bg-yellow-200 rounded-full"></div>
          <div className="absolute bottom-16 right-16 w-4 h-4 bg-yellow-200 transform rotate-45"></div>
          <div className="absolute bottom-24 right-24 w-8 h-8 bg-yellow-200 rounded-full"></div>
          <div className="absolute bottom-32 right-32 w-5 h-5 bg-yellow-200 transform rotate-45"></div>
          <div className="absolute bottom-40 right-40 w-6 h-6 bg-yellow-200 rounded-full"></div>
          <div className="absolute bottom-48 right-48 w-4 h-4 bg-yellow-200 transform rotate-45"></div>
        </div>
      </div>

      {/* Main content panel */}
      <div className="relative w-full max-w-4xl mx-auto bg-[#faf9ed] rounded-2xl shadow-xl border border-yellow-300 p-6 md:p-8 lg:p-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {/* Left side - Title with icon */}
          <div className="flex items-center space-x-4">
            {/* Document with lightbulb and paper airplanes icon */}
            <div className="relative">
              <div className="w-12 h-16 bg-white rounded border-2 border-gray-300 relative">
                {/* Lightbulb on document */}
                <div className="absolute top-1 left-1/2 transform -translate-x-1/2">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mx-auto mt-1"></div>
                </div>
                {/* Paper airplanes */}
                <div className="absolute top-2 right-1">
                  <div className="w-3 h-3 bg-red-400 transform rotate-45"></div>
                </div>
                <div className="absolute top-4 right-3">
                  <div className="w-2 h-2 bg-blue-400 transform rotate-45"></div>
                </div>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-extrabold font-serif text-black tracking-wide">
              NOTIFICATION
            </h1>
          </div>

          {/* Right side - Logout button */}
          <button
            onClick={handleLogout}
            className="flex flex-col items-center group focus:outline-none"
          >
            <div className="relative">
              {/* House icon */}
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="#3b82f6"
                stroke="#3b82f6"
                strokeWidth="1"
                className="w-10 h-10 mb-1"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9,22 9,12 15,12 15,22" />
              </svg>
              {/* Red arrow pointing left */}
              <div className="absolute -left-1 top-1/2 transform -translate-y-1/2">
                <div className="w-0 h-0 border-r-4 border-r-red-500 border-t-2 border-t-transparent border-b-2 border-b-transparent"></div>
              </div>
            </div>
            <span className="text-black text-sm font-serif group-hover:underline">
              Logout
            </span>
          </button>
        </div>

        {/* Notifications Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          {/* Table Header */}
          <div className="bg-blue-500 text-white px-6 py-4">
            <div className="grid grid-cols-12 gap-4 font-semibold">
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
                    <div className="text-sm font-medium text-gray-900">
                      {notification.date}
                    </div>
                    <div className="text-sm text-gray-500">
                      {notification.time}
                    </div>
                  </div>

                  {/* Notification Message */}
                  <div className="col-span-8">
                    <div className="text-sm text-gray-900 mb-1">
                      {notification.message}
                    </div>
                    <div className="text-sm text-gray-600 ml-4">
                      {notification.subMessage}
                    </div>
                  </div>

                  {/* Status Icon */}
                  <div className="col-span-1 flex justify-center">
                    <div className="relative">
                      {/* Lightbulb base */}
                      <div
                        className={`w-6 h-6 rounded-full ${notification.status === 'active' ? 'bg-yellow-400' : 'bg-blue-500'}`}
                      ></div>
                      {/* Lightbulb top */}
                      <div
                        className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full ${notification.status === 'active' ? 'bg-yellow-400' : 'bg-blue-500'}`}
                      ></div>
                    </div>
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
            {/* School building icon */}
            <div className="relative w-12 h-12 mb-2">
              {/* Building */}
              <div className="absolute bottom-0 w-10 h-8 bg-brown-600 rounded-t"></div>
              {/* Roof */}
              <div className="absolute top-0 left-1 w-8 h-3 bg-red-500 transform rotate-45 origin-bottom-left"></div>
              {/* Windows */}
              <div className="absolute bottom-2 left-2 w-2 h-2 bg-white rounded"></div>
              <div className="absolute bottom-2 right-2 w-2 h-2 bg-white rounded"></div>
              {/* Clock tower */}
              <div className="absolute -top-2 right-0 w-3 h-4 bg-brown-700 rounded-t"></div>
              <div className="absolute -top-3 right-1 w-1 h-1 bg-yellow-400 rounded-full"></div>
            </div>
            <span className="text-black text-sm font-serif group-hover:underline">
              DASHBOARD
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Notifications;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import logoutIcon from '../assets/images/Logout.png';
import universityIcon from '../assets/images/university.png';

export default function NotificationSent() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-yellow-200/60" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8">
        <div className="bg-[#faf9ed] rounded-3xl shadow-lg w-[95vw] max-w-[1600px] min-h-[88vh] p-6 md:p-10 flex flex-col relative items-center">
          {/* Logout top-right */}
          <button
            onClick={() => navigate('/login')}
            className="absolute top-4 right-4 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
          >
            <img
              src={logoutIcon}
              alt="Logout"
              className="w-10 h-10 md:w-16 md:h-16"
            />
            <span className="text-xs md:text-sm mt-1">Logout</span>
          </button>

          {/* Message */}
          <div className="flex-1 w-full flex items-center justify-center">
            <h1
              className="text-2xl md:text-4xl font-semibold text-center px-4"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              Notification have been sent to students
            </h1>
          </div>

          {/* Dashboard button */}
          <div className="pb-6">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={universityIcon}
                alt="Dashboard"
                className="w-16 h-16 md:w-24 md:h-24"
              />
              <span className="text-sm md:text-base font-semibold mt-2">
                DASHBOARD
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    tmeId: '',
    name: '',
    level: '',
    email: '',
    password: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save the data to your backend
    console.log('Saving profile data:', formData);
  };

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background - Full light yellow */}
      <div className="absolute inset-0 bg-yellow-100">
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

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        {/* Profile Card */}
        <div className="bg-amber-50 rounded-2xl shadow-xl border border-amber-200 p-8 max-w-4xl w-full relative">
          {/* Profile Icon - Top Left */}
          <div className="absolute top-4 left-4 flex flex-col items-center">
            <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center mb-1">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-xs text-gray-600">Profile</span>
          </div>

          {/* Logout Icon - Top Right */}
          <button
            onClick={handleLogout}
            className="absolute top-4 right-4 flex flex-col items-center group focus:outline-none"
          >
            <div className="w-12 h-12 bg-blue-200 rounded-lg flex items-center justify-center mb-1 group-hover:bg-blue-300 transition-colors">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <span className="text-xs text-black group-hover:underline">
              Logout
            </span>
          </button>

          {/* Dashboard Icon - Bottom Left */}
          <button
            onClick={handleDashboard}
            className="absolute bottom-4 left-4 flex flex-col items-center group focus:outline-none"
          >
            <div className="w-12 h-12 bg-red-200 rounded-lg flex items-center justify-center mb-1 group-hover:bg-red-300 transition-colors">
              <svg
                className="w-8 h-8 text-red-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
            </div>
            <span className="text-xs text-black font-bold group-hover:underline">
              DASHBOARD
            </span>
          </button>

          {/* Title */}
          <h1 className="text-3xl font-bold text-black text-center mb-8">
            My Profile
          </h1>

          {/* Form and Student Illustration */}
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Form Fields */}
            <div className="flex-1 space-y-4">
              <div className="flex items-center">
                <label className="w-24 text-black font-medium">TME ID:</label>
                <input
                  type="text"
                  name="tmeId"
                  value={formData.tmeId}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="flex-1 ml-4 px-3 py-2 border border-blue-600 rounded bg-white text-black disabled:bg-gray-100"
                />
              </div>

              <div className="flex items-center">
                <label className="w-24 text-black font-medium">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="flex-1 ml-4 px-3 py-2 border border-blue-600 rounded bg-white text-black disabled:bg-gray-100"
                />
              </div>

              <div className="flex items-center">
                <label className="w-24 text-black font-medium">Level:</label>
                <input
                  type="text"
                  name="level"
                  value={formData.level}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="flex-1 ml-4 px-3 py-2 border border-blue-600 rounded bg-white text-black disabled:bg-gray-100"
                />
              </div>

              <div className="flex items-center">
                <label className="w-24 text-black font-medium">
                  Email Address:
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="flex-1 ml-4 px-3 py-2 border border-blue-600 rounded bg-white text-black disabled:bg-gray-100"
                />
              </div>

              <div className="flex items-center">
                <label className="w-24 text-black font-medium">Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="flex-1 ml-4 px-3 py-2 border border-blue-600 rounded bg-white text-black disabled:bg-gray-100"
                />
              </div>
            </div>

            {/* Student Illustration */}
            <div className="flex-shrink-0">
              <div className="w-48 h-64 relative">
                {/* Student with graduation cap */}
                <svg
                  className="w-full h-full"
                  viewBox="0 0 200 250"
                  fill="none"
                >
                  {/* Graduation cap */}
                  <ellipse
                    cx="100"
                    cy="40"
                    rx="35"
                    ry="8"
                    fill="#3b82f6"
                    stroke="black"
                    strokeWidth="2"
                  />
                  <rect
                    x="65"
                    y="40"
                    width="70"
                    height="8"
                    fill="#3b82f6"
                    stroke="black"
                    strokeWidth="2"
                  />
                  <rect
                    x="95"
                    y="48"
                    width="10"
                    height="15"
                    fill="#3b82f6"
                    stroke="black"
                    strokeWidth="2"
                  />

                  {/* Face */}
                  <circle
                    cx="100"
                    cy="80"
                    r="20"
                    fill="#fbbf24"
                    stroke="black"
                    strokeWidth="2"
                  />

                  {/* Eyes */}
                  <circle cx="95" cy="75" r="2" fill="black" />
                  <circle cx="105" cy="75" r="2" fill="black" />

                  {/* Smile */}
                  <path
                    d="M 90 85 Q 100 95 110 85"
                    stroke="black"
                    strokeWidth="2"
                    fill="none"
                  />

                  {/* Body */}
                  <rect
                    x="80"
                    y="100"
                    width="40"
                    height="60"
                    fill="#fbbf24"
                    stroke="black"
                    strokeWidth="2"
                  />

                  {/* Arms */}
                  <rect
                    x="70"
                    y="110"
                    width="15"
                    height="40"
                    fill="#fbbf24"
                    stroke="black"
                    strokeWidth="2"
                  />
                  <rect
                    x="115"
                    y="110"
                    width="15"
                    height="40"
                    fill="#fbbf24"
                    stroke="black"
                    strokeWidth="2"
                  />

                  {/* Book */}
                  <rect
                    x="60"
                    y="120"
                    width="25"
                    height="30"
                    fill="white"
                    stroke="black"
                    strokeWidth="2"
                  />
                  <rect x="62" y="122" width="21" height="26" fill="#ef4444" />
                  <line
                    x1="72"
                    y1="122"
                    x2="72"
                    y2="148"
                    stroke="black"
                    strokeWidth="1"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Action Buttons - Bottom Right */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={handleEdit}
              className="px-6 py-2 bg-red-500 text-white rounded-lg font-bold hover:bg-red-600 transition-colors"
            >
              EDIT
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-bold hover:bg-blue-600 transition-colors"
            >
              SAVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import universityIcon from '../assets/images/university.png';
import profileIcon from '../assets/images/Profile.png';
import logoutIcon from '../assets/images/Logout.png';
import studentMaleIcon from '../assets/images/student-male.png';
import { getTypographyClass } from '../utils/typography';

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
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // TME ID validation
    if (!formData.tmeId.trim()) {
      newErrors.tmeId = 'TME ID is required';
    } else if (formData.tmeId.trim().length < 3) {
      newErrors.tmeId = 'TME ID must be at least 3 characters';
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    // Level validation
    if (!formData.level.trim()) {
      newErrors.level = 'Level is required';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
    }

    // Password validation
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);

    // Show toast notification for first error
    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];
      toast.error(firstError);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = () => {
    setErrors({});
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsEditing(false);
      setErrors({});
      // Here you would typically save the data to your backend
      console.log('Saving profile data:', formData);

      // Show success message using toast notification
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      toast.error('Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-2 sm:p-4">
        {/* Profile Card */}
        <div className="bg-amber-50 rounded-2xl shadow-xl border border-amber-200 p-4 sm:p-6 md:p-8 max-w-4xl w-full relative">
          {/* Profile Icon - Top Left */}
          <div className="absolute top-4 left-4 flex flex-col items-center">
            <div className="w-20 h-20 flex items-center justify-center mb-2">
              <img src={profileIcon} alt="Profile" className="w-16 h-16" />
            </div>
            <span className="text-xs text-gray-600">Profile</span>
          </div>

          {/* Logout Icon - Top Right */}
          <button
            onClick={handleLogout}
            className="absolute top-4 right-4 flex flex-col items-center group focus:outline-none"
          >
            <div className="w-20 h-20 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <img src={logoutIcon} alt="Logout" className="w-16 h-16" />
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
            <div className="w-20 h-20 flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
              <img src={universityIcon} alt="Dashboard" className="w-16 h-16" />
            </div>
            <span className="text-xs text-black font-bold group-hover:underline">
              DASHBOARD
            </span>
          </button>

          {/* Title */}
          <h1
            className={`${getTypographyClass('h2')} text-black text-center mb-12 mt-16`}
          >
            My Profile
          </h1>

          {/* Form and Student Illustration */}
          <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 md:gap-8 items-start">
            {/* Form Fields */}
            <div className="flex-1 space-y-4 sm:space-y-6">
              <div className="flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                  <label
                    className={`w-full sm:w-28 text-black ${getTypographyClass('label')}`}
                  >
                    TME ID:
                  </label>
                  <input
                    type="text"
                    name="tmeId"
                    value={formData.tmeId}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`flex-1 sm:ml-4 px-3 sm:px-4 py-2 sm:py-3 border rounded bg-white text-black disabled:bg-gray-100 ${getTypographyClass('input')} ${
                      errors.tmeId ? 'border-red-500' : 'border-blue-600'
                    }`}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                  <label
                    className={`w-full sm:w-28 text-black ${getTypographyClass('label')}`}
                  >
                    Name:
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`flex-1 sm:ml-4 px-3 sm:px-4 py-2 sm:py-3 border rounded bg-white text-black disabled:bg-gray-100 ${getTypographyClass('input')} ${
                      errors.name ? 'border-red-500' : 'border-blue-600'
                    }`}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                  <label className="w-full sm:w-28 text-black font-medium">Level:</label>
                  <input
                    type="text"
                    name="level"
                    value={formData.level}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`flex-1 sm:ml-4 px-3 sm:px-4 py-2 sm:py-3 border rounded bg-white text-black disabled:bg-gray-100 ${
                      errors.level ? 'border-red-500' : 'border-blue-600'
                    }`}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                  <label className="w-full sm:w-28 text-black font-medium">
                    Email Address:
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`flex-1 sm:ml-4 px-3 sm:px-4 py-2 sm:py-3 border rounded bg-white text-black disabled:bg-gray-100 ${
                      errors.email ? 'border-red-500' : 'border-blue-600'
                    }`}
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                  <label className="w-full sm:w-28 text-black font-medium">
                    Password:
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                    className={`flex-1 sm:ml-4 px-3 sm:px-4 py-2 sm:py-3 border rounded bg-white text-black disabled:bg-gray-100 ${
                      errors.password ? 'border-red-500' : 'border-blue-600'
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* Student Illustration */}
            <div className="flex-shrink-0 flex items-center justify-center mt-6 lg:mt-0">
              <div className="w-40 h-52 sm:w-48 sm:h-60 md:w-56 md:h-72 relative">
                <img
                  src={studentMaleIcon}
                  alt="Student"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>

          {/* Action Buttons - Bottom Right */}
          <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-8 sm:mt-12">
            <button
              onClick={handleEdit}
              disabled={isSubmitting}
              className={`px-4 sm:px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed ${getTypographyClass('buttonLarge')}`}
            >
              EDIT
            </button>
            <button
              onClick={handleSave}
              disabled={!isEditing || isSubmitting}
              className={`px-4 sm:px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed ${getTypographyClass('buttonLarge')}`}
            >
              {isSubmitting ? 'SAVING...' : 'SAVE'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

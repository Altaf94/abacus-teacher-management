import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import schoolImage from '../../assets/images/university.png';

const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    // Simulate sending reset email
    setIsEmailSent(true);
    // In a real app, you would call your API here
    // await sendResetEmail(email);
  };

  const handleBack = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-yellow-50">
      {/* Main content container */}
      <div className="w-full max-w-4xl bg-amber-50 rounded-2xl border border-blue-200 shadow-xl overflow-hidden relative z-10">
        <div className="flex flex-col lg:flex-row">
          {/* Left Section - School Building Illustration */}
          <div className="lg:w-1/2 bg-amber-50 p-8 flex items-center justify-center border-r border-blue-200">
            <div className="text-center">
              <img
                src={schoolImage}
                alt="School Building"
                className="w-64 h-64 object-contain mx-auto"
              />
            </div>
          </div>

          {/* Right Section - Forget Password Form */}
          <div className="lg:w-1/2 bg-amber-50 p-8">
            <div className="max-w-md mx-auto">
              {/* Icon with person and question mark */}
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                    <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-blue-300 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-lg">👤</span>
                      </div>
                    </div>
                  </div>
                  {/* Question mark bubble */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">?</span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl font-bold text-black mb-4 text-center">
                Forget password
              </h1>

              {/* Instruction */}
              <p className="text-black text-center mb-6">
                Please enter your registered email Address
              </p>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Input */}
                <div>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-blue-300 rounded-md bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="yourname@example.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Success Message */}
                {isEmailSent && (
                  <div className="text-red-600 text-center font-semibold">
                    The reset password email has been sent to your email address
                  </div>
                )}

                {/* Buttons */}
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200 uppercase tracking-wide"
                  >
                    BACK
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-4 rounded-md transition-colors duration-200 uppercase tracking-wide"
                  >
                    SEND
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;

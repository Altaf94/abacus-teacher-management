import React, { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import WorksheetsImage from '../assets/images/Worksheets.png';
import StudentImage from '../assets/images/student-male.png';
import UniversityImage from '../assets/images/university.png';
import LogoutImage from '../assets/images/Logout.png';

const WorksheetAssign = () => {
  const navigate = useNavigate();
  const { state } = useLocation();

  const planItems = state?.planItems ?? [];

  const totalQuestions = useMemo(
    () => planItems.reduce((sum, item) => sum + item.count, 0),
    [planItems]
  );

  const [title, setTitle] = useState('');
  const [mode, setMode] = useState('individual'); // 'individual' | 'class' | 'save'
  const [classLevel, setClassLevel] = useState('ABACUS LEVEL 1A');
  const [studentName, setStudentName] = useState('AMIR ALI PADANIYA');

  const handleLogout = () => navigate('/login');
  const handleDashboard = () => navigate('/dashboard');

  const handleConfirm = () => {
    const summary = `Worksheet: ${title || 'Untitled'} • ${totalQuestions} questions • ${planItems.length} concept(s)`;
    toast.success(`Notification sent. ${summary}`);
    navigate('/notification-sent');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-yellow-200/60" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8">
        <div className="bg-[#faf9ed] rounded-3xl shadow-lg w-[95vw] max-w-[1600px] min-h-[88vh] p-6 md:p-10 flex flex-col relative overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="w-16 md:w-24" />
            <h1
              className="text-2xl md:text-4xl font-extrabold tracking-wide text-center"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              WORKSHEETS GENERATOR
            </h1>
            <button
              onClick={handleLogout}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={LogoutImage}
                alt="Logout"
                className="w-10 h-10 md:w-16 md:h-16"
              />
              <span className="text-xs md:text-sm mt-1">Logout</span>
            </button>
          </div>

          {/* Title input */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="text-base md:text-lg font-semibold">
              Title of Worksheet:
            </div>
            <input
              type="text"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Your title here"
              className="w-[220px] md:w-[360px] h-10 border-2 border-gray-300 rounded-md px-3 bg-white text-sm md:text-base"
            />
          </div>

          {/* Assign panels */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-[1fr_120px_1fr] items-start gap-6 md:gap-10">
            {/* Individual */}
            <div className="flex flex-col items-center">
              <div className="text-base md:text-lg font-semibold mb-2 text-center">
                Assign task to individual
              </div>
              <button
                onClick={() => setMode('individual')}
                className={`p-3 rounded-2xl border-2 ${
                  mode === 'individual'
                    ? 'border-blue-600'
                    : 'border-transparent'
                } hover:border-blue-600 transition-colors`}
              >
                <img
                  src={StudentImage}
                  alt="Student"
                  className="w-36 h-36 md:w-56 md:h-56"
                />
              </button>
              <div className="mt-3">
                <select
                  value={studentName}
                  onChange={e => setStudentName(e.target.value)}
                  className="w-[220px] md:w-[300px] h-10 border-2 border-gray-300 rounded-md px-3 bg-white text-sm md:text-base font-semibold"
                >
                  <option>AMIR ALI PADANIYA</option>
                  <option>JIA SHAH</option>
                  <option>RAYAN KHAN</option>
                  <option>SANA PATEL</option>
                  <option>ADAM JOSEPH</option>
                </select>
              </div>
            </div>

            {/* OR */}
            <div className="hidden md:flex items-center justify-center">
              <div className="text-3xl md:text-5xl font-extrabold">OR</div>
            </div>

            {/* Class */}
            <div className="flex flex-col items-center">
              <div className="text-base md:text-lg font-semibold mb-2 text-center">
                Assign task to class
              </div>
              <button
                onClick={() => setMode('class')}
                className={`p-3 rounded-2xl border-2 ${
                  mode === 'class' ? 'border-blue-600' : 'border-transparent'
                } hover:border-blue-600 transition-colors`}
              >
                <img
                  src={UniversityImage}
                  alt="Class"
                  className="w-36 h-36 md:w-56 md:h-56"
                />
              </button>
              <div className="mt-4">
                <select
                  value={classLevel}
                  onChange={e => setClassLevel(e.target.value)}
                  className="w-[220px] md:w-[300px] h-10 border-2 border-gray-300 rounded-md px-3 bg-white text-sm md:text-base font-semibold"
                >
                  <option>ABACUS LEVEL 1A</option>
                  <option>ABACUS LEVEL 1B</option>
                  <option>ABACUS LEVEL 2A</option>
                  <option>ABACUS LEVEL 2B</option>
                </select>
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="absolute left-4 md:left-8 bottom-4 flex items-center gap-8">
            <button
              onClick={handleDashboard}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={UniversityImage}
                alt="Dashboard"
                className="w-14 h-14 md:w-20 md:h-20"
              />
              <span className="text-xs md:text-sm font-semibold mt-1">
                DASHBOARD
              </span>
            </button>
          </div>

          <div className="absolute right-4 md:right-8 bottom-4">
            <button
              onClick={handleConfirm}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={StudentImage}
                alt="Confirm"
                className="w-14 h-14 md:w-20 md:h-20"
              />
              <span className="text-xs md:text-sm font-semibold mt-1">
                CONFIRM
              </span>
            </button>
            <div className="text-xs md:text-sm text-gray-600 mt-2 text-center">
              Total questions: {totalQuestions}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorksheetAssign;

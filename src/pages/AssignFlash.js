import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import logoutIcon from '../assets/images/Logout.png';
import universityIcon from '../assets/images/university.png';
import studentIcon from '../assets/images/student-male.png';
import teachingIcon from '../assets/images/teaching.png';

export default function AssignFlash() {
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [assignMode, setAssignMode] = useState('individual'); // 'individual' | 'class'
  const [selectedClass, setSelectedClass] = useState('ABACUS LEVEL 1A');

  const classes = useMemo(
    () => [
      'ABACUS LEVEL 1A',
      'ABACUS LEVEL 1B',
      'ABACUS LEVEL 2A',
      'ABACUS LEVEL 2B',
    ],
    []
  );

  const handleSubmit = () => {
    try {
      const generatorPlan = window.sessionStorage.getItem('flashGeneratorPlan');
      const payload = {
        plan: generatorPlan ? JSON.parse(generatorPlan) : null,
        title: title || 'Untitled Activity',
        assignMode,
        className: assignMode === 'class' ? selectedClass : null,
        createdAt: Date.now(),
      };
      window.sessionStorage.setItem('flashAssignment', JSON.stringify(payload));
    } catch (_) {}
    // Navigate to confirmation screen
    navigate('/notification-sent');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-yellow-200/60" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8">
        <div className="bg-[#faf9ed] rounded-3xl shadow-lg w-[95vw] max-w-[1600px] min-h-[88vh] p-6 md:p-10 flex flex-col relative">
          {/* Header */}
          <div className="flex items-start justify-between mb-8">
            <div className="w-16 md:w-24" />
            <h1
              className="text-2xl md:text-4xl font-extrabold tracking-wide text-center"
              style={{ fontFamily: 'Poppins, sans-serif' }}
            >
              FLASH NUMBER GENERATOR
            </h1>
            <button
              onClick={() => navigate('/login')}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={logoutIcon}
                alt="Logout"
                className="w-10 h-10 md:w-16 md:h-16"
              />
              <span className="text-xs md:text-sm mt-1">Logout</span>
            </button>
          </div>

          {/* Title input */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="text-base md:text-lg font-semibold">
              Title of Activity:
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
              <div className="text-base md:text-lg font-semibold mb-2">
                Assign task to individual
              </div>
              <button
                onClick={() => setAssignMode('individual')}
                className={`p-3 rounded-2xl border-2 ${
                  assignMode === 'individual'
                    ? 'border-blue-600'
                    : 'border-transparent'
                } hover:border-blue-600 transition-colors`}
              >
                <img
                  src={studentIcon}
                  alt="Student"
                  className="w-36 h-36 md:w-56 md:h-56"
                />
              </button>
              <div className="mt-3 text-sm md:text-lg font-bold tracking-wide text-gray-800">
                AMIR ALI PADANIYA
              </div>
            </div>

            {/* OR */}
            <div className="hidden md:flex items-center justify-center">
              <div className="text-3xl md:text-5xl font-extrabold">OR</div>
            </div>

            {/* Class */}
            <div className="flex flex-col items-center">
              <div className="text-base md:text-lg font-semibold mb-2">
                Assign task to class
              </div>
              <button
                onClick={() => setAssignMode('class')}
                className={`p-3 rounded-2xl border-2 ${
                  assignMode === 'class'
                    ? 'border-blue-600'
                    : 'border-transparent'
                } hover:border-blue-600 transition-colors`}
              >
                <img
                  src={teachingIcon}
                  alt="Class"
                  className="w-36 h-36 md:w-56 md:h-56"
                />
              </button>
              <div className="mt-4">
                <select
                  value={selectedClass}
                  onChange={e => setSelectedClass(e.target.value)}
                  className="w-[220px] md:w-[300px] h-10 border-2 border-gray-300 rounded-md px-3 bg-white text-sm md:text-base font-semibold"
                >
                  {classes.map(c => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Footer actions */}
          <div className="absolute left-4 md:left-8 bottom-4 flex items-center gap-8">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={universityIcon}
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
              onClick={handleSubmit}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={studentIcon}
                alt="Submit"
                className="w-14 h-14 md:w-20 md:h-20"
              />
              <span className="text-xs md:text-sm font-semibold mt-1">
                SUBMIT
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

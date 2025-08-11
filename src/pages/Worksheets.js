import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import worksheetsIcon from '../assets/images/Worksheets.png';
import universityIcon from '../assets/images/university.png';
import logoutIcon from '../assets/images/Logout.png';

const CONCEPT_OPTIONS = [
  { id: 'junior_plus_4', label: 'Junior +4' },
  { id: 'senior_plus_4', label: 'Senior +4' },
  { id: 'senior_minus_4', label: 'Senior -4' },
  { id: 'multiplication', label: 'Multiplication' },
];

const Worksheets = () => {
  const navigate = useNavigate();

  const [selectedConceptId, setSelectedConceptId] = useState(
    CONCEPT_OPTIONS[0].id
  );
  const [questionLength, setQuestionLength] = useState(6);
  const [questionCount, setQuestionCount] = useState(10);
  const [planItems, setPlanItems] = useState([]);

  const selectedConcept = useMemo(
    () => CONCEPT_OPTIONS.find(c => c.id === selectedConceptId),
    [selectedConceptId]
  );

  const totalQuestions = useMemo(
    () => planItems.reduce((sum, item) => sum + item.count, 0),
    [planItems]
  );

  const handleLogout = () => {
    navigate('/login');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const addItemToPlan = () => {
    setPlanItems(prev => [
      ...prev,
      {
        id: `${selectedConceptId}-${Date.now()}`,
        conceptId: selectedConceptId,
        conceptLabel: selectedConcept?.label ?? 'Concept',
        length: questionLength,
        count: questionCount,
      },
    ]);
  };

  const removeItem = id => {
    setPlanItems(prev => prev.filter(item => item.id !== id));
  };

  const handleGenerate = () => {
    if (planItems.length === 0) {
      toast.error('Please add at least one concept to generate a worksheet.');
      return;
    }
    navigate('/worksheets/assign', { state: { planItems } });
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-yellow-50">
      <div
        className="relative w-full max-w-6xl mx-auto bg-[#faf9ed] rounded-3xl shadow-2xl border border-yellow-300 p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col"
        style={{ minHeight: '80vh' }}
      >
        {/* Header */}
        <div className="w-full flex items-center justify-between mb-6">
          <div className="flex items-center">
            <img
              src={worksheetsIcon}
              alt="Worksheets"
              className="w-14 h-14 sm:w-20 sm:h-20 md:w-28 md:h-28 mr-3"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold font-serif text-black text-center">
            WORKSHEETS GENERATOR
          </h1>
          <button
            onClick={handleLogout}
            className="flex flex-col items-center group focus:outline-none"
          >
            <img
              src={logoutIcon}
              alt="Logout"
              className="w-8 h-8 sm:w-12 sm:h-12 mb-1"
            />
            <span className="text-black text-sm sm:text-lg font-serif group-hover:underline">
              Logout
            </span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left controls */}
          <div className="space-y-8">
            {/* Concept */}
            <div className="flex items-center gap-6">
              <div className="w-56 text-right text-lg md:text-xl font-serif">
                Concept:
              </div>
              <div className="flex-1 max-w-md">
                <select
                  value={selectedConceptId}
                  onChange={e => setSelectedConceptId(e.target.value)}
                  className="w-full max-w-sm bg-white border border-blue-200 rounded-xl px-4 py-2 text-base md:text-lg shadow-sm focus:ring-2 focus:ring-blue-400"
                >
                  {CONCEPT_OPTIONS.map(opt => (
                    <option key={opt.id} value={opt.id}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Length of Question */}
            <div className="flex items-center gap-6">
              <div className="w-56 text-right text-lg md:text-xl font-serif">
                Length of Question:
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setQuestionLength(prev => clamp(prev - 1, 1, 20))
                  }
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-blue-200 text-black text-2xl leading-none shadow active:scale-95"
                  aria-label="decrease length"
                >
                  −
                </button>
                <div className="w-20 md:w-24 text-center bg-white border border-gray-200 rounded-xl py-2 text-lg md:text-xl font-semibold shadow">
                  {questionLength}
                </div>
                <button
                  onClick={() =>
                    setQuestionLength(prev => clamp(prev + 1, 1, 20))
                  }
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-blue-200 text-black text-2xl leading-none shadow active:scale-95"
                  aria-label="increase length"
                >
                  +
                </button>
              </div>
            </div>

            {/* Number of Questions */}
            <div className="flex items-center gap-6">
              <div className="w-56 text-right text-lg md:text-xl font-serif">
                Numbers of Questions:
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() =>
                    setQuestionCount(prev => clamp(prev - 1, 1, 100))
                  }
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-blue-200 text-black text-2xl leading-none shadow active:scale-95"
                  aria-label="decrease count"
                >
                  −
                </button>
                <div className="w-20 md:w-24 text-center bg-white border border-gray-200 rounded-xl py-2 text-lg md:text-xl font-semibold shadow">
                  {questionCount}
                </div>
                <button
                  onClick={() =>
                    setQuestionCount(prev => clamp(prev + 1, 1, 100))
                  }
                  className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-blue-200 text-black text-2xl leading-none shadow active:scale-95"
                  aria-label="increase count"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add button */}
            <div className="pl-56">
              <button
                onClick={addItemToPlan}
                className="inline-flex items-center gap-3 bg-white border border-blue-300 rounded-2xl px-6 py-3 shadow hover:shadow-md active:scale-95"
              >
                <span className="text-lg font-semibold font-serif">ADD</span>
              </button>
            </div>
          </div>

          {/* Right panel - plan list */}
          <div className="">
            <div className="bg-white/80 rounded-2xl border border-blue-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-blue-200 flex items-center justify-between">
                <div className="text-xl font-extrabold font-serif">CONCEPT</div>
                <div className="text-xl font-extrabold font-serif">
                  Questions
                </div>
              </div>
              <div className="divide-y divide-blue-100 max-h-64 overflow-auto">
                {planItems.length === 0 && (
                  <div className="px-6 py-6 text-gray-500 italic">
                    No items added yet
                  </div>
                )}
                {planItems.map(item => (
                  <div
                    key={item.id}
                    className="px-6 py-4 flex items-center justify-between"
                  >
                    <div className="text-base md:text-lg font-serif">
                      {item.conceptLabel}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-base md:text-lg font-semibold">
                        {item.count}
                      </span>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="w-8 h-8 rounded-md bg-blue-300/60 hover:bg-blue-300 active:scale-95"
                        aria-label="remove"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total and Generate */}
            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex-1 bg-yellow-400 text-black rounded-xl shadow px-6 py-3 font-serif font-extrabold text-lg flex items-center justify-between">
                <span>Total Questions</span>
                <span>{totalQuestions}</span>
              </div>
              <div className="flex flex-col items-center">
                <button
                  onClick={handleGenerate}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-5 py-3 shadow font-semibold active:scale-95"
                >
                  Generate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="w-full flex justify-start items-center mt-8">
          <button
            onClick={handleDashboard}
            className="flex flex-col items-center group focus:outline-none"
          >
            <img
              src={universityIcon}
              alt="Dashboard"
              className="w-8 h-8 sm:w-12 sm:h-12 mb-1"
            />
            <span className="text-black text-sm sm:text-lg font-serif group-hover:underline">
              DASHBOARD
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Worksheets;

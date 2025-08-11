import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import flashNumberIcon from '../assets/images/Flashnumber.png';
import logoutIcon from '../assets/images/Logout.png';
import universityIcon from '../assets/images/university.png';
import studentIcon from '../assets/images/student-male.png';

function Stepper({
  value,
  onChange,
  step = 1,
  min = -Infinity,
  max = Infinity,
  formatValue,
}) {
  const display = useMemo(() => {
    const v = typeof value === 'number' ? value : 0;
    return typeof formatValue === 'function' ? formatValue(v) : v;
  }, [value, formatValue]);

  const dec = () =>
    onChange(Math.max(min, parseFloat((value - step).toFixed(2))));
  const inc = () =>
    onChange(Math.min(max, parseFloat((value + step).toFixed(2))));

  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        onClick={dec}
        className="w-12 h-12 md:w-16 md:h-12 bg-blue-600 hover:bg-blue-700 text-white text-xl md:text-2xl rounded-md"
        aria-label="decrease"
      >
        -
      </button>
      <div className="min-w-[80px] md:min-w-[100px] h-12 border-2 border-gray-300 rounded-md flex items-center justify-center text-xl md:text-2xl bg-white">
        {display}
      </div>
      <button
        type="button"
        onClick={inc}
        className="w-12 h-12 md:w-16 md:h-12 bg-blue-600 hover:bg-blue-700 text-white text-xl md:text-2xl rounded-md"
        aria-label="increase"
      >
        +
      </button>
    </div>
  );
}

export default function FlashNumberGame() {
  const navigate = useNavigate();

  const concepts = ['Junior +4', 'Senior +4', 'Senior -4', 'Multiplication'];

  const [selectedConcept, setSelectedConcept] = useState(concepts[0]);
  const [questionLength, setQuestionLength] = useState(6);
  const [numQuestions, setNumQuestions] = useState(10);
  const [speedSeconds, setSpeedSeconds] = useState(1.2);

  const [items, setItems] = useState([
    { id: 1, concept: 'Junior +4', questions: 5, time: 2.1 },
    { id: 2, concept: 'Senior +4', questions: 3, time: 0.8 },
    { id: 3, concept: 'Senior +4', questions: 13, time: 1.2 },
    { id: 4, concept: 'Multiplication', questions: 10, time: 5 },
  ]);

  const totalQuestions = useMemo(
    () => items.reduce((sum, r) => sum + (Number(r.questions) || 0), 0),
    [items]
  );

  const addItem = () => {
    setItems(prev => [
      ...prev,
      {
        id: prev.length ? prev[prev.length - 1].id + 1 : 1,
        concept: selectedConcept,
        questions: numQuestions,
        time: speedSeconds,
        length: questionLength,
      },
    ]);
  };

  const removeItem = id => {
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const assign = () => {
    // Store current plan for potential later use
    try {
      const payload = { items, createdAt: Date.now() };
      window.sessionStorage.setItem(
        'flashGeneratorPlan',
        JSON.stringify(payload)
      );
    } catch (_) {}
    navigate('/assign');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* background */}
      <div className="absolute inset-0 bg-yellow-200/60" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 md:p-8">
        <div className="bg-[#faf9ed] rounded-3xl shadow-lg w-[95vw] max-w-[1600px] min-h-[88vh] p-6 md:p-10 flex flex-col relative">
          {/* header */}
          <div className="flex items-start justify-between mb-6 md:mb-8">
            <img
              src={flashNumberIcon}
              alt="Flash"
              className="w-16 h-16 md:w-24 md:h-24"
            />
            <h1
              className="text-2xl md:text-4xl font-extrabold tracking-wide"
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
              <span className="text-sm md:text-base mt-1">Logout</span>
            </button>
          </div>

          {/* content */}
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* left controls */}
            <div className="flex flex-col gap-8 px-2 md:px-6">
              {/* Concept row */}
              <div className="grid grid-cols-[260px_1fr_60px] items-center gap-4">
                <div className="text-lg md:text-xl font-semibold text-gray-900">
                  Concept:
                </div>
                <div className="flex items-center">
                  <select
                    value={selectedConcept}
                    onChange={e => setSelectedConcept(e.target.value)}
                    className="w-full md:w-96 h-12 border-2 border-gray-300 rounded-md px-4 text-base md:text-lg font-semibold bg-white"
                  >
                    {concepts.map(c => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div />
              </div>

              {/* Length of Question */}
              <div className="grid grid-cols-[260px_1fr] items-center gap-4">
                <div className="text-lg md:text-xl font-semibold text-gray-900">
                  Length of Question:
                </div>
                <Stepper
                  value={questionLength}
                  onChange={setQuestionLength}
                  min={1}
                  max={20}
                  step={1}
                />
              </div>

              {/* Numbers of Questions */}
              <div className="grid grid-cols-[260px_1fr] items-center gap-4">
                <div className="text-lg md:text-xl font-semibold text-gray-900">
                  Numbers of Questions:
                </div>
                <Stepper
                  value={numQuestions}
                  onChange={setNumQuestions}
                  min={1}
                  max={200}
                  step={1}
                />
              </div>

              {/* Speed */}
              <div className="grid grid-cols-[260px_1fr] items-center gap-4">
                <div className="flex items-end gap-3">
                  <div className="text-lg md:text-xl font-semibold text-gray-900">
                    Set the speed:
                  </div>
                  <div className="italic text-gray-600">(in Seconds)</div>
                </div>
                <Stepper
                  value={speedSeconds}
                  onChange={setSpeedSeconds}
                  min={0.1}
                  max={10}
                  step={0.1}
                  formatValue={v => `${v.toFixed(1)}s`}
                />
              </div>

              {/* Add button */}
              <div className="pt-2 flex justify-center">
                <button
                  onClick={addItem}
                  className="w-32 h-24 md:w-36 md:h-28 rounded-xl border-4 border-blue-500 bg-white shadow hover:shadow-md flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-3xl">✍️</span>
                  <span className="font-bold text-base">ADD</span>
                </button>
              </div>
            </div>

            {/* right list */}
            <div className="bg-white/70 border border-blue-300 rounded-2xl p-3 md:p-4 flex flex-col max-w-[520px] w-full">
              <div className="grid grid-cols-[1fr_90px_70px_44px] text-sm md:text-base font-semibold px-2 pb-1 border-b border-blue-200 text-gray-900">
                <div>CONCEPT</div>
                <div className="text-center">Questions</div>
                <div className="text-center">Time</div>
                <div className="text-center"></div>
              </div>
              <div className="flex-1 divide-y divide-gray-200">
                {items.map(row => (
                  <div
                    key={row.id}
                    className="grid grid-cols-[1fr_90px_70px_44px] items-center px-2 py-2 text-xs md:text-sm"
                  >
                    <div className="truncate">{row.concept}</div>
                    <div className="text-center">{row.questions}</div>
                    <div className="text-center">
                      {Number(row.time).toString()}s
                    </div>
                    <div className="flex justify-center">
                      <button
                        onClick={() => removeItem(row.id)}
                        className="w-7 h-7 rounded-md bg-blue-400 hover:bg-blue-500"
                        aria-label={`remove ${row.concept}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4">
                <div className="bg-yellow-500 rounded-lg px-3 md:px-4 py-2 flex items-center justify-between text-black font-bold text-base md:text-lg border border-yellow-600">
                  <span>Total Questions</span>
                  <span>{totalQuestions}</span>
                </div>
              </div>
            </div>
          </div>

          {/* footer actions */}
          <div className="absolute left-4 md:left-8 bottom-4 flex flex-col items-center">
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

          <div className="absolute right-4 md:right-8 bottom-4 flex flex-col items-center">
            <button
              onClick={assign}
              className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src={studentIcon}
                alt="Assign"
                className="w-14 h-14 md:w-20 md:h-20"
              />
              <span className="text-xs md:text-sm font-semibold mt-1">
                Assign
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

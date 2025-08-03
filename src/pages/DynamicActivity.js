import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ACTIVITY_STATES, getActivityConfig } from '../utils/activityConfig';
import universityIcon from '../assets/images/university.png';
import flashIcon from '../assets/images/Flashnumber.png';
import logoutIcon from '../assets/images/Logout.png';

export default function DynamicActivity() {
  const navigate = useNavigate();
  const { activityId } = useParams();

  // Debug log to verify component is loading
  console.log('DynamicActivity component loaded with activityId:', activityId);

  const [currentState, setCurrentState] = useState(ACTIVITY_STATES.READY);
  const [countdown, setCountdown] = useState(3);
  const [score, setScore] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [activityConfig, setActivityConfig] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);

  // New flash game states
  const [isFlashMode, setIsFlashMode] = useState(false);
  const [numberSequence, setNumberSequence] = useState([]);
  const [currentNumberIndex, setCurrentNumberIndex] = useState(0);
  const [correctSum, setCorrectSum] = useState(0);
  const [totalNumbers, setTotalNumbers] = useState(10);
  const [numberDisplayTime, setNumberDisplayTime] = useState(800);

  // Initialize activity configuration
  useEffect(() => {
    if (activityId) {
      const config = getActivityConfig(activityId);
      setActivityConfig(config);

      // Only activity ID 1 uses flash game mode
      const isFlashActivity = parseInt(activityId) === 1;
      setIsFlashMode(isFlashActivity);
      if (isFlashActivity) {
        setTotalNumbers(10); // Show 10 numbers
        setNumberDisplayTime(800); // 0.8 seconds per number
      }
    }
  }, [activityId, navigate]);

  const generateNumberSequence = useCallback(() => {
    const sequence = [];
    let sum = 0;

    for (let i = 0; i < totalNumbers; i++) {
      // Generate numbers from 1 to 9 for easier mental math
      const number = Math.floor(Math.random() * 9) + 1;
      sequence.push(number);
      sum += number;
    }

    return { sequence, sum };
  }, [totalNumbers]);

  const startFlashSequence = useCallback(() => {
    const { sequence, sum } = generateNumberSequence();
    setNumberSequence(sequence);
    setCorrectSum(sum);
    setCurrentNumberIndex(0);
    setTimeLeft(numberDisplayTime);
    setCurrentState(ACTIVITY_STATES.GAME);
  }, [generateNumberSequence, numberDisplayTime]);

  const startGame = useCallback(() => {
    if (!activityConfig) return;

    const question = activityConfig.generateQuestion();
    setCurrentQuestion(question);
    setTimeLeft(activityConfig.timeLimit);
    setQuestionNumber(questionNumber + 1);
  }, [activityConfig, questionNumber]);

  // Handle countdown
  useEffect(() => {
    if (currentState === ACTIVITY_STATES.COUNTDOWN && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (currentState === ACTIVITY_STATES.COUNTDOWN && countdown === 0) {
      if (isFlashMode) {
        startFlashSequence();
      } else {
        setCurrentState(ACTIVITY_STATES.GAME);
        startGame();
      }
    }
  }, [currentState, countdown, isFlashMode, startFlashSequence, startGame]);

  // Handle flash sequence timer
  useEffect(() => {
    if (currentState === ACTIVITY_STATES.GAME && isFlashMode && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 100);
      }, 100);
      return () => clearTimeout(timer);
    } else if (
      currentState === ACTIVITY_STATES.GAME &&
      isFlashMode &&
      timeLeft <= 0
    ) {
      // Move to next number or end flashing
      if (currentNumberIndex < totalNumbers - 1) {
        // Brief pause between numbers
        setTimeout(() => {
          setCurrentNumberIndex(currentNumberIndex + 1);
          setTimeLeft(numberDisplayTime);
        }, 100);
      } else {
        // End of flash sequence
        setTimeout(() => {
          setCurrentState(ACTIVITY_STATES.INPUT);
        }, 500);
      }
    }
  }, [
    currentState,
    timeLeft,
    isFlashMode,
    currentNumberIndex,
    totalNumbers,
    numberDisplayTime,
  ]);

  // Handle regular game timer (for non-flash mode)
  useEffect(() => {
    if (currentState === ACTIVITY_STATES.GAME && !isFlashMode && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 100);
      }, 100);
      return () => clearTimeout(timer);
    } else if (
      currentState === ACTIVITY_STATES.GAME &&
      !isFlashMode &&
      timeLeft <= 0
    ) {
      // Time's up, move to input state
      setCurrentState(ACTIVITY_STATES.INPUT);
    }
  }, [currentState, timeLeft, isFlashMode]);

  const startActivity = () => {
    setCurrentState(ACTIVITY_STATES.COUNTDOWN);
    setCountdown(3);
    setScore(0);
    setQuestionNumber(0);
    setUserAnswer('');
  };

  const handleAnswerSubmit = e => {
    if (e.key === 'Enter' && userAnswer.trim()) {
      if (isFlashMode) {
        // Flash game mode - check sum
        const userSum = parseInt(userAnswer.trim());
        const isCorrect = userSum === correctSum;
        setScore(isCorrect ? 1 : 0);
        setCurrentState(ACTIVITY_STATES.GAME_OVER);
        setTimeout(() => {
          setCurrentState(ACTIVITY_STATES.CONGRATULATIONS);
        }, 2000);
      } else {
        // Regular mode - check individual question
        const isCorrect = activityConfig.validateAnswer(
          userAnswer,
          currentQuestion.answer
        );

        if (isCorrect) {
          setScore(score + 1);
        }

        // Move to next question or end game
        if (score + 1 >= activityConfig.maxScore) {
          setCurrentState(ACTIVITY_STATES.GAME_OVER);
          setTimeout(() => {
            setCurrentState(ACTIVITY_STATES.CONGRATULATIONS);
          }, 2000);
        } else {
          setUserAnswer('');
          setCurrentState(ACTIVITY_STATES.GAME);
          setTimeout(() => {
            startGame();
          }, 500);
        }
      }
    }
  };

  const handleStartAgain = () => {
    setScore(0);
    setQuestionNumber(0);
    setCurrentState(ACTIVITY_STATES.READY);
    setUserAnswer('');
  };

  const handleReview = () => {
    // Navigate to review page
    navigate('/dashboard');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  // Render different states
  const renderContent = () => {
    if (!activityConfig) return null;

    switch (currentState) {
      case ACTIVITY_STATES.READY:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="mb-8">
              <img
                src={flashIcon}
                alt="Flash Game"
                className="w-48 h-48 drop-shadow-sm"
              />
            </div>
            <button
              onClick={startActivity}
              className="text-6xl font-bold text-red-600 hover:text-red-700 transition-colors"
            >
              Ready
            </button>
          </div>
        );

      case ACTIVITY_STATES.COUNTDOWN:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="mb-8">
              <img
                src={flashIcon}
                alt="Flash Game"
                className="w-48 h-48 drop-shadow-sm"
              />
            </div>
            <div className="text-8xl font-bold text-red-600 mb-4">
              {countdown}
            </div>
            <div className="w-32 h-4 bg-gray-200 rounded-full">
              <div
                className="h-full bg-red-500 rounded-full transition-all duration-1000"
                style={{ width: `${((3 - countdown) / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        );

      case ACTIVITY_STATES.GAME:
        if (isFlashMode) {
          return (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-8xl font-bold text-red-600 mb-8">
                {numberSequence[currentNumberIndex]}
              </div>
            </div>
          );
        } else {
          return (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-8xl font-bold text-red-600 mb-8">
                {currentQuestion?.question}
              </div>
              <div className="w-32 h-4 bg-gray-200 rounded-full mb-4">
                <div
                  className="h-full bg-red-500 rounded-full transition-all duration-100"
                  style={{
                    width: `${(timeLeft / activityConfig.timeLimit) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="text-lg text-gray-600">
                Question {questionNumber} of {activityConfig.maxScore}
              </div>
            </div>
          );
        }

      case ACTIVITY_STATES.INPUT:
        if (isFlashMode) {
          return (
            <div className="flex items-center justify-center h-full relative">
              {/* Dashboard button - top left */}
              <button
                onClick={handleDashboard}
                className="absolute top-4 left-4 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="flex flex-col items-center p-2 rounded-lg bg-white border border-blue-200 shadow-sm">
                  <img
                    src={universityIcon}
                    alt="Dashboard"
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 drop-shadow-sm"
                  />
                  <span className="text-sm font-bold">DASHBOARD</span>
                </div>
              </button>

              {/* Center content */}
              <div className="flex flex-col items-center">
                <input
                  type="number"
                  value={userAnswer}
                  onChange={e => setUserAnswer(e.target.value)}
                  onKeyPress={handleAnswerSubmit}
                  placeholder="Enter the sum"
                  className="w-64 h-20 text-center text-4xl font-bold border-4 border-blue-500 rounded-lg focus:outline-none focus:border-blue-700 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  autoFocus
                />
                <p className="text-lg text-gray-600 mt-4 italic">
                  Press "ENTER" to submit
                </p>
              </div>

              {/* Logout button - top right */}
              <button
                onClick={handleLogout}
                className="absolute top-4 right-4 flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
              >
                <div className="flex flex-col items-center p-2 rounded-lg bg-white border border-blue-200 shadow-sm">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-white rounded-lg flex items-center justify-center">
                      <div className="w-4 h-4 sm:w-8 sm:h-8 md:w-12 md:h-12 bg-blue-400 rounded-lg flex items-center justify-center">
                        <div className="w-2 h-2 sm:w-4 sm:h-4 md:w-6 md:h-6 bg-white rounded-sm transform rotate-45"></div>
                      </div>
                    </div>
                  </div>
                  <span className="text-sm text-gray-600">Logout</span>
                </div>
              </button>
            </div>
          );
        } else {
          return (
            <div className="flex flex-col items-center justify-center h-full">
              <input
                type="text"
                value={userAnswer}
                onChange={e => setUserAnswer(e.target.value)}
                onKeyPress={handleAnswerSubmit}
                placeholder="YOUR ANSWER HERE"
                className="w-96 h-16 text-center text-2xl font-bold border-2 border-blue-500 rounded-lg focus:outline-none focus:border-blue-700"
                autoFocus
              />
              <p className="text-lg text-gray-600 mt-4 italic">
                Press "ENTER" to continue
              </p>
            </div>
          );
        }

      case ACTIVITY_STATES.GAME_OVER:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-4xl font-bold mb-8">Game Over</h2>
            <div className="mb-8">
              <div className="w-24 h-32 bg-blue-500 rounded-lg flex items-center justify-center relative">
                <div className="w-16 h-20 bg-yellow-400 rounded-lg flex items-center justify-center">
                  <div className="w-8 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-6 bg-yellow-300 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xl text-gray-600 italic">Wait for Scores...</p>
          </div>
        );

      case ACTIVITY_STATES.CONGRATULATIONS:
        return (
          <div className="flex flex-col items-center justify-center h-full">
            <h2 className="text-4xl font-bold mb-8">Congratulation</h2>
            <div className="mb-8">
              <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center relative">
                <div className="w-24 h-24 bg-yellow-300 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-2xl">★</span>
                  </div>
                </div>
                <div className="absolute -top-2 -left-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-yellow-400 text-sm">✨</span>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center">
                  <span className="text-yellow-400 text-sm">✨</span>
                </div>
              </div>
            </div>

            {isFlashMode ? (
              // Flash game results
              score === 1 ? (
                <div className="text-center">
                  <p className="text-2xl text-green-600 font-bold mb-4">
                    Correct!
                  </p>
                  <p className="text-lg text-gray-600 mb-2">
                    Your Answer: {userAnswer}
                  </p>
                  <p className="text-lg text-gray-600 mb-8">
                    Correct Sum: {correctSum}
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="text-2xl text-red-600 font-bold mb-4">
                    Incorrect
                  </p>
                  <p className="text-lg text-gray-600 mb-2">
                    Your Answer: {userAnswer}
                  </p>
                  <p className="text-lg text-gray-600 mb-8">
                    Correct Sum: {correctSum}
                  </p>
                  <p className="text-lg text-gray-600 mb-8">
                    Numbers shown: {numberSequence.join(' + ')} = {correctSum}
                  </p>
                </div>
              )
            ) : (
              // Regular game results
              <>
                <p className="text-lg text-gray-600 mb-2">Your Scored</p>
                <div className="text-8xl font-bold text-red-600 mb-2">
                  {score}
                </div>
                <p className="text-lg text-gray-600 mb-8">
                  Out of {activityConfig.maxScore}
                </p>
              </>
            )}

            <div className="flex gap-8">
              <button
                onClick={handleStartAgain}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-red-500 rounded-full"></div>
                  </div>
                </div>
                <span className="text-gray-600">Start Again</span>
              </button>

              <button
                onClick={handleReview}
                className="flex flex-col items-center"
              >
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-2">
                  <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center">
                    <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm">E</span>
                    </div>
                  </div>
                </div>
                <span className="text-gray-600">Review</span>
              </button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background with patterns */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-blue-200 opacity-30"></div>
        <div className="absolute top-0 right-0 w-2/3 h-1/3 bg-yellow-200 opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-2/3 bg-blue-200 opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-2/3 h-2/3 bg-yellow-200 opacity-30"></div>
      </div>

      {/* Main content area */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-8">
        <div className="bg-[#faf9ed] rounded-3xl shadow-lg w-full max-w-4xl min-h-[80vh] p-8 flex flex-col relative">
          {/* Header */}
          {currentState === ACTIVITY_STATES.READY && (
            <div className="flex justify-between items-start mb-8">
              <div className="w-20"></div>
              <div className="text-center flex-1">
                <h1 className="text-4xl font-bold">Flash Number Game</h1>
                <h2 className="text-2xl font-bold mt-2">Abacus Addition</h2>
              </div>
              <div className="w-20">
                <button
                  onClick={handleLogout}
                  className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                >
                  <img
                    src={logoutIcon}
                    alt="Logout"
                    className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 drop-shadow-sm mb-2"
                  />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            </div>
          )}

          {/* Main content */}
          <div className="flex-1 flex items-center justify-center">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

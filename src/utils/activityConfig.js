// Activity configuration for different types of activities
export const ACTIVITY_CONFIGS = {
  abacus_addition: {
    name: 'Abacus Addition',
    description: 'Practice addition on abacus',
    maxScore: 20,
    timeLimit: 4000,
    questionTypes: ['addition'],
    generateQuestion: () => {
      // Generate numbers suitable for abacus practice (1-99)
      const a = Math.floor(Math.random() * 50) + 1;
      const b = Math.floor(Math.random() * 50) + 1;
      const answer = a + b;

      return {
        question: `${a} + ${b}`,
        answer: answer.toString(),
        type: 'addition',
      };
    },
    validateAnswer: (userAnswer, correctAnswer) => {
      return userAnswer.trim() === correctAnswer;
    },
  },

  abacus_subtraction: {
    name: 'Abacus Subtraction',
    description: 'Practice subtraction on abacus',
    maxScore: 20,
    timeLimit: 4000,
    questionTypes: ['subtraction'],
    generateQuestion: () => {
      // Generate numbers suitable for abacus practice (1-99)
      const a = Math.floor(Math.random() * 50) + 25; // Ensure a > b
      const b = Math.floor(Math.random() * (a - 1)) + 1;
      const answer = a - b;

      return {
        question: `${a} - ${b}`,
        answer: answer.toString(),
        type: 'subtraction',
      };
    },
    validateAnswer: (userAnswer, correctAnswer) => {
      return userAnswer.trim() === correctAnswer;
    },
  },

  abacus_multiplication: {
    name: 'Abacus Multiplication',
    description: 'Practice multiplication on abacus',
    maxScore: 15,
    timeLimit: 5000,
    questionTypes: ['multiplication'],
    generateQuestion: () => {
      // Generate numbers suitable for abacus practice (1-12 times tables)
      const a = Math.floor(Math.random() * 12) + 1;
      const b = Math.floor(Math.random() * 12) + 1;
      const answer = a * b;

      return {
        question: `${a} × ${b}`,
        answer: answer.toString(),
        type: 'multiplication',
      };
    },
    validateAnswer: (userAnswer, correctAnswer) => {
      return userAnswer.trim() === correctAnswer;
    },
  },

  abacus_large_numbers: {
    name: 'Large Number Recognition',
    description: 'Practice recognizing large numbers on abacus',
    maxScore: 20,
    timeLimit: 3000,
    questionTypes: ['number'],
    generateQuestion: () => {
      // Generate larger numbers for advanced abacus practice
      const numberRanges = [
        { min: 100, max: 999 }, // Hundreds
        { min: 1000, max: 9999 }, // Thousands
        { min: 10000, max: 99999 }, // Ten thousands
      ];

      const rangeIndex = Math.random() < 0.6 ? 0 : Math.random() < 0.8 ? 1 : 2;
      const range = numberRanges[rangeIndex];
      const number =
        Math.floor(Math.random() * (range.max - range.min + 1)) + range.min;

      return {
        question: number.toString(),
        answer: number.toString(),
        type: 'large_number',
      };
    },
    validateAnswer: (userAnswer, correctAnswer) => {
      return userAnswer.trim() === correctAnswer;
    },
  },
};

// Activity state management
export const ACTIVITY_STATES = {
  READY: 'ready',
  COUNTDOWN: 'countdown',
  GAME: 'game',
  INPUT: 'input',
  GAME_OVER: 'game_over',
  CONGRATULATIONS: 'congratulations',
};

// Get activity config by ID
export const getActivityConfig = activityId => {
  const activityTypes = Object.keys(ACTIVITY_CONFIGS);
  const typeIndex = (parseInt(activityId) - 1) % activityTypes.length;
  const activityType = activityTypes[typeIndex];

  console.log('getActivityConfig called with activityId:', activityId);
  console.log('activityType:', activityType);
  console.log('config:', ACTIVITY_CONFIGS[activityType]);

  return {
    ...ACTIVITY_CONFIGS[activityType],
    id: activityId,
    type: activityType,
  };
};

// Activity flow management
export const getNextState = (
  currentState,
  activityConfig,
  score,
  totalQuestions
) => {
  switch (currentState) {
    case ACTIVITY_STATES.READY:
      return ACTIVITY_STATES.COUNTDOWN;
    case ACTIVITY_STATES.COUNTDOWN:
      return ACTIVITY_STATES.GAME;
    case ACTIVITY_STATES.GAME:
      return ACTIVITY_STATES.INPUT;
    case ACTIVITY_STATES.INPUT:
      if (score >= totalQuestions) {
        return ACTIVITY_STATES.GAME_OVER;
      }
      return ACTIVITY_STATES.GAME;
    case ACTIVITY_STATES.GAME_OVER:
      return ACTIVITY_STATES.CONGRATULATIONS;
    default:
      return ACTIVITY_STATES.READY;
  }
};

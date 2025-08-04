// Typography utilities for consistent font usage across the project

export const typography = {
  // Font families
  fontFamily: {
    sans: 'Inter, system-ui, sans-serif',
    serif: 'Georgia, serif',
  },

  // Font weights
  fontWeight: {
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  // Font sizes with consistent line heights
  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }],
  },

  // Typography classes
  classes: {
    // Headings
    h1: 'text-4xl font-semibold tracking-tight',
    h2: 'text-3xl font-semibold tracking-tight',
    h3: 'text-2xl font-semibold tracking-tight',
    h4: 'text-xl font-semibold tracking-tight',
    h5: 'text-lg font-semibold tracking-tight',
    h6: 'text-base font-semibold tracking-tight',

    // Body text
    body: 'text-base font-normal leading-relaxed',
    bodyLarge: 'text-lg font-normal leading-relaxed',
    bodySmall: 'text-sm font-normal leading-relaxed',

    // Captions and labels
    caption: 'text-sm font-normal text-gray-600',
    label: 'text-sm font-medium text-gray-700',

    // Buttons
    button: 'text-sm font-medium',
    buttonLarge: 'text-base font-medium',

    // Input fields
    input: 'text-base font-normal',
    inputSmall: 'text-sm font-normal',

    // Navigation
    nav: 'text-sm font-medium',
    navLarge: 'text-base font-medium',
  },
};

// Utility function to get typography class
export const getTypographyClass = type => {
  return typography.classes[type] || '';
};

// Utility function to combine typography classes
export const combineTypographyClasses = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export default typography;

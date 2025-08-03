import { format, formatDistance, formatRelative, isValid } from 'date-fns';

// Date formatting
export const formatDate = (date, formatString = 'MMM dd, yyyy') => {
  if (!date || !isValid(new Date(date))) return 'Invalid date';
  return format(new Date(date), formatString);
};

export const formatDateTime = (date, formatString = 'MMM dd, yyyy HH:mm') => {
  if (!date || !isValid(new Date(date))) return 'Invalid date';
  return format(new Date(date), formatString);
};

export const formatRelativeTime = date => {
  if (!date || !isValid(new Date(date))) return 'Invalid date';
  return formatDistance(new Date(date), new Date(), { addSuffix: true });
};

export const formatRelativeDate = date => {
  if (!date || !isValid(new Date(date))) return 'Invalid date';
  return formatRelative(new Date(date), new Date());
};

// Number formatting
export const formatNumber = (number, options = {}) => {
  if (number === null || number === undefined) return '0';

  const defaultOptions = {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
    ...options,
  };

  return new Intl.NumberFormat('en-US', defaultOptions).format(number);
};

export const formatCurrency = (amount, currency = 'USD', locale = 'en-US') => {
  if (amount === null || amount === undefined) return '$0.00';

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
  }).format(amount);
};

export const formatPercentage = (value, decimals = 1) => {
  if (value === null || value === undefined) return '0%';

  return `${(value * 100).toFixed(decimals)}%`;
};

// File size formatting
export const formatFileSize = bytes => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

// Phone number formatting
export const formatPhoneNumber = phoneNumber => {
  if (!phoneNumber) return '';

  // Remove all non-digits
  const cleaned = phoneNumber.replace(/\D/g, '');

  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11 && cleaned[0] === '1') {
    return `+1 (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }

  return phoneNumber;
};

// Text formatting
export const capitalize = str => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const capitalizeWords = str => {
  if (!str) return '';
  return str.replace(
    /\w\S*/g,
    txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
};

export const truncate = (str, length = 50, suffix = '...') => {
  if (!str) return '';
  if (str.length <= length) return str;
  return str.substring(0, length) + suffix;
};

export const slugify = str => {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Time formatting
export const formatDuration = seconds => {
  if (seconds < 60) return `${seconds}s`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${seconds % 60}s`;

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  return `${hours}h ${minutes}m`;
};

// Social media formatting
export const formatSocialNumber = number => {
  if (number >= 1000000) {
    return `${(number / 1000000).toFixed(1)}M`;
  } else if (number >= 1000) {
    return `${(number / 1000).toFixed(1)}K`;
  }
  return number.toString();
};

// Credit card formatting
export const formatCreditCard = cardNumber => {
  if (!cardNumber) return '';

  const cleaned = cardNumber.replace(/\D/g, '');
  const groups = cleaned.match(/.{1,4}/g);

  return groups ? groups.join(' ') : cleaned;
};

// Mask sensitive data
export const maskEmail = email => {
  if (!email) return '';

  const [localPart, domain] = email.split('@');
  if (localPart.length <= 2) return email;

  const maskedLocal =
    localPart.charAt(0) +
    '*'.repeat(localPart.length - 2) +
    localPart.charAt(localPart.length - 1);
  return `${maskedLocal}@${domain}`;
};

export const maskPhone = phone => {
  if (!phone) return '';

  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length < 4) return phone;

  return '*'.repeat(cleaned.length - 4) + cleaned.slice(-4);
};

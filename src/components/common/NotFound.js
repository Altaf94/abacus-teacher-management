import React from 'react';
import { Navigate } from 'react-router-dom';

const NotFound = () => {
  // Simply redirect to login page
  return <Navigate to="/login" replace />;
};

export default NotFound;

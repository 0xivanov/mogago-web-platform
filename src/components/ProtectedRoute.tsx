import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth, isBusinessUser, isAdminUser } from '../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: 'business' | 'admin';
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    // Redirect to appropriate login page based on required role
    return <Navigate to={`/${requiredRole}/login`} />;
  }

  const hasRequiredRole = requiredRole === 'business' 
    ? isBusinessUser() 
    : isAdminUser();

  if (!hasRequiredRole) {
    // Redirect to home if user doesn't have the required role
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute; 
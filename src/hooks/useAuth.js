import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from 'react';
import { apiService } from '../utils/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const logout = useCallback(() => {
    localStorage.removeItem(process.env.REACT_APP_AUTH_TOKEN_KEY);
    localStorage.removeItem(process.env.REACT_APP_REFRESH_TOKEN_KEY);
    setUser(null);
    setError(null);
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem(process.env.REACT_APP_AUTH_TOKEN_KEY);
      if (token) {
        // Skip the /auth/me call since this endpoint doesn't exist
        // Just set a basic user object if token exists
        setUser({ username: 'authenticated_user' });
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      logout();
    } finally {
      setLoading(false);
    }
  }, [logout]);

  // Check if user is authenticated on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async credentials => {
    try {
      setLoading(true);
      setError(null);

      // Make API call to the login endpoint
      const response = await apiService.post('/auth/login/', {
        username: credentials.username || credentials.email, // Support both username and email
        password: credentials.password,
      });

      const { access_token, refresh_token, user: userData } = response.data;

      // Store tokens in localStorage
      localStorage.setItem(process.env.REACT_APP_AUTH_TOKEN_KEY, access_token);
      localStorage.setItem(
        process.env.REACT_APP_REFRESH_TOKEN_KEY,
        refresh_token
      );

      setUser(userData);
      return { success: true };
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        'Login failed';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async userData => {
    try {
      setLoading(true);
      setError(null);

      const response = await apiService.post('/auth/register', userData);
      const { accessToken, refreshToken, user: newUser } = response.data;

      localStorage.setItem(process.env.REACT_APP_AUTH_TOKEN_KEY, accessToken);
      localStorage.setItem(
        process.env.REACT_APP_REFRESH_TOKEN_KEY,
        refreshToken
      );

      setUser(newUser);
      return { success: true };
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed',
      };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async profileData => {
    try {
      setLoading(true);
      const response = await apiService.put('/auth/profile', profileData);
      setUser(response.data);
      return { success: true };
    } catch (error) {
      setError(error.response?.data?.message || 'Profile update failed');
      return {
        success: false,
        error: error.response?.data?.message || 'Profile update failed',
      };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

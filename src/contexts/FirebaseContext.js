import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
};

const reducer = (state, action) => {
  if (action.type === 'INITIALISE') {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    };
  }
  return state;
};

const AuthContext = createContext({
  ...initialState,
  method: 'mock',
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => Promise.resolve(),
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Auto-login effect
  useEffect(() => {
    // Simulate authenticated user
    const mockUser = {
      uid: 'mock-user-123',
      email: 'demo@piksy.no',
      photoURL: null,
      displayName: 'Mock User',
      phoneNumber: '',
    };

    dispatch({
      type: 'INITIALISE',
      payload: { isAuthenticated: true, user: mockUser },
    });
  }, []);

  // Mock auth methods
  const login = (email, password) => {
    return Promise.resolve();
  };

  const register = (email, password, firstName, lastName) => {
    return Promise.resolve();
  };

  const logout = () => {
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'mock',
        user: {
          id: state?.user?.uid,
          email: state?.user?.email,
          photoURL: state?.user?.photoURL,
          displayName: state?.user?.displayName,
          role: 'admin', // Give admin access by default
          phoneNumber: state?.user?.phoneNumber || '',
          country: '',
          address: '',
          state: '',
          city: '',
          zipCode: '',
          about: '',
          isPublic: false,
        },
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
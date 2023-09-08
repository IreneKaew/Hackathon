// auth.ts
import { createStore } from '@stencil/store';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  // Add other user properties as needed
}

interface AuthStore {
  user: User | null;
  token: string | null;
}

const { state } = createStore<AuthStore>({
  user: null,
  token: null,
});

export const useAuth = () => {
  const setUser = (user: User | null, token: string | null) => {
    state.user = user;
    state.token = token;
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('/api/user/login', { email, password });
      const { user, token } = response.data;
      setUser(user, token);
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null, null);
  };

  const isLoggedIn = () => {
    return state.user !== null;
  };

  return { ...state, login, logout, isLoggedIn };
};

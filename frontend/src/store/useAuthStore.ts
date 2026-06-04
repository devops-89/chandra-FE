import { create } from 'zustand';

interface AuthUser {
  id: string;
  name: string;
  email: string;
}

interface AuthStore {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: () => void;
  logout: () => void;
}

const dummyUser: AuthUser = {
  id: '1',
  name: 'Akash',
  email: 'akash@test.com',
};

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: true,
  user: dummyUser,

  login: () =>
    set({
      isAuthenticated: true,
      user: dummyUser,
    }),

  logout: () =>
    set({
      isAuthenticated: false,
      user: null,
    }),
}));

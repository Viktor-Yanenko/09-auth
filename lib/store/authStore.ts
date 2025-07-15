import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '../../types/user';

type AuthStore = {
  isAuth: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuth: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuth: false,
      user: null,
      setUser: (user: User) => {
        set(() => ({ user, isAuth: true }));
      },
      clearIsAuth: () => {
        set(() => ({ user: null, isAuth: false }));
      },
    }),
    {
      name: 'auth',
      partialize: (state) => ({ user: state.user, isAuth: state.isAuth})
    }
  )
);

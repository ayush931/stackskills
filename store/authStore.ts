import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import type { Role } from '@/utils/token';

interface AuthState {
  isLoggedIn: boolean;
  role: Role | null;
  phone: string | null;
  userId: string | null;
}

interface AuthActions {
  setAuth: (userId: string, phone: string, role: Role) => void;
  logout: () => void;
  setRole: (role: Role) => void;
}

type AuthStore = AuthActions & AuthState;

const initialState: AuthState = {
  isLoggedIn: false,
  role: null,
  phone: null,
  userId: null
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      setAuth: (userId, phone, role) => set({
        isLoggedIn: true,
        userId,
        phone,
        role
      }),
      logout: () => set(initialState),
      setRole: (role) => set({ role })
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
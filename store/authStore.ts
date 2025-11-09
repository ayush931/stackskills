import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import type { Role } from '@/utils/token';

interface AuthState {
  isLoggedIn: boolean;
  role: Role | null;
  phone: string | null;
  userId: string | null;
  name: string | null;
}

interface AuthActions {
  setAuth: (userId: string, phone: string, role: Role, name: string) => void;
  logout: () => void;
  setRole: (role: Role) => void;
}

type AuthStore = AuthActions & AuthState;

const initialState: AuthState = {
  isLoggedIn: false,
  role: null,
  phone: null,
  userId: null,
  name: null
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      setAuth: (userId, phone, role, name) => set({
        isLoggedIn: true,
        userId,
        phone,
        role,
        name
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
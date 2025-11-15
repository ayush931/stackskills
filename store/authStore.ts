import { persist } from 'zustand/middleware';
import { create } from 'zustand';
import type { Role } from '@/utils/token';
import { decryptData, encryptData } from '@/utils/localStorageEncryption';

interface AuthState {
  isLoggedIn: boolean;
  role: Role | null;
  phone: string | null;
  userId: string | null;
  name: string | null;
  isHydrated: boolean; // track if the store is initialized
}

interface AuthActions {
  setAuth: (userId: string, phone: string, role: Role, name: string) => void;
  logout: () => void;
  verifyAndRestoreAuth: () => Promise<void>;
  setRole: (role: Role) => void;
  setHydrated: () => void;
}

type AuthStore = AuthActions & AuthState;

const initialState: AuthState = {
  isLoggedIn: false,
  role: null,
  phone: null,
  userId: null,
  name: null,
  isHydrated: false,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,
      setAuth: (userId, phone, role, name) =>
        set({
          isLoggedIn: true,
          userId,
          phone,
          role,
          name,
        }),
      logout: () => set(initialState),
      setRole: (role) => set({ role }),
      setHydrated: () => set({ isHydrated: true }),

      verifyAndRestoreAuth: async () => {
        try {
          const response = await fetch('/api/auth/verify', {
            method: 'GET',
            credentials: 'include',
          });

          const result = await response.json();

          if (result.success && result.data) {
            set({
              isLoggedIn: true,
              userId: result.data.id,
              phone: result.data.phone,
              role: result.data.role,
              name: result.data.name,
            });
          } else {
            set(initialState);
          }
        } catch (error) {
          console.error('Auth verification failed', error);
          set(initialState);
        }
      },
    }),
    {
      name: 'token',
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          try {
            const decrypted = decryptData(str);
            return JSON.parse(decrypted);
          } catch (error) {
            console.log(error);
          }
        },
        setItem: (name, value) => {
          const encrypted = encryptData(JSON.stringify(value));
          localStorage.setItem(name, encrypted);
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    }
  )
);

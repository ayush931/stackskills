import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';

export function useAuthVerification() {
  const { verifyAndRestoreAuth, isHydrated } = useAuthStore();

  useEffect(() => {
    if (isHydrated) {
      verifyAndRestoreAuth();
    }
  }, [isHydrated, verifyAndRestoreAuth]);
}

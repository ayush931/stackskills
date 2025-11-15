'use client';

import { useAuthVerification } from '@/utils/authVerification';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  useAuthVerification();
  return <>{children}</>;
}

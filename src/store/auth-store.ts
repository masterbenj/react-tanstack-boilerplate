import { create } from 'zustand';
import { type Session } from '@app-types';
import { persist } from 'zustand/middleware';

interface AuthState {
  user              : Session.User | null
  token             : string | null
  setAuth           : (user: Session.User, token: string) => void
  logout            : () => void
  isAuthenticated   : () => boolean
  authPage          : boolean
  setAuthPage       : (auth: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      setAuth: (user, token) => {
        set({ user, token })
      },
      logout: () => set({ user: null, token: null }),
      isAuthenticated: () => !!get().token,
      authPage: false,
      setAuthPage: (auth) => set({ authPage: auth })
    }),
    {
      name: 'auth-storage'
    }
  )
)
import {create} from 'zustand';

export const useUserStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isAuthorized: false,
  setIsAuthorized: (isAuthorized) => set({ isAuthorized }),
}));
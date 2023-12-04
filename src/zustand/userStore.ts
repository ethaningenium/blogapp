import { create } from 'zustand';

export type userType = {
  userName: string;
  userEmail: string;
};

interface BearState {
  user: userType;
  setUserToStore: (by: userType) => void;
}

export const UserSet = create<BearState>()((set) => ({
  user: {
    userName: '',
    userEmail: '',
  },
  setUserToStore: (by) => set((state) => ({ user: by })),
}));

import { createStore } from 'zustand';

type Store = {
  isFirstOpen: boolean;
  toogle: () => void;
};

export const useIsFirstOpen = createStore<Store>((set) => ({
  isFirstOpen: true,
  toogle: () => set((state) => ({ isFirstOpen: !state.isFirstOpen })),
}));

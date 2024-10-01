import { create } from 'zustand';

const useLoadingStore = create((set) => ({
  isLoading: true, // initial state will be true, means still loading
  setIsLoading: (loadingState) => set({ isLoading: loadingState }),
}));

export default useLoadingStore;

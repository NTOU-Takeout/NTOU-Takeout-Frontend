import { create } from 'zustand';

// 定義 Zustand store
const useNavStore = create((set) => ({
  navbarItems: ['套餐', '主食', '甜點'],  // Default nav items
  nowPage: 0,  // Now page nav
  setNowPage: (pageIndex) => set({ nowPage: pageIndex }),  // Update now page
  setNavbarItems: (items) => set({ navbarItems: items })   // Update nav state
}));

export default useNavStore;
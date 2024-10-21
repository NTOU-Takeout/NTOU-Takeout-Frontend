import { create } from 'zustand';



const useMenuSectionItemStore = create((set) => ({
    items: [],
    setItems: (newItems) => set(() => ({ items: newItems })),
  }));

export default useMenuSectionItemStore;

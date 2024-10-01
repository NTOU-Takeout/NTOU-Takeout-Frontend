import { create } from 'zustand';

const useCartStore = create((set) => ({
  cartCount: 0,
  setCartCount: (count) => set({ cartCount: count }),
  fetchCartCount: async () => {
    try {
      const response = await fetch('/api/cart');
      const data = await response.json();
      set({ cartCount: data.count });
    } catch (error) {
      console.error('Failed to fetch cart count:', error);
    }
  }
}));

export default useCartStore;

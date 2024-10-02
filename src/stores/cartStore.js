import { create } from 'zustand';

const useCartStore = create((set) => ({
<<<<<<< HEAD
  cartCount: 0,
=======
  cartCount: 10,
>>>>>>> 1c7cc47 (Fix Header component bugs)
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

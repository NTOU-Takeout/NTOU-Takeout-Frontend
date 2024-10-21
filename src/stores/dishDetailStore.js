import { create }from 'zustand';

const useDishStore = create((set) => ({
  // 保存選中的飯糰大小，預設是「大份」
  selectedSize: 'Large',
  // 保存數量，預設是1
  quantity: 1,
  
  // 設置選擇的飯糰大小
  setSelectedSize: (size) => set({ selectedSize: size }),
  
  // 設置數量，當數量小於1時強制設為1（避免負數）
  setQuantity: (quantity) => set({ quantity: quantity < 1 ? 1 : quantity }),
}));

export default useDishStore;
import { create } from 'zustand';

const useOrderStore = create((set) => ({
  orders: [
    { 
      id: 1, 
      status: '製作中', 
      total: 260, 
      orderedTime: '2024-12-16 10:00:00', 
      estimateTime: '2024-12-16 10:30:00' 
    },
    { 
      id: 2, 
      status: '未取餐', 
      total: 300, 
      orderedTime: '2024-06-01 10:05:00', 
      estimateTime: '2024-06-01 10:45:00' 
    },
    { 
      id: 3, 
      status: '已取餐', 
      total: 350, 
      orderedTime: '2024-06-01 09:30:00', 
      estimateTime: '2024-06-01 10:00:00' 
    },
    { 
      id: 4, 
      status: '取消', 
      total: 500, 
      orderedTime: '2024-06-01 08:45:00', 
      estimateTime: '2024-06-01 09:15:00' 
    },
    { 
      id: 5, 
      status: '製作中', 
      total: 400, 
      orderedTime: '2024-06-01 11:00:00', 
      estimateTime: '2024-06-01 11:45:00' 
    },
    { 
      id: 6, 
      status: '未取餐', 
      total: 220, 
      orderedTime: '2024-06-01 10:20:00', 
      estimateTime: '2024-06-01 11:00:00' 
    },
    { 
      id: 7, 
      status: '已取餐', 
      total: 280, 
      orderedTime: '2024-06-01 09:00:00', 
      estimateTime: '2024-06-01 09:30:00' 
    },
    { 
      id: 8, 
      status: '取消', 
      total: 600, 
      orderedTime: '2024-06-01 07:45:00', 
      estimateTime: '2024-06-01 08:15:00' 
    },
    { 
      id: 9, 
      status: '製作中', 
      total: 270, 
      orderedTime: '2024-06-01 12:00:00', 
      estimateTime: '2024-06-01 12:45:00' 
    },
    { 
      id: 10, 
      status: '未取餐', 
      total: 330, 
      orderedTime: '2024-06-01 11:20:00', 
      estimateTime: '2024-06-01 12:00:00' 
    },
    { 
      id: 11, 
      status: '未接單', 
      total: 180, 
      orderedTime: '2024-12-16 14:00:00', 
      estimateTime: '2024-12-16 14:30:00' 
    },
    { 
      id: 12, 
      status: '未接單', 
      total: 500, 
      orderedTime: '2024-12-16 15:00:00', 
      estimateTime: '2024-12-16 15:45:00' 
    },
  ],
  updateOrderStatus: (id, newStatus) => {
    set((state) => {
      const updatedOrders = state.orders.map((order) =>
        order.id === id ? { ...order, status: newStatus } : order
      );
      const updatedOrder = updatedOrders.find(order => order.id === id);
      console.log(`Order ID: ${id} updated to status: ${updatedOrder.status}`);
      
      return { orders: updatedOrders };
    });
  },
}));

export default useOrderStore;

import OrderCard from './OrderCard';
import useOrderStore from '../../../stores/orderStore';

const UnacceptedList = () => {
  const { orders, updateOrderStatus } = useOrderStore();

  // 接單邏輯
  const handleAccept = (id) => {
    updateOrderStatus(id, '製作中');
  };

  // 拒單邏輯
  const handleReject = (id) => {
    updateOrderStatus(id, '取消');
  };

  const pendingOrders = orders.filter((order) => order.status === '未接單');

  return (
    <div className="bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">未接單清單</h1>
        <div>
        {pendingOrders.map((order) => (
            <OrderCard
            key={order.id}
            order={order}
            onAccept={handleAccept}
            onReject={handleReject}
            />
        ))}
        </div>
    </div>
  );
};

export default UnacceptedList;

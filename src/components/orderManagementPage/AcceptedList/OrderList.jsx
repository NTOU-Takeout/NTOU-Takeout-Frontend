import useOrderStore from '../../../stores/orderStore';
import OrderCard from './OrderCard';

function AcceptedList() {
  const { orders } = useOrderStore();

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">已接單清單</h1>
      <div>
        {orders.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default AcceptedList;

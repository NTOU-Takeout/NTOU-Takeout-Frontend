import PropTypes from 'prop-types';

const getStatusColors = (status) => {
  switch (status) {
    case '製作中':
      return { bgColor: 'bg-blue-500', textColor: 'text-gray-100' };
    case '未取餐':
      return { bgColor: 'bg-yellow-500', textColor: 'text-gray-100' };
    case '已取餐':
      return { bgColor: 'bg-green-500', textColor: 'text-gray-100' };
    case '取消':
      return { bgColor: 'bg-gray-300', textColor: 'text-gray-100' };
    default:
      return { bgColor: 'bg-gray-200', textColor: 'text-gray-100' };
  }
};

const OrderCard = ({ order }) => {
  if (order.status === '未接單') {
    return null;
  }

  const { bgColor, textColor } = getStatusColors(order.status);

  const isOverdue = () => {
    const now = new Date();
    const estimate = new Date(order.estimateTime);
    return order.status === '製作中' && now > estimate;
  };

  return (
    <div className="relative flex justify-between rounded-lg p-4 shadow-md mb-4 bg-white">
      
      <div>
        <p className="text-lg font-bold">單號 {order.id}</p>
        <p className="text-sm">下單時間: {order.orderedTime}</p>
        <p className="text-sm">預估取餐時間: {order.estimateTime}</p>
        <button className="bg-orange-500 mt-6 text-white px-3 py-1 text-sm font-bold rounded hover:bg-orange-600">
          訂單內容
        </button>
      </div>

      <div className="flex flex-col items-end">
        <div className="flex items-center">
          {isOverdue() && (
            <span className="text-red-500 text-sm ml-2 font-bold pr-2">超時</span>
          )}
          <span className={`px-3 py-1 rounded-md text-sm font-bold ${bgColor} ${textColor}`}>
            {order.status}
          </span>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 mt-5">
        <p className="mt-2 font-semibold">總金額: {order.total} 元</p>
      </div>
    </div>
  );
};

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    total: PropTypes.number.isRequired,
    orderedTime: PropTypes.string.isRequired,
    estimateTime: PropTypes.string.isRequired,
  }).isRequired,
};

export default OrderCard;

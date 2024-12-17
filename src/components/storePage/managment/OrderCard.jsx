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

const getNextStatus = (currentStatus) => {
  switch (currentStatus) {
    case '製作中':
      return '未取餐';
    case '未取餐':
      return '已取餐';
    case '未接單':
      return '製作中';
    default:
      return null;
  }
};

const OrderCard = ({ order, onAccept, onReject, onStatusChange, showStatus = true }) => {
  const { bgColor, textColor } = getStatusColors(order.status);

  const isOverdue = () => {
    const now = new Date();
    const estimate = new Date(order.estimateTime);
    return order.status === '製作中' && now > estimate;
  };

  const handleStatusClick = () => {
    const nextStatus = getNextStatus(order.status);
    if (nextStatus) {
      onStatusChange && onStatusChange(order.id, nextStatus);
    }
  };

  return (
    <div className="relative flex justify-between rounded-lg p-4 shadow-md mb-4 bg-white">
      {/* Order Info */}
      <div>
        <p className="text-lg font-bold">單號 {order.id}</p>
        <p className="text-sm">下單時間: {order.orderedTime}</p>
        <p className="text-sm">預估取餐時間: {order.estimateTime}</p>
        <button className="bg-orange-500 mt-6 text-white px-3 py-1 text-sm font-bold rounded hover:bg-orange-600">
          訂單內容
        </button>
      </div>

      {/* Status */}
      <div className="flex flex-col items-end">
        {/* Badge */}
        {showStatus && order.status !== '未接單' && (
          <div className="flex items-center mb-2">
            {isOverdue() && (
              <span className="text-red-500 text-sm ml-2 font-bold pr-2">超時</span>
            )}
            <button
              onClick={handleStatusClick}
              disabled={!getNextStatus(order.status)}
              className={`px-3 py-1 rounded-md text-sm font-bold ${bgColor} ${textColor} ${!getNextStatus(order.status) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {order.status}
            </button>
          </div>
        )}
        {/* Buttons */}
        {order.status === '未接單' && (
          <div className="flex gap-2">
            {onReject && (
              <button
                onClick={() => onReject(order.id)}
                className="bg-red-500 text-white px-3 py-1 text-sm font-bold rounded hover:bg-red-600"
              >
                拒絕
              </button>
            )}
            {onAccept && (
              <button
                onClick={() => onAccept(order.id)}
                className="bg-green-500 text-white px-3 py-1 text-sm font-bold rounded hover:bg-green-600"
              >
                接單
              </button>
            )}
          </div>
        )}
      </div>

      {/* Total price */}
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
  onAccept: PropTypes.func,
  onReject: PropTypes.func,
  onStatusChange: PropTypes.func,
  showStatus: PropTypes.bool,
};

export default OrderCard;

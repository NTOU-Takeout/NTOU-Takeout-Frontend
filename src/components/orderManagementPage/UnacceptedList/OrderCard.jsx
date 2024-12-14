import PropTypes from 'prop-types';

const OrderCard = ({ order, onAccept, onReject }) => {
  return (
    <div className="relative flex justify-between border rounded-lg p-4 shadow-sm mb-4 bg-white">
      {/* 左側訂單資訊 */}
      <div>
        <p className="text-lg font-bold">單號 {order.id}</p>
        <p className="text-sm">下單時間: {order.orderedTime}</p>
        <p className="text-sm">預估取餐時間: {order.estimateTime}</p>
        <button className="bg-orange-500 text-white px-3 py-1 rounded mt-2 hover:bg-orange-600">
          訂單內容
        </button>
      </div>

      {/* 右側按鈕和總金額 */}
      <div className="flex flex-col items-end">
        <div className="flex gap-2 mb-2">
          <button
            onClick={() => onReject(order.id)}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            拒絕
          </button>
          <button
            onClick={() => onAccept(order.id)}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
          >
            接單
          </button>
        </div>
        <div className="absolute bottom-4 right-4">
            <p className="mt-2 font-semibold">總金額: {order.total} 元</p>
        </div>
      </div>
    </div>
  );
};

OrderCard.propTypes = {
  order: PropTypes.shape({
    id: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    orderedTime: PropTypes.string.isRequired,
    estimateTime: PropTypes.string.isRequired,
  }).isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};

export default OrderCard;

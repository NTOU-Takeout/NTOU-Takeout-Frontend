import PropTypes from "prop-types";

const CartOrderSection = ({ orderDetail }) => {
    const { totalSpend, estimateTime } = orderDetail;
    return (
        <div className="bg-orange-400 p-6 rounded-t-lg  text-white font-notoTC font-medium">
            <div className="flex justify-between mb-4">
                <span>總金額</span>
                <span>$ {totalSpend}</span>
            </div>
            <div className="flex justify-between mb-6">
                <span>預估完成時間</span>
                <span>
                    {estimateTime - 10} ~ {estimateTime + 10} 分鐘
                </span>
            </div>
            <button className="w-full bg-white text-orange-500 py-2 rounded-full font-semibold">
                送出訂單
            </button>
        </div>
    );
};

CartOrderSection.propTypes = {
    orderDetail: PropTypes.shape({
        totalSpend: PropTypes.number.isRequired,
        estimateTime: PropTypes.number.isRequired,
    }).isRequired,
};

export default CartOrderSection;

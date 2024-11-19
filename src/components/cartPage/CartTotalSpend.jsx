const CartTotalSpend = ({ orderDetail }) => {
    const { merchantName, totalSpend } = orderDetail;
    return (
        <div className="mt-[66px] flex justify-between items-center p-4 bg-white">
            {/* Store Info */}
            <div>
                <h1 className="text-lg font-bold text-gray-900">
                    {merchantName}
                </h1>
                <p className="text-sm text-gray-500">訂單詳細資訊</p>
            </div>
            {/* Order Total */}
            <div className="text-right">
                <p className="text-sm text-gray-500">總金額</p>
                <h2 className="text-2xl font-bold text-black">${totalSpend}</h2>
            </div>
        </div>
    );
};

export default CartTotalSpend;

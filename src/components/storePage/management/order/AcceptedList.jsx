import OrderCard from "./OrderCard.jsx";
import useOrderStore from "../../../../stores/orderStore.js";
import PropTypes from "prop-types";

function AcceptedList() {
    const orders = useOrderStore((state) => state.orders)
    console.debug("orders", orders);
    const filteredOrders = orders.filter((order) => order.status !== "PENDING");

    const handleStatusChange = (orderId, nextStatus) => {
        updateOrderStatus(orderId, nextStatus);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <h1 className="text-2xl font-bold mb-4">已接單清單</h1>
            <div>
                {/*{filteredOrders.length > 0 ? (*/}
                {/*    filteredOrders.map((order) => (*/}
                {/*        <OrderCard*/}
                {/*            key={order.id}*/}
                {/*            order={order}*/}
                {/*            onStatusChange={handleStatusChange}*/}
                {/*        />*/}
                {/*    ))*/}
                {/*) : (*/}
                {/*    <p className="text-gray-500">目前沒有已接單的訂單</p>*/}
                {/*)}*/}
            </div>
        </div>
    );
}
AcceptedList.prototype={
    orderData: PropTypes.object,
}

export default AcceptedList;

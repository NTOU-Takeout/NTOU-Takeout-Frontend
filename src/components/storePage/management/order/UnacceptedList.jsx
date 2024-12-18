import OrderCard from "./OrderCard.jsx";
import useOrderStore from "../../../../stores/orderStore.js";

const UnacceptedList = () => {
    const orders = useOrderStore((state) => state.orders);

    const filteredOrders = orders.filter((order) => order.status === "PENDING");

    return (
        <div className="flex flex-col text-center justify-between ">
            {filteredOrders.length > 0 ? (
                filteredOrders?.map((order) => (
                    <OrderCard key={order.id} order={order} />
                ))
            ) : (
                <p className="text-gray-500 pt-20">目前沒有未接單的訂單</p>
            )}
        </div>
    );
};

export default UnacceptedList;

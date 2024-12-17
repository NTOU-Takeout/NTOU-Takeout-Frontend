import { useState } from "react";
import Header from "../../components/storePage/home/Header";
import useSidebarStore from "../../stores/common/sidebarStore";
import OrderCard from "../../components/storePage/management/order/OrderCard.jsx";
import { useSystemContext } from "../../context/SystemContext.jsx";
import UnacceptedList from "../../components/storePage/management/order/UnacceptedList.jsx";
import AcceptedList from "../../components/storePage/management/order/AcceptedList.jsx";
const Home = () => {
    const [orderCount, setOrderCount] = useState(0);
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const title = useSidebarStore((state) => state.title);
    const orderCountButton = (
        <button
            onClick={() => {
                console.debug("orderCountButton click");
            }}
            className=" bg-orange-500 text-gray-200 rounded-lg px-3 py-1 font-sm shadow-md"
        >
            共計 {orderCount} 筆訂單
        </button>
    );
    const { cartData } = useSystemContext();
    console.debug("cartData", cartData);
    const cartStatus = cartData.status;
    return (
        <div>
            <Header
                title={title}
                onLeftClick={toggleSidebar}
                rightComponents={[orderCountButton]}
            />
            <div className="relative top-20">
                {cartData.orderedDishes.map((dish, _) => (
                    <OrderCard
                        key={_}
                        order={{
                            ...dish,
                            status: "CANCELED",
                        }}
                        showStatus={true}
                    />
                ))}
            </div>
            <UnacceptedList></UnacceptedList>
            <AcceptedList></AcceptedList>
        </div>
    );
};

export default Home;

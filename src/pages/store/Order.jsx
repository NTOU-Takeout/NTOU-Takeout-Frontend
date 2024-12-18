import { useState } from "react";
import Header from "../../components/storePage/home/Header";
import useSidebarStore from "../../stores/common/sidebarStore";
import OrderCard from "../../components/storePage/management/order/OrderCard.jsx";
import { useSystemContext } from "../../context/SystemContext.jsx";
import UnacceptedList from "../../components/storePage/management/order/UnacceptedList.jsx";
import AcceptedList from "../../components/storePage/management/order/AcceptedList.jsx";

import BlueNotify from "../../components/storePage/management/order/BlueNotify";
import ReceiveOrderNotify from "../../components/storePage/management/order/ReceiveOrderNotify";
import ConfirmStatus from "../../components/storePage/management/order/ConfirmStatus";
import Filter from "../../components/storePage/management/order/Filter";

import useReceiveOrderNotifyStore from "../../stores/receiveOrderNotify";
import useFinishDishStore from "../../stores/finishDishStore";
import useFinishTakeOutStore from "../../stores/finishTakeOut";
import useOrderFilterStore from "../../stores/orderFilter";

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
    //const cartStatus = cartData.status;
    //////////////////////////////////////////////////////////////////////////////////////////////////////
    const isReceiveOrderNotifyOpen = useReceiveOrderNotifyStore(
        (state) => state.isOpen,
    );
    const closeReceiveOrderNotify = useReceiveOrderNotifyStore(
        (state) => state.closeReceiveOrderNotify,
    );

    const isFinishDishOpen = useFinishDishStore((state) => state.isOpen);
    const closeFinishDish = useFinishDishStore(
        (state) => state.closeFinishDish,
    );

    const isFinishTakeOutOpen = useFinishTakeOutStore((state) => state.isOpen);
    const closeFinishTakeOut = useFinishTakeOutStore(
        (state) => state.closeFinishTakeOut,
    );

    const isOrderFilterOpen = useOrderFilterStore((state) => state.isOpen);
    const closeOrderFilter = useOrderFilterStore(
        (state) => state.closeOrderFilter,
    );

    const handleRefresh = () => {
        console.log("需要去refresh");
    };
    const handleReceiveOrderNotifyConfirm = () => {
        console.log("接收訂單的confirm");
    };
    const handleReceiveOrderNotifyCancel = () => {
        console.log("接收訂單的cancel");
    };

    const handleFinishDishConfirm = () => {
        console.log("已製作完成的confirm");
    };
    const handleFinishDishCancel = () => {
        console.log("已製作完成的cancel");
    };

    const handleFinishTakeOutConfirm = () => {
        console.log("已取餐的confirm");
    };
    const handleFinishTakeOutCancel = () => {
        console.log("已取餐的cancel");
    };

    const items = [
        { name: "asdas", quantity: 5 },
        { name: "asdas", quantity: 5 },
    ];
    const number = "123121124";
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    return (
        <div>
            <Header
                title={title}
                onLeftClick={toggleSidebar}
                rightComponents={[orderCountButton]}
            />
            <div className="relative top-20">
                {cartData?.orderedDishes.map((dish, _) => (
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
            {/*<UnacceptedList></UnacceptedList>
            <AcceptedList></AcceptedList>*/}
            <BlueNotify onRefresh={() => handleRefresh()}></BlueNotify>

            {isReceiveOrderNotifyOpen && (
                <ReceiveOrderNotify
                    items={items}
                    finishTime={9}
                    number={number}
                    onBack={closeReceiveOrderNotify}
                    onConfirm={handleReceiveOrderNotifyConfirm}
                    onCancel={handleReceiveOrderNotifyCancel}
                ></ReceiveOrderNotify>
            )}
            {isFinishDishOpen && (
                <ConfirmStatus
                    title="製作完成？"
                    items={items}
                    number={number}
                    onBack={closeFinishDish}
                    onConfirm={handleFinishDishConfirm}
                    onCancel={handleFinishDishCancel}
                ></ConfirmStatus>
            )}
            {isFinishTakeOutOpen && (
                <ConfirmStatus
                    title="取餐？"
                    items={items}
                    number={number}
                    onBack={closeFinishTakeOut}
                    onConfirm={handleFinishTakeOutConfirm}
                    onCancel={handleFinishTakeOutCancel}
                ></ConfirmStatus>
            )}
            {isOrderFilterOpen && <Filter onBack={closeOrderFilter}></Filter>}
        </div>
    );
};

export default Home;

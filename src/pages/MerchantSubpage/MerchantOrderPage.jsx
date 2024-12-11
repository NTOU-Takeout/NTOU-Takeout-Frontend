import useSidebarStore from "../../stores/merchantSidebarStore";
import MerchantOrderHeader from "../../components/merchantManagePage/merchantOrderComponents/merchantOrderHeader";
import MerchantOrderSidebar from "../../components/merchantManagePage/merchantOrderComponents/MerchantOrderSidebar";
import BlueNotify from "../../components/merchantManagePage/merchantOrderComponents/popUpWindowPanel/blueNotify";
import ReceiveOrderNotify from "../../components/merchantManagePage/merchantOrderComponents/popUpWindowPanel/receiveOrderNotify";
import ConfirmStatus from "../../components/merchantManagePage/merchantOrderComponents/popUpWindowPanel/ConfirmStatus";
import useReceiveOrderNotifyStore from "../../stores/receiveOrderNotify";
import useFinishDishStore from "../../stores/finishDishStore";
import useFinishTakeOutStore from "../../stores/finishTakeOut";
function MerchantOrderPage() {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const merchantName = "海洋大學店";
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

    const handleRefresh = () => {
        console.log("To do refresh");
    };
    const handleReceiveOrderNotifyConfirm = () => {
        console.log("confirm");
    };
    const handleReceiveOrderNotifyCancel = () => {
        console.log("cancel");
    };

    const handleFinishDishConfirm = () => {
        console.log("confirm");
    };
    const handleFinishDishCancel = () => {
        console.log("cancel");
    };

    const handleFinishTakeOutConfirm = () => {
        console.log("confirm");
    };
    const handleFinishTakeOutCancel = () => {
        console.log("cancel");
    };

    const items = [
        { name: "asdas", quantity: 5 },
        { name: "asdas", quantity: 5 },
    ];
    const number = "123121124";
    return (
        <div>
            <MerchantOrderHeader
                merchantName={merchantName}
                orderNumber={5}
                onLeftClick={toggleSidebar} //sidebar
            ></MerchantOrderHeader>
            <MerchantOrderSidebar
                merchantName={merchantName}
            ></MerchantOrderSidebar>
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
        </div>
    );
}

export default MerchantOrderPage;

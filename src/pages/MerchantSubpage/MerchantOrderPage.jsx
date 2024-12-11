import useSidebarStore from "../../stores/merchantSidebarStore";
import MerchantOrderHeader from "../../components/merchantManagePage/merchantOrderComponents/merchantOrderHeader";
import MerchantOrderSidebar from "../../components/merchantManagePage/merchantOrderComponents/MerchantOrderSidebar";

function MerchantOrderPage() {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const merchantName = "海洋大學店";
    //const isOpen = useSidebarStore((state) => state.isOpen);
    //console.log(isOpen);
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
        </div>
    );
}

export default MerchantOrderPage;

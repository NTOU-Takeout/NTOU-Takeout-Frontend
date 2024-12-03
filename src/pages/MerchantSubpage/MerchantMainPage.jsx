import useSidebarStore from "../../stores/merchantSidebarStore";
import MerchantHeader from "../../components/merchantManagePage/merchantMainComponents/MerchantHeader";
import MerchantSidebar from "../../components/merchantManagePage/merchantMainComponents/MerchantSidebar";

function MerchantMainPage() {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const merchantName = "海洋大學店";
    //const isOpen = useSidebarStore((state) => state.isOpen);
    //console.log(isOpen);
    return (
        <div>
            <MerchantHeader
                merchantName={merchantName}
                onLeftClick={toggleSidebar}
            ></MerchantHeader>
            <MerchantSidebar merchantName={merchantName}></MerchantSidebar>
        </div>
    );
}

export default MerchantMainPage;

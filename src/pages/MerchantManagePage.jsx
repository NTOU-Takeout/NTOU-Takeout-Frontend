import useSidebarStore from "../stores/merchantSidebarStore";
import MerchantHeader from "../components/merchantManagePage/MerchantHeader";
import MerchantSidebar from "../components/merchantManagePage/merchantSidebar";
function MerchantManagePage() {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const merchantName = "海洋大學店";
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

export default MerchantManagePage;

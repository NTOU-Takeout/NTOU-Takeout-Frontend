import useSidebarStore from "../../stores/merchantSidebarStore";
import MerchantMenuHeader from "../../components/merchantManagePage/merchantMenuComponents/MerchantMenuHeader";
import MerchantMenuSidebar from "../../components/merchantManagePage/merchantMenuComponents/MerchantMenuSidebar";

function MerchantMenuPage() {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const merchantName = "海洋大學店";
    const isOpen = useSidebarStore((state) => state.isOpen);
    console.log(isOpen);
    return (
        <div>
            <MerchantMenuHeader
                merchantName={merchantName}
                onLeftClick={toggleSidebar} //sidebar
                onAddClick={toggleSidebar}
                onPreviewClick={toggleSidebar}
            ></MerchantMenuHeader>
            <MerchantMenuSidebar
                merchantName={merchantName}
            ></MerchantMenuSidebar>
        </div>
    );
}

export default MerchantMenuPage;

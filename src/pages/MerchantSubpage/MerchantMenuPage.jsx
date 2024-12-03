import useSidebarStore from "../../stores/merchantSidebarStore";
import MerchantMenuHeader from "../../components/merchantManagePage/merchantMenuComponents/MerchantMenuHeader";
import MerchantMenuSidebar from "../../components/merchantManagePage/merchantMenuComponents/MerchantMenuSidebar";
import MerchantMenuCategory from "../../components/merchantManagePage/merchantMenuComponents/MerchantMenuCatogory";

function MerchantMenuPage() {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const merchantName = "海洋大學店";
    //const isOpen = useSidebarStore((state) => state.isOpen);
    //console.log(isOpen);
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
            <div className="flex flex-col items-center justify-center min-h-screen mt-20">
                <MerchantMenuCategory categoryName="主食" />
                <MerchantMenuCategory categoryName="素食" />
            </div>
        </div>
    );
}

export default MerchantMenuPage;

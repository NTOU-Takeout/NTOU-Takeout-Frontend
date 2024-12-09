import useSidebarStore from "../../stores/merchantSidebarStore";
import MerchantMenuHeader from "../../components/merchantManagePage/merchantMenuComponents/MerchantMenuHeader";
import MerchantMenuSidebar from "../../components/merchantManagePage/merchantMenuComponents/MerchantMenuSidebar";
import MerchantMenuCategory from "../../components/merchantManagePage/merchantMenuComponents/MerchantMenuCatogory";
import useDishEditBarStore from "../../stores/merchantDishEditBar";
import MerchantDishEditPage from "./MerchantDishEditPage";
function MerchantMenuPage() {
    const toggleSidebar = useDishEditBarStore((state) => state.toggleSidebar);
    const isOpen = useSidebarStore((state) => state.isOpen);
    const merchantName = "海洋大學店";

    const isDishBarOpen = useDishEditBarStore((state) => state.isOpen);
    const dish = useDishEditBarStore((state) => state.dish);
    console.log(isOpen);
    console.log(isDishBarOpen);
    if (isDishBarOpen) {
        console.log(dish);
        return (
            <div>
                <MerchantDishEditPage dishDetail={dish}></MerchantDishEditPage>
            </div>
        );
    } else
        return (
            <div>
                <MerchantMenuHeader
                    merchantName={merchantName}
                    onLeftClick={toggleSidebar}
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

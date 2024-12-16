import { Outlet } from "react-router-dom";
import MerchantMenuPage from "./MerchantSubpage/MerchantMenuPage";
import MerchantMainPage from "./MerchantSubpage/MerchantMainPage";
function MerchantPage() {
    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
                <MerchantMainPage></MerchantMainPage>

                <Outlet />
            </div>
        </div>
    );
}

export default MerchantPage;

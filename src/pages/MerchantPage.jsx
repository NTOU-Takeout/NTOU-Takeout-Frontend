import { Outlet } from "react-router-dom";
import MerchantMainPage from "./MerchantSubpage/MerchantMainPage";
function MerchantPage() {
    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
                <MerchantMainPage />
                {/* 用于渲染嵌套路由的子内容 */}
                <Outlet />
            </div>
        </div>
    );
}

export default MerchantPage;

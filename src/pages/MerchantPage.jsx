import { Outlet } from "react-router-dom";
function MerchantPage() {
    return (
        <div style={{ display: "flex" }}>
            <div style={{ flex: 1 }}>
                <Outlet />
            </div>
        </div>
    );
}

export default MerchantPage;

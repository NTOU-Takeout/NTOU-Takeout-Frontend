import { useState } from "react";
import Header from "../../components/storePage/home/Header";
import useSidebarStore from "../../stores/common/sidebarStore";
const Home = () => {
    const [orderCount, setOrderCount] = useState(0);
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const title = useSidebarStore((state) => state.title);
    const orderCountButton = (
        <button
            onClick={() => {
                console.debug("orderCountButton click");
            }}
            className=" bg-orange-500 text-gray-200 rounded-lg px-3 py-1 font-sm shadow-md"
        >
            共計 {orderCount} 筆訂單
        </button>
    );
    return (
        <div>
            <Header
                title={title}
                onLeftClick={toggleSidebar}
                rightComponents={[
                    orderCountButton
                ]}
            />
            <div className="sticky top-[56px] z-20">
                Order page
            </div>

        </div>
    );
}

export default Home;
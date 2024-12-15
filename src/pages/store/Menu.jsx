import useSidebarStore from "../../stores/storePage/home/sidebarStore";
import Header from "../../components/storePage/management/menu/Header";
import Sidebar from "../../components/storePage/home/Sidebar";
import CategorySection from "../../components/storePage/management/menu/CategorySection";
function Menu() {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const merchantName = "海洋大學店";
    //const isOpen = useSidebarStore((state) => state.isOpen);
    //console.log(isOpen);
    return (
        <div>
            <Header
                merchantName={merchantName}
                onLeftClick={toggleSidebar} //sidebar
                onAddClick={toggleSidebar}
                onPreviewClick={toggleSidebar}
            ></Header>
            <Sidebar
                merchantName={merchantName}
            ></Sidebar>
            <div className="flex flex-col items-center justify-center min-h-screen mt-20">
                <CategorySection categoryName="主食" />
                <CategorySection categoryName="素食" />
            </div>
        </div>
    );
}

export default Menu;

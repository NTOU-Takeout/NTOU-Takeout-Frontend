import useSidebarStore from "../../stores/storePage/home/sidebarStore";
import Header from "../../components/storePage/home/Header";
import Sidebar from "../../components/storePage/home/Sidebar";
import { Outlet } from "react-router-dom";
function Home() {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const merchantName = "海洋大學店";
    //const isOpen = useSidebarStore((state) => state.isOpen);
    //console.log(isOpen);
    return (
        <div>
            <Header
                title={merchantName}
                onLeftClick={toggleSidebar}
            ></Header>
            <Sidebar merchantName={merchantName}></Sidebar>
            <Outlet />
        </div>
    );
}

export default Home;

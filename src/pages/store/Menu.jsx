import useSidebarStore from "../../stores/sidebarStore";
import Header from "../../components/storePage/home/Header";
import Sidebar from "../../components/storePage/home/Sidebar";
import CategorySection from "../../components/storePage/management/menu/CategorySection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

function Menu() {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    const setTitle = useSidebarStore((state) => state.setTitle);
    const title = useSidebarStore((state) => state.title);
    const merchantName = "海洋大學店";
    const onAddClick = () => { console.debug("add click") };

    useEffect(() => {
        setTitle("菜單管理");
        console.debug("set menu title")
    }, [setTitle]);

    const addButton = (
        <button
            onClick={onAddClick}
            className="bg-orange-500 text-white rounded-lg p-2 flex  shadow-md"
        >
            <FontAwesomeIcon icon={faPlus} size="md" />
        </button>
    );
    const previewButton = (
        <button
            onClick={() => {
                console.debug("preview click");
            }}
            className=" bg-slate-400 text-white rounded-lg px-3 py-1 font-sm shadow-md"
        >
            預覽
        </button>
    );
    return (
        <div>
            <Header
                title={title}
                onLeftClick={toggleSidebar}
                rightComponents={[
                    addButton,
                    previewButton,
                ]}
            />
            <Sidebar
                merchantName={merchantName}
            ></Sidebar>
            <div className="flex flex-col items-center justify-center min-h-screen mt-20">
                <CategorySection categoryName="主食" />
                <CategorySection categoryName="素食" />
            </div>
        </div >
    );
}

export default Menu;

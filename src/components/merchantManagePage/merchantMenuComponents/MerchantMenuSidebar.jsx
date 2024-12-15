import PropTypes from "prop-types";
import useSidebarStore from "../../../stores/storePage/home/sidebarStore";
import MerchantMenuSidebarButton from "./MerchantMenuSidebarButton";
import useThemeStore from "../../../stores/themeStore";
import {
    faComment,
    faCog,
    faSignOutAlt,
    faStore,
    faHome,
    faFolder,
    faMoon,
    faSun,
    faChartPie,
} from "@fortawesome/free-solid-svg-icons";

const MerchantMenuSidebar = ({ merchantName }) => {
    const isOpen = useSidebarStore((state) => state.isOpen);
    const theme = useThemeStore((state) => state.themeMode);
    const toggleTheme = useThemeStore((state) => state.toggleTheme);
    const closeSidebar = useSidebarStore((state) => state.closeSidebar);
    //console.log(isOpen, "asdlkawfqf");
    return (
        <>
            {isOpen && (
                <div
                    className={`fixed top-0 z-40 min-h-screen min-w-full transition-all duration-300  ${isOpen ? "bg-slate-950 bg-opacity-20" : ""
                        }`}
                    onClick={closeSidebar}
                ></div>
            )}
            <div
                className={`font-notoTC z-50 fixed inset-y-0 left-0 bg-white w-3/5 shadow-lg border-zinc-400 border-r-1 max-w-md ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 min-w-48`}
            >
                <div className="p-4">
                    <MerchantMenuSidebarButton
                        text={merchantName}
                        textStyle={"text-2xl px-2"}
                        icon={faStore}
                        iconSize="2xl"
                        iconColor={"#053766"}
                        style={"py-8"}
                        path="/merchantPage"
                        onClick={closeSidebar}
                    />
                    <MerchantMenuSidebarButton
                        text="主頁"
                        icon={faHome}
                        iconSize="lg"
                        iconColor={"#053766"}
                        style={"px-4 py-4"}
                        path="/merchantPage"
                        onClick={closeSidebar}
                    />
                    <MerchantMenuSidebarButton
                        text="訂單"
                        icon={faFolder}
                        iconSize="lg"
                        iconColor={"#053766"}
                        style={"px-4 py-4"}
                    />
                    <MerchantMenuSidebarButton
                        text="菜單"
                        icon={faFolder}
                        iconSize="lg"
                        iconColor={"#053766"}
                        style={"px-4 py-4"}
                        onClick={closeSidebar}
                        path="/merchantPage/menu"
                    />
                    <MerchantMenuSidebarButton
                        text="評論"
                        icon={faComment}
                        iconSize="lg"
                        iconColor={"#606162"}
                        style={"pt-8 pb-4 px-4"}
                    />
                    <MerchantMenuSidebarButton
                        text="營業分析"
                        icon={faChartPie}
                        iconSize="lg"
                        iconColor={"#606162"}
                        style={"px-4 py-4"}
                    />
                    <MerchantMenuSidebarButton
                        text="設定"
                        icon={faCog}
                        iconSize="lg"
                        iconColor={"#606162"}
                        style={"px-4 py-4"}
                    />
                </div>
                <div className="px-4 absolute bottom-0 left-0 right-2 flex justify-between">
                    <MerchantMenuSidebarButton
                        text="登出"
                        icon={faSignOutAlt}
                        iconSize="lg"
                        iconColor={"#606162"}
                    />
                    <MerchantMenuSidebarButton
                        icon={theme == "light" ? faMoon : faSun}
                        text="切換主題"
                        textStyle={"w-0  invisible"}
                        iconSize="lg"
                        iconColor={theme == "light" ? "#606162" : "#FFD43B"}
                        onClick={toggleTheme}
                    />
                </div>
            </div>
        </>
    );
};
MerchantMenuSidebar.propTypes = {
    merchantName: PropTypes.string,
};

export default MerchantMenuSidebar;

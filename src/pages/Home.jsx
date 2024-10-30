import Header from "../components/Header";
import useSidebarStore from "../stores/sidebarStore";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";
import MerchantList from "../components/MerchantList";

function Home() {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    return (
        <div>
            <Header title="NTOU Takeout" onLeftClick={toggleSidebar} className="fixed top-0" />
            <div className="py-5"></div>
            <Sidebar></Sidebar>
            <Searchbar></Searchbar>
            <MerchantList></MerchantList>
            
        </div>
    );
}

export default Home;

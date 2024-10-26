import Header from "../components/Header";
import useSidebarStore from "../stores/sidebarStore";
import Sidebar from "../components/Sidebar";
import Searchbar from "../components/Searchbar";
import MerchantList from "../components/MerchantList";
import MenuHeader from "../components/merchantPage/MenuHeader";
import Navbar from "../components/merchantPage/MenuNavbar";

function Home() {
    const toggleSidebar = useSidebarStore((state) => state.toggleSidebar);
    return (
        <div>
            {/*<Header onLeftClick={toggleSidebar}/>
            <Header onLeftClick={toggleSidebar} className="fixed top-0"/>
            <div className="py-5"></div>
            <Sidebar></Sidebar>
            <Searchbar></Searchbar>
            <MerchantList></MerchantList>*/}
            <MenuHeader></MenuHeader>
            <Navbar></Navbar>
        </div>
    );
}

export default Home;

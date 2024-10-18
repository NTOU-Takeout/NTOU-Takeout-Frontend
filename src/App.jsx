import Header from './components/Header';
import Merchant from './components/Merchant';
import useSidebarStore from './stores/sidebarStore';
import Sidebar from './components/Sidebar';
import Searchbar from './components/Searchbar';
import MenuSectionPage from './components/MenuSectionPage';
import MerchantList from './components/MerchantList';
import MenuHeader from './components/merchantPage/MenuHeader';
import MenuNavbar from './components/merchantPage/MenuNavbar';
import MenuItem from './components/merchantPage/MenuItem';

function App() {
    const toggleSidebar= useSidebarStore((state) => state.toggleSidebar);
    const isOpen=useSidebarStore((state)=>state.isOpen);
    const closeSidebar=useSidebarStore((state)=>state.closeSidebar);

    return (
        <div 
        >
            {/* <Header
                onLeftClick={toggleSidebar}
            />
            <Sidebar></Sidebar>
            <Searchbar></Searchbar>
            
            <MenuSectionPage></MenuSectionPage>
            
            
            {/*<MenuHeader></MenuHeader>
            <MerchantList></MerchantList>
            <Searchbar></Searchbar> */}
            <MenuHeader></MenuHeader>
            <MenuNavbar></MenuNavbar>
            <MenuSectionPage></MenuSectionPage>
        </div>
    )
}
export default App;
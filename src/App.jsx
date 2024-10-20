import Header from './components/Header';
import useSidebarStore from './stores/sidebarStore';
import Sidebar from './components/Sidebar';
import Searchbar from './components/Searchbar';
import MenuSectionPage from './components/merchantPage/MenuSectionPage';
import MerchantList from './components/MerchantList';
import MenuHeader from './components/merchantPage/MenuHeader';
import MenuNavbar from './components/merchantPage/MenuNavbar';

function App() {
    const toggleSidebar= useSidebarStore((state) => state.toggleSidebar);
    const isOpen=useSidebarStore((state)=>state.isOpen);
    const closeSidebar=useSidebarStore((state)=>state.closeSidebar);

    return (
        <div 
        >
             {/*<Header onLeftClick={toggleSidebar}/>
            <Sidebar></Sidebar>
            <Searchbar></Searchbar>
            <MerchantList></MerchantList>*/}

            <MenuHeader></MenuHeader>
            <MenuNavbar></MenuNavbar>
            <MenuSectionPage></MenuSectionPage>


        </div>
    )
}
export default App;
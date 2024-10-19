import Header from './components/Header';
import useSidebarStore from './stores/sidebarStore';
import Sidebar from './components/Sidebar';
import Searchbar from './components/Searchbar';
import MerchantList from './components/MerchantList';


function App() {
    const toggleSidebar= useSidebarStore((state) => state.toggleSidebar);


    return (
        <div>
            <Header onLeftClick={toggleSidebar}/>
            <Sidebar></Sidebar>
            <Searchbar></Searchbar>
            {/*<MenuHeader></MenuHeader>*/}
            <MerchantList></MerchantList>
        </div>
    )
}
export default App;
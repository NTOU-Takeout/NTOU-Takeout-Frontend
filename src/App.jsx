import Header from './components/Header';
import Merchant from './components/Merchant';
import useSidebarStore from './stores/sidebarStore';
import Sidebar from './components/Sidebar';
import Searchbar from './components/Searchbar';
import MenuHeader from './components/merchantPage/MenuHeader';

function App() {
    const toggleSidebar= useSidebarStore((state) => state.toggleSidebar);
    const isOpen=useSidebarStore((state)=>state.isOpen);
    const closeSidebar=useSidebarStore((state)=>state.closeSidebar);

    return (
        <div 
        >
            <Header
                onLeftClick={toggleSidebar}
            />
            <Sidebar></Sidebar>
            <Searchbar></Searchbar>
            <MenuHeader></MenuHeader> 
            
        </div>
    )
}
export default App;

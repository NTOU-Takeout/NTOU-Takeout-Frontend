import Header from '../components/Header';
import useSidebarStore from '../stores/sidebarStore';
import Sidebar from '../components/Sidebar';
import Searchbar from '../components/Searchbar';
import MerchantList from '../components/MerchantList';


function Home(){
    const toggleSidebar= useSidebarStore((state) => state.toggleSidebar);
    return (
        <div>
            <Header onLeftClick={toggleSidebar}/>
            <Sidebar></Sidebar>
            <Searchbar></Searchbar>
            <MerchantList></MerchantList>
        </div>
    )
}

export default Home;
import Header from './components/Header';
import Merchant from './components/Merchant';
import useSidebarStore from './stores/sidebarStore';
import Sidebar from './components/Sidebar';
function App() {
    const toggleSidebar= useSidebarStore((state) => state.toggleSidebar);
    const isOpen=useSidebarStore((state)=>state.isOpen);
    const closeSidebar=useSidebarStore((state)=>state.closeSidebar);
    const handleContentClick = () => {
        if (isOpen) {
            closeSidebar();
        }
    };
    return (
        <div 
            className={`relative min-h-screen transition-all duration-300  ${
                isOpen ? 'bg-slate-950 bg-opacity-20' : ''
            }`}
            onClick={handleContentClick}
        >
            <Header
                onLeftClick={toggleSidebar}
            />
            <Sidebar></Sidebar>
            {/* <Merchant 
                id={0}
                name="海洋大學店" 
                distance={1.6} 
                costDownLimit={98} 
                costUpLimit={123} 
                starRate={4.8} 
                starNumber={71} 
                >
            </Merchant>
            <Merchant 
                id={1}
                name="海" 
                distance={2.5} 
                costDownLimit={12} 
                costUpLimit={124} 
                starRate={3.2} 
                starNumber={12} >
            </Merchant> */}
        </div>
    )
}

export default App;

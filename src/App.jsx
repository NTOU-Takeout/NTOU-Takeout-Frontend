// src/pages/App.jsx
import React from 'react';
import Sidebar from './components/Sidebar';
import useSidebarStore from './stores/sidebarStore';

function App() {
    const { toggleSidebar, isOpen, closeSidebar } = useSidebarStore();

    const handleContentClick = () => {
        if (isOpen) {
            closeSidebar();
        }
    };

    return (
        <div 
            className={`relative min-h-screen transition-all duration-300 ${
                isOpen ? 'bg-slate-950 bg-opacity-20' : ''
            }`}
            onClick={handleContentClick}
        >
            <button
                className="m-4 p-2 bg-blue-500 text-white rounded"
                onClick={toggleSidebar}
            >
                打開側欄
            </button>
            <Sidebar />
        </div>
    );
}

export default App;

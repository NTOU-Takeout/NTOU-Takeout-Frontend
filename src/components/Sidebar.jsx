// src/components/Sidebar.jsx
import React from 'react';
import useSidebarStore from '../stores/sidebarStore';
import SidebarButton from './SidebarButton';
import {
  faSignInAlt,
  faHistory,
  faHeart,
  faBug,
  faLanguage,
  faCog,
  faSignOutAlt,
  faStore,
  faUser,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';

const Sidebar = () => {
  const { isOpen, closeSidebar } = useSidebarStore();
  
  const handleSidebarClick = (e,logText) => {
    console.log(logText);
    e.stopPropagation();
  };

  return (
    <>
        <div
            className={`fixed inset-y-0 left-0 bg-white w-4/5 max-w-md transform ${
            isOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform duration-300 z-50`}
        >
            <div>
                <div className="p-4">
                <SidebarButton
                    text="登入"
                    textStyle={"text-2xl px-2"}
                    icon={faUser}
                    iconSize="2xl"
                    iconColor={"#053766"}
                    onClick={(e) => handleSidebarClick(e,"登入")}
                    style={"py-8 "}
                />
                <SidebarButton
                    text="商家瀏覽紀錄"
                    icon={faStore}
                    iconSize="lg"
                    iconColor={"#053766"}
                    onClick={(e) => handleSidebarClick(e,"商家瀏覽紀錄")}
                    style={"px-4 py-4"}
                />
                <SidebarButton
                    text="歷史訂單紀錄"
                    icon={faHistory}
                    iconSize="lg"
                    iconColor={"#053766"}
                    onClick={(e) => handleSidebarClick(e,"歷史訂單紀錄")}
                    style={"px-4 py-4"}
                />
                <SidebarButton
                    text="收藏店家"
                    icon={faHeart}
                    iconSize="lg"
                    iconColor={"#053766"}
                    onClick={(e) => handleSidebarClick(e,"收藏店家")}
                    style={"px-4 py-4"}
                />
                <SidebarButton
                    text="問題回報"
                    icon={faCircleQuestion}
                    iconSize="lg"
                    iconColor={"#606162"}
                    onClick={(e) => handleSidebarClick(e,"問題回報")}
                    style={"pt-8 pb-4 px-4"}
                />
                <SidebarButton
                    text="語言"
                    icon={faLanguage}
                    iconSize="lg"
                    iconColor={"#606162"}
                    onClick={(e) => handleSidebarClick(e,"語言")}
                    style={"px-4 py-4"}
                />
                <SidebarButton
                    text="設定"
                    icon={faCog}
                    iconSize="lg"
                    iconColor={"#606162"}
                    onClick={(e) => handleSidebarClick(e,"設定")}
                    style={"px-4 py-4"}
                />
                <SidebarButton
                    text="登出"
                    icon={faSignOutAlt}
                    iconSize="lg"
                    iconColor={"#606162"}
                    onClick={(e) => handleSidebarClick(e,"登出")}
                    style={"px-4 py-4"}
                />
                </div>
            </div>
        </div>
    </>
  );
};

export default Sidebar;

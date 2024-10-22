import { useParams } from 'react-router-dom';
import MenuHeader from '../components/merchantPage/MenuHeader';
import MenuNavbar from '../components/merchantPage/MenuNavbar';
import MenuSectionPage from '../components/merchantPage/MenuSectionPage';
import MenuDishDetail from '../components/merchantPage/MenuDishDetail';
import React, { useRef, useState, useEffect } from 'react';

function Menu() {
    const { merchantId } = useParams();
    const sectionRefs = useRef([]);
    const [isNavbarFixed, setIsNavbarFixed] = useState(false);  // 狀態控制 navbar 是否固定

    // 處理滾動到對應的部分
    const handleScrollToSection = (index) => {
        sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
    };

    // 監控滾動事件，更新 isNavbarFixed 狀態
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            if (scrollPosition > 200) {  // 設定一個閾值，例如200px
                setIsNavbarFixed(true);
            } else {
                setIsNavbarFixed(false);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div>
            <MenuHeader />
            {/* 傳遞 isNavbarFixed 狀態來控制樣式 */}
            <MenuNavbar onNavClick={handleScrollToSection} isNavbarFixed={isNavbarFixed} />
            <MenuSectionPage sectionRefs={sectionRefs} />
        </div>
    );
}

export default Menu;

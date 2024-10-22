import { useParams } from 'react-router-dom';
import React, { useRef, useState, useEffect } from 'react';
import MenuHeader from '../components/merchantPage/MenuHeader';
import MenuNavbar from '../components/merchantPage/MenuNavbar';
import MenuSectionPage from '../components/merchantPage/MenuSectionPage';

function Menu() {
    const { merchantId } = useParams();
    const sectionRefs = useRef([]);
    const [isNavbarFixed, setIsNavbarFixed] = useState(false);
    const [isAnimating, setIsAnimating] = useState(true);

    const handleScrollToSection = (index) => {
        sectionRefs.current[index]?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;
            setIsNavbarFixed(scrollPosition > 200);
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(false); // 取消動畫
        }, 100); // 設定持續時間與 CSS 動畫一致

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={`transition-transform duration-100 ${isAnimating ? 'translate-x-full' : 'translate-x-0'}`}>
            <MenuHeader merchantId={merchantId} />  {/* 傳遞 merchantId */}
            <MenuNavbar onNavClick={handleScrollToSection} isNavbarFixed={isNavbarFixed} />
            <MenuSectionPage sectionRefs={sectionRefs} />
        </div>
    );
}

export default Menu;

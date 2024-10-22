import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const location = useLocation(); // 獲取當前路徑

    useEffect(() => {
        console.log(`Navigated to: ${location.pathname}`); // 輸出當前路徑
        window.scrollTo(0, 0); // 每次路由變化時滾動到頂部
    }, [location]); // 監聽 location 的變化

    return null; // 該組件不需要渲染任何內容
};

export default ScrollToTop;

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import useLoadingStore from '../../stores/loadingStore';

const MenuHeader = ({
    title = '海洋大學店',          // 預設標題
    distance = 100,               // 預設距離
    averageCost = 800,           // 預設平均消費
    rating = 4.2,                // 預設評分
    reviews = 100,               // 預設評價數
    informationLink = 'https://google.com', // 預設資訊連結
    bannerLink = 'https://i.imgur.com/S1OPVB6.jpeg', // 預設橫幅連結
}) => {
    
    // get state from store
    const { isLoading, setIsLoading } = useLoadingStore();

    // loading screen test, test 500ms loading time
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [setIsLoading]);

    if (isLoading) {
        return (
            <div className="loading-screen">
                <p>Loading...</p>
            </div>
        );
    }
    
    return (
        <header className="menu-header">
            <div
                className="banner bg-cover bg-center h-64"
                style={{ backgroundImage: `url(${bannerLink})` }}
            >
                <div className="return-btn">
                    <FontAwesomeIcon icon={faArrowLeft} />
                </div>
                <div className="share-btn">
                    <FontAwesomeIcon icon={faShareNodes} />
                </div>
            </div>
        </header>
    );
};

MenuHeader.propTypes = {
    title: PropTypes.string,
    distance: PropTypes.number,
    averageCost: PropTypes.number,
    rating: PropTypes.number,
    reviews: PropTypes.number,
    informationLink: PropTypes.string,
    bannerLink: PropTypes.string,
};

export default MenuHeader;

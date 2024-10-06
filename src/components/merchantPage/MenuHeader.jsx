import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShareNodes, faStar, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import useLoadingStore from '../../stores/loadingStore';

const MenuHeader = ({
    title = '海洋大學店',          // default title
    distance = 100,               //  default distance
    averageCost = 800,           // default average cost
    rating = 4.2,                // default rating
    reviews = 100,               // default reviews
    informationLink = 'https://google.com', // defaults information link
    bannerLink = 'https://i.imgur.com/S1OPVB6.jpeg', // default banner link
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
                className="banner bg-cover bg-center h-64 relative filter blur-sm"
                style={{ backgroundImage: `url(${bannerLink})` }}
            >
            </div>
            <div className="pt-1 pb-1 pl-2 pr-2 return-btn absolute top-10 left-4 transform -translate-y-1/2 bg-white/60 rounded-full">
                <FontAwesomeIcon icon={faArrowLeft} className="text-slate-800" />
            </div>
            <div className="pt-1 pb-1 pl-2 pr-2 share-btn absolute top-10 right-4 transform -translate-y-1/2 bg-white/60 rounded-full">
                <FontAwesomeIcon icon={faShareNodes} className="text-slate-800" />
            </div>
            {/* 商家資訊部分 */}
            <div className="bg-white rounded-t-2xl p-4 relative -top-24 left-0 right-0 z-10">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold">商家名稱</h2>
                        <p className="text-gray-400 text-sm">距離您約...公里</p>
                        <p className="text-green-600 text-sm mt-1">平均花費約100~200</p>
                    </div>
                    <div className="flex items-center">
                        <span className="text-xl font-semibold">4.8</span>
                        <span className="text-gray-400 ml-1">(100+)</span>
                        <FontAwesomeIcon icon={faStar} className="text-yellow-400 ml-2" />
                    </div>
                    <div className="absolute top-4 right-4 text-xl text-gray-500">
                        <FontAwesomeIcon icon={faInfoCircle} />
                    </div>
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

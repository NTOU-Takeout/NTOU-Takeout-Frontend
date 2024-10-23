import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faShareNodes, faStar, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import useLoadingStore from '../../stores/loadingStore';
import MenuInfo from './MenuInfo';





const MenuHeader = ({
    title = '海洋大學店',          // default title
    distance = 100,               // default distance
    averageCost = 800,           // default average cost
    rating = 4.2,                // default rating
    reviews = 100,               // default reviews
    informationLink = 'https://google.com', // defaults information link
    bannerLink = 'https://i.imgur.com/S1OPVB6.jpeg', // default banner link
    merchantId,                  // 接收 merchantId
}) => {
    
    const { isLoading, setIsLoading } = useLoadingStore();
    const id = merchantId;

    const [showMenuInfo, setShowMenuInfo] = useState(false);
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

    const distanceList = [12, 32, 21, 27, 9, 47];
    function sumStringDigits(str) {
        return str
            .split('') // 將字符串分割成字符數組
            .map(char => {
                // 檢查是否為數字，若是則轉為數字，否則轉為 ASCII 值
                return isNaN(char) ? char.charCodeAt(0) : Number(char);
            })
            .reduce((acc, curr) => acc + curr, 0); // 將數字和 ASCII 值相加
    }

    return (
        <header className="relative top-0 left-0 w-full menu-header">
            <div
                className="banner bg-cover bg-center h-64 relative before:content-[''] before:absolute before:w-full before:h-full before:backdrop-blur-sm"
                style={{ backgroundImage: `url(${bannerLink})` }}
            >
            </div>
            <Link to={`/`}>
                <div className="pt-1 pb-1 pl-2 pr-2 return-btn absolute top-10 left-4 transform -translate-y-1/2 bg-white/60 rounded-full">
                    <FontAwesomeIcon icon={faArrowLeft} className="text-slate-800" />
                </div>
            </Link>
            <div className="pt-1 pb-1 pl-2 pr-2 share-btn absolute top-10 right-4 transform -translate-y-1/2 bg-white/60 rounded-full">
                <FontAwesomeIcon icon={faShareNodes} className="text-slate-800" />
            </div>
            {/* Store information */}
            <div className="bg-white rounded-t-2xl p-4 relative -top-8 left-0 right-0 z-10 font-notoTC">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold">{title}</h2>
                        <p className="text-gray-400 text-sm">距離您約{distanceList[Math.floor(sumStringDigits(id) % 6)]}公里</p>
                        <p className="text-green-600 text-sm mt-1">平均花費約{averageCost}元</p>
                    </div>
                    <Link to={`/menu/${merchantId}/review`}>  {/* 使用 merchantId 傳遞到 Review 頁面 */}
                        <div className="flex items-center mt-10">
                            <FontAwesomeIcon icon={faStar} className="text-yellow-400 ml-2 mt-1" />
                            <span className="text-xl font-semibold">&nbsp;{rating}</span>
                            <span className="text-gray-400 ml-1 mt-0.5">
                                (<span className='border-b border-gray-400'>{reviews.length}+</span>)
                            </span>
                        </div>
                    </Link>
                    <div className="absolute top-4 right-4 text-xl text-gray-500">
                        <FontAwesomeIcon 
                            icon={faInfoCircle} 
                            onClick={() => setShowMenuInfo(true)} 
                            className="cursor-pointer"
                        />
                    </div>
                </div>
            </div>
            {showMenuInfo && <MenuInfo onClose={() => setShowMenuInfo(false)} />}
        </header>
    );
};

MenuHeader.propTypes = {
    title: PropTypes.string,
    distance: PropTypes.number,
    averageCost: PropTypes.number,
    rating: PropTypes.number,
    reviews: PropTypes.array,
    informationLink: PropTypes.string,
    bannerLink: PropTypes.string,
    merchantId: PropTypes.string.isRequired, // 確保 merchantId 是必需的
};

export default MenuHeader;

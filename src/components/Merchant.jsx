import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as hollowFaBookmark } from '@fortawesome/free-regular-svg-icons/faBookmark';
import { faBookmark as solidFaBookmark } from '@fortawesome/free-solid-svg-icons/faBookmark';
import { faStar as solidStar } from '@fortawesome/free-solid-svg-icons/faStar';
import useBookmarkStore from '../stores/bookmarkStore'; 

const Merchant = ( {id,name, distance, costDownLimit, costUpLimit, starRate, starNumber } ) => {
    const {isMarked, setIsMarked}=useBookmarkStore();
    const handleBookmarkClick=()=>{
        setIsMarked(!isMarked);
    };

    return (
        <div className="-z-30 relative w-[361px] h-[241px] m-2 bg-white border-2
                     border-gray-300 rounded-2xl overflow-hidden">
            <img src="https://picsum.photos/200/300" alt="Store Image" 
            className="relative w-full h-[65%] object-cover" />
            <div className="absolute w-[24px] h-[24px] right-[5%] top-[13px]" onClick={handleBookmarkClick}>
                <FontAwesomeIcon icon={isMarked ?  solidFaBookmark : hollowFaBookmark}
                style={{color: isMarked ? '#8E8686' : '#8E8686'}} />
            </div>
            <div className="box-border absolute w-[361px] h-[87px] left-0 top-[154px] border-t-2 border-gray-300">
                <div className="absolute h-[22px] left-5  top-4  text-black font-bold text-lg leading-5">{name}</div>
                <div className="absolute h-[12px] left-5  top-[39px] text-gray-500 font-semibold text-xs leading-[12px]">距離您約 {distance} 公里</div>
                <div className="absolute h-[12px] left-5  top-[61px] text-green-700 font-bold text-xs leading-[12px]">平均花費約 {costDownLimit}~{costUpLimit} 元</div>
                <div className="absolute w-[75px] h-[20px] left-[271px] top-[57px] flex items-center">
                    <div className="flex items-center">
                        <FontAwesomeIcon 
                            icon={solidStar} 
                            style={{color: "#FFD43B",}}
                            className="h-[0.80em] w-[0.80em] mr-[1px]"
                        />
                        <span className="font-medium text-[13px] leading-[15px] text-gray-600 mb-[-1px]">{starRate} ({starNumber})</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Merchant;

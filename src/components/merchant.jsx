import React,{ useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as hollowFaBookmark } from '@fortawesome/free-regular-svg-icons/faBookmark';//hollow
import { faBookmark as solidFaBookmark } from '@fortawesome/free-solid-svg-icons/faBookmark';
import { faStar as hollowStar } from '@fortawesome/free-regular-svg-icons';
import useBookmarkStore from '../stores/bookmarkStore'; // import state store
import '../styles/merchant.css'
const Merchant = ( {name, distance, costDownLimit, costUpLimit, starRate, starNumber } ) => {
    const {isMarking, setIsMarking}=useBookmarkStore();
    name = '海洋大學店'
    distance = '8'
    costDownLimit = '100'
    costUpLimit = '200'
    starRate = '4.8'
    starNumber = '100'
    const handleBookmarkClick=()=>{
        setIsMarking(!isMarking);
    };


    return (
        <div className="store-card">
            <img src="https://picsum.photos/200/300" alt="Store Image" className="store-image" />
            <div className="bookmark-icon" onClick={handleBookmarkClick}>
                <FontAwesomeIcon icon={isMarking ?  solidFaBookmark : hollowFaBookmark}
                style={{color: isMarking ? '#8E8686' : '#8E8686'}} />
            </div>
            <div className="store-details">
                <div className="store-name">{name}</div>
                <div className="distance-text">距離您約{distance}公里</div>
                <div className="price-text">平均花費約{costDownLimit}~{costUpLimit}</div>
                <div className="rating-group">
                    <div className="star-rating">
                        <FontAwesomeIcon 
                            icon={hollowStar} 
                            style={{ height: '0.80em', width: '0.80em', marginRight: '1px' }} // Adjust size
                        />
                        <span className="rating-text">{starRate} ({starNumber})</span>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default Merchant;

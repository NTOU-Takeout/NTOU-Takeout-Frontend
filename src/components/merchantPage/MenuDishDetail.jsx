import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import OptionCard from './dishOptions/OptionCard';
import CartOption from './dishOptions/CartOption';
import useDishStore from '../../stores/dishDetailStore.js';

const DishDetail = ({ 
    name = "原味飯糰", 
    price = 0, 
    imageUrl = "https://picsum.photos/400/300", 
    description = "【L】總糖量61 總熱量375 ｜ 咖啡因含量：綠(100mg以下) ｜ 醇雅「錫蘭紅茶」結合優質「崙背鮮乳」／「瑞穗鮮乳」，茶味、乳香完美交融，口感香醇滑潤。",
    options = [],
    onClose, 
    ...otherProps
}) => { 
    const { selectedSize, quantity, setSelectedSize, setQuantity } = useDishStore();
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        setIsVisible(true); 
        document.body.style.overflow = 'hidden'; // forbid background scroll

        return () => {
            document.body.style.overflow = ''; // restore background scroll
        };
    }, []);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false); // hide the modal
            document.body.style.overflow = ''; // restore background scroll
            if (onClose) onClose(); 
        }, 500); 
    };
    

    return (
        <div className={`fixed z-10 top-0 left-0 right-0 transition-all duration-500 ${isVisible ? 'top-0' : '-top-full'}`}>
            <div className={`bg-white shadow-md overflow-hidden max-h-[100vh] flex flex-col transition-transform duration-500 ${isExiting ? 'translate-y-full none' : 'translate-y-0'}`}>
                {/* 滾動內容容器 */}
                <div className="flex-1 overflow-y-auto">
                    {/* Top image */}
                    <div className="relative h-48 overflow-hidden">
                        <img className="w-full h-full object-cover" src={imageUrl} alt="Dish Image" />
                        <button onClick={handleClose} className="absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                            <FontAwesomeIcon icon={faX} className="text-sm" />
                        </button>
                    </div>

                    {/* Dish info */}
                    <div className="p-4">
                        <h2 className="text-xl font-bold">{name}</h2>
                        <p className="text-lg text-gray-700">${price}</p>
                        <p className="text-sm text-gray-500">{description}</p>

                        {/* Customize options */}
                        {options.map((detail, index) => (
                            <OptionCard 
                                key={index}
                                title={detail.name} 
                                description={detail.description} 
                                options={detail.attributeOptions} 
                                type={detail.type}
                            />
                        ))}
                    </div>
                <div className="py-5"></div>
                </div>
                {/* Add to cart button */}
                <CartOption />
            </div>
        </div>
    );
};

DishDetail.propTypes = {
    name: PropTypes.string,
    price: PropTypes.number,
    imageUrl: PropTypes.string,
    description: PropTypes.string,
    options: PropTypes.array, // 修改為正確的 props
    onClose: PropTypes.func, // 確保 onClose 是一個函數
};

export default DishDetail;

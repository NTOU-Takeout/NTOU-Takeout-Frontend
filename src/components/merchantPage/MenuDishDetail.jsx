import React from 'react';
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
    optionsTitle = ['飯糰大小', '飯糰重量', '飯糰體積'],
    optionsDescription = ['請選一項', '請選一項', '請選一項'],
    optionsSize = [['大份', '中份', '小份'], ['大份', '中份', '小份'], ['大份', '中份', '小份']],
}) => {
    const { selectedSize, quantity, setSelectedSize, setQuantity } = useDishStore();

    return (
        <div className="flex items-end justify-center mt-8 font-notoTC">
            <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
                {/* Top image */}
                <div className="relative">
                    <img className="w-full h-48 object-cover" src={imageUrl} alt="Dish Image" />
                    <button className="absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md">
                        <FontAwesomeIcon icon={faX} className="text-sm" />
                    </button>
                </div>

                {/* Dish info */}
                <div className="p-4">
                    <h2 className="text-xl font-bold">{name}</h2>
                    <p className="text-lg text-gray-700">${price}</p>
                    <p className="text-sm text-gray-500">{description}</p>

                    {/* Customize options */}
                    {optionsTitle.map((title, index) => (
                        <OptionCard 
                            key={index}
                            title={title} 
                            description={optionsDescription[index]} 
                            options={optionsSize[index]} 
                        />
                    ))}
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
    optionsTitle: PropTypes.arrayOf(PropTypes.string),
    optionsDescription: PropTypes.arrayOf(PropTypes.string),
    optionsSize: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};

export default DishDetail;

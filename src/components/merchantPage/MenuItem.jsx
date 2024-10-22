import React from 'react';
import PropTypes from 'prop-types';

const MenuItemCard = ({
    itemName = '原味飯糰',          // default itemName
    price = 30,               // default price
    description = '綠聽吧之位子宜寧，各話又，正見跳免還「沒古六更是三肖」。', // default description
    onClick,                 // 接收 onClick 函數
    item,
    ...otherProps
}) => {
  return (
    <div className="menu-item block cursor-pointer" onClick={() => onClick(item)}>
      <div className="flex m-8 max-w-xl bg-white text-white rounded-lg overflow-hidden shadow-lg font-notoTC">
        {/* Image */}
        <div className="w-1/2">
          <img 
            src="https://picsum.photos/200/150" 
            alt="Dish Image" 
            className="object-cover h-full"
          />
        </div>

        {/* Content */}
        <div className="w-2/3 p-4">
          {/* Title */}
          <h2 className="text-2xl font-bold mb-2 text-black">{itemName}</h2>

          {/* Price */}
          <p className="text-xl text-gray-800">${price}</p>

          {/* Description */}
          <p className="text-sm text-gray-600 mt-2">
            {description}
          </p>

          {/* Add button */}
          <div className="flex justify-end mt-4">
            <button className="bg-orange-500 text-white rounded-full w-10 h-10 flex items-center justify-center">
              <span className="text-2xl font-bold mb-1">+</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

MenuItemCard.propTypes = {
    itemName: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
    onClick: PropTypes.func.isRequired, // 確保 onClick 是必需的
    item: PropTypes.object.isRequired,    // 確保 item 是必需的
};

export default MenuItemCard;

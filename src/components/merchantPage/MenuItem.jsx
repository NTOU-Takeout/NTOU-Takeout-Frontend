import React from "react";
import PropTypes from "prop-types";

const MenuItemCard = ({
    item, // 接收整個 item 物件
    onClick,
    imageUrl, // 接收 onClick 函數
    ...otherProps
}) => {
    const {
        name = "原味飯糰", // 預設 itemName
        price = 30, // 預設 price
        description = "綠聽吧之位子宜寧，各話又，正見跳免還「沒古六更是三肖」。", // 預設圖片
    } = item; // 從 item 中解構

    return (
        <div
            className="font-notoTC menu-item block cursor-pointer"
            onClick={() => onClick(item)}
        >
            <div className="flex m-8 max-w-xl bg-white text-white rounded-lg overflow-hidden shadow-lg font-notoTC">
                {/* Image */}
                <div className="w-64 overflow-hidden aspect-[5/3]">
                    {" "}
                    {/* 使用 aspect-ratio */}
                    <img
                        src={imageUrl}
                        alt="Dish Image"
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Content */}
                <div className="w-2/3 p-4">
                    {/* Title */}
                    <h2 className="text-2xl font-bold mb-2 text-black">
                        {name}
                    </h2>

                    {/* Price */}
                    <p className="text-xl text-gray-800">${price}</p>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mt-2">{description}</p>

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
    onClick: PropTypes.func.isRequired, // 確保 onClick 是必需的
    item: PropTypes.shape({
        // 確保 item 是物件並包含必要屬性
        name: PropTypes.string,
        price: PropTypes.number,
        description: PropTypes.string,
        imageUrl: PropTypes.string, // 可選的圖片 URL
    }).isRequired,
};

export default MenuItemCard;

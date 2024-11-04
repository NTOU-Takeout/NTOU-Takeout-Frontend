import PropTypes from "prop-types";
import React, { useState } from 'react';
import useDishStore from "../../stores/dishDetailStore";

const CartItemCard = ({dishItem}) => {
    const {
        name,
        price,
        picture: imageUrl,
        dishAttributes: options,
    } = dishItem;

    const { quantity, setQuantity } = useDishStore();
    const formattedOptions = options ? options.join(', ') : '';

    return (
        <div className="relative flex items-center border rounded-lg p-4 shadow-md w-96">
        <img
            src={imageUrl}
            alt="Product"
            className="w-20 h-20 object-cover rounded-lg"
        />
        <div className="ml-4 flex-grow">
            <h2 className="text-lg font-semibold">{name}</h2>
            <p className="text-sm text-gray-500">{formattedOptions}</p>
            <p className="text-xl mt-2">$ {Math.floor(quantity*price)}</p>
        </div>
        <div className="absolute bottom-[15px] right-[15px] flex items-end border border-gray-300 rounded-md">
            <button
                    onClick={() => setQuantity(quantity - 1)}
                    disabled={quantity <= 0}
                className="px-2 py-0 text-lg rounded-l-md"
            >
            -
            </button>
            <span className="px-4 py-0.5">{quantity}</span>
            <button
                onClick={() => setQuantity(quantity + 1)}
                className="  px-2 py-0 text-lg rounded-r-md"
            >
            +
            </button>
        </div>
        </div>
    );
};

CartItemCard.propTypes = {
    dishItem: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        picture: PropTypes.string,
        dishAttributes: PropTypes.string
    }).isRequired
};

export default CartItemCard;

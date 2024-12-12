import { useState } from "react";
import PropTypes from "prop-types";
import useDishStore from "../../../stores/dishDetailStore.js";

const QuantitySelector = ({ dishId }) => {
    const [quantity, setQuantity] = useState(1);

    return (
        <div className="font-notoTC flex flex-row items-center justify-center bg-orange-500 rounded-full px-2 py-1 shadow-md border border-orange-700 mr-4 ">
            <button
                className="pb-1 bg-orange-500 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-3xl mb-1"
                onClick={() => setQuantity(prev => prev - 1)}
                disabled={quantity <= 1}
            >
                -
            </button>
            <span className="pb-1 w-8 mx-2 text-center text-white font-bold">{quantity}</span>
            <button
                className="bg-orange-500 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-xl"
                onClick={() => setQuantity(prev => prev + 1)}
                disabled={quantity >= 25}
            >
                +
            </button>
        </div>
    );
};

QuantitySelector.propTypes = {
    dishId: PropTypes.string.isRequired,
};

export default QuantitySelector;

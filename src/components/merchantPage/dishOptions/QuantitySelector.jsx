import PropTypes from "prop-types";
import useDishStore from "../../../stores/dishDetailStore.js";

const QuantitySelector = ({ dishId }) => {
    const { dishes, setQuantity } = useDishStore();
    const quantity = dishes[dishId]?.quantity || 0;

    return (
        <div className="font-notoTC flex items-center bg-orange-500 rounded-full px-2 py-1 shadow-md border border-orange-700 mr-4">
            <button
                className="pb-1 bg-orange-500 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-3xl mb-1"
                onClick={() => setQuantity(dishId, quantity - 1)}
                disabled={quantity <= 0}
            >
                -
            </button>
            <span className="pb-1 mx-4 text-white font-bold">{quantity}</span>
            <button
                className="bg-orange-500 text-white font-bold rounded-full w-6 h-6 flex items-center justify-center text-xl"
                onClick={() => setQuantity(dishId, quantity + 1)}
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

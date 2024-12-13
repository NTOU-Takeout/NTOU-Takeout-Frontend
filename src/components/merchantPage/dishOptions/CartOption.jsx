import PropTypes from "prop-types";
import AddToCart from "./AddToCart";
import QuantitySelector from "./QuantitySelector";

const CartOption = ({ dishId, onRequiredMissing }) => {

    return (
        <div className="flex jsutify-item-between fixed z-20 bottom-8 right-24">
            <QuantitySelector dishId={dishId} />
            <AddToCart dishId={dishId} onRequiredMissing={onRequiredMissing} ></AddToCart>
        </div>
    );
};

CartOption.propTypes = {
    dishId: PropTypes.string.isRequired,
    onRequiredMissing: PropTypes.func.isRequired,
};

export default CartOption;

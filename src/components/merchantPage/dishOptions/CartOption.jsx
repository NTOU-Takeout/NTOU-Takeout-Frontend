import AddToCart from "./AddToCart";
import QuantitySelector from "./QuantitySelector";

const CartOption = (dishId) => {
    return (
        <div className="flex jsutify-item-between fixed z-20 bottom-8 right-24">
            <QuantitySelector dishId={dishId} />
            <AddToCart></AddToCart>
        </div>
    );
};

export default CartOption;

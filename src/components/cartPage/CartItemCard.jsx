import PropTypes from "prop-types";
import useDishStore from "../../stores/dishDetailStore";

const CartItemCard = ({ dishId, dishItem }) => {
    const { name, price, picture: imageUrl, dishAttributes: options } = dishItem;

    const { dishes, updateDish, removeDish } = useDishStore();

    const dishState = dishes[dishId] || {};

    const quantity = dishState.quantity || 1;

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
    
        if (newQuantity < 1) {
            // if quantity < 1, remove dish
            removeDish(dishId);
        } else {
            updateDish(dishId, { quantity: newQuantity });
        }
    };
    

    const formattedOptions = options ? options.join(", ") : "";
    const extraCost = dishItem.extraCost || 0;

    return (
        <div className="relative flex items-center rounded-lg p-4 w-screen">
            <img
                src={imageUrl}
                alt="Product"
                className="max-w-20 h-20 object-cover rounded-lg"
            />
            <div className="ml-4 flex-grow">
                <h2 className="text-lg font-semibold">{name}</h2>
                <p className="text-sm text-gray-500">
                    {formattedOptions} (額外加價 $ {extraCost})
                </p>
                <p className="text-xl mt-2">
                    $ {Math.floor(quantity * (price + extraCost))}
                </p>
            </div>
            <div className="absolute bottom-[15px] right-[15px] flex items-end border border-gray-300 rounded-md">
                <button
                    onClick={() => handleQuantityChange(-1)}
                    className="px-2 py-0 text-lg rounded-l-md"
                >
                    -
                </button>
                <span className="px-4 py-0.5">{quantity}</span>
                <button
                    onClick={() => handleQuantityChange(1)}
                    className="px-2 py-0 text-lg rounded-r-md"
                >
                    +
                </button>
            </div>
        </div>
    );
};

CartItemCard.propTypes = {
    dishId: PropTypes.string.isRequired,
    dishItem: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        picture: PropTypes.string,
        dishAttributes: PropTypes.arrayOf(PropTypes.string),
        extraCost: PropTypes.number,
    }).isRequired,
};

export default CartItemCard;

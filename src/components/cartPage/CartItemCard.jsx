import PropTypes, { object, string } from "prop-types";
import useCartStore from "../../stores/cartStore";
const CartItemCard = ({ dishData, imageUrl }) => {
    const { updateQuantity, removeDish } = useCartStore();
    const {
        dishId,
        dishName,
        price,
        quantity,
        chosenAttributes,
        note
    } = dishData;


    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity < 1) {
            removeDish(dishId);
        } else {
            updateQuantity(dishId, newQuantity);
        }
    };

    const formattedAttributes = chosenAttributes?.length
        ? chosenAttributes.map(attr => attr.name).join(", ")
        : "";


    return (
        <div className="relative flex items-center rounded-lg p-4 w-screen min-w-30">
            <img
                src={imageUrl}
                alt={dishName}
                className="max-w-20 h-20 object-cover rounded-lg"
            />
            <div className="ml-4 flex-grow">
                <h2 className="text-lg font-semibold">{dishName}</h2>
                <p className="text-sm text-gray-500">
                    {formattedAttributes} ( + $ {111})
                </p>
                <p className="text-xl mt-2">
                    $ {Math.floor(quantity * (price + 111))}
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
    dishData: PropTypes.shape({
        dishId: PropTypes.string.isRequired,
        dishName: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        quantity: PropTypes.number.isRequired,
        chosenAttributes: PropTypes.arrayOf(PropTypes.shape({
            name: PropTypes.string.isRequired,

        })),
        note: PropTypes.string,
    }).isRequired,
    imageUrl: PropTypes.string.isRequired || PropTypes.object.isRequired,
};

export default CartItemCard;

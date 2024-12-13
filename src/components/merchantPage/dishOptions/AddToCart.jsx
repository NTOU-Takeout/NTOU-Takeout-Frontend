import useDishDetailStore from "../../../stores/dishDetailStore";
import { useCartAddMutation } from "../../../hooks/cart/useCartAddMutation";
import PropTypes from "prop-types";
const AddToCart = ({ dishId, onRequiredMissing, onClose }) => {


    const dishes = useDishDetailStore((state) => state.dishes);
    const allDishAttributes = useDishDetailStore((state) => state.allDishAttributes);
    const { postCartAsync } = useCartAddMutation();
    const handleAddToCart = async () => {
        const dishDetail = dishes[dishId];
        if (!dishDetail) { return; }
        const choosenAttributes = dishDetail.chosenAttributes || [];
        const requiredAttributes = allDishAttributes[dishId] || [];

        //check if all required attributes are selected
        for (const attr of requiredAttributes) {
            if (attr.isRequired === true) {
                const matched = choosenAttributes.filter(ca => ca.attributeName === attr.name);
                if (matched.length === 0) {
                    console.debug("Missing Required Attribute:", attr.name);
                    onRequiredMissing(attr.name);
                    return;
                }
            }
        }

        console.debug("Add to Cart:", dishDetail);
        onClose();
        postCartAsync(dishDetail);
    };

    return (
        <div className="flex items-center justify-center">
            <button
                className="shadow-md bg-orange-500 text-white text-md px-6 py-2 rounded-full border border-orange-700 font-notoTC"
                onClick={handleAddToCart}
            >
                加入
            </button>
        </div>
    );
};
AddToCart.propTypes = {
    dishId: PropTypes.string.isRequired,
    onRequiredMissing: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AddToCart;

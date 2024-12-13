import { useState } from "react";
import useDishDetailStore from "../../../stores/dishDetailStore";
import { useCartAddMutation } from "../../../hooks/cart/useCartAddMutation";
import { useSystemContext } from "../../../context/SystemContext";
import ConfirmClearCartModal from "./ConfirmClearCartModal";
import PropTypes from "prop-types";
const AddToCart = ({ dishId, onRequiredMissing, onClose }) => {
    const { cartData } = useSystemContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dishes = useDishDetailStore((state) => state.dishes);
    const allDishAttributes = useDishDetailStore((state) => state.allDishAttributes);
    const { postCartAsync } = useCartAddMutation();

    const handleConfirm = () => {
        // 使用者確定清空購物車並加入此商品
        // clearCartAndAddItem(dishId);
        console.debug("Clear Cart and Add Item:", dishId);
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        console.debug("Cancel Clear Cart");
        setIsModalOpen(false);
    };

    const handleAddToCart = async () => {
        const dishDetail = dishes[dishId];
        if (!dishDetail) { return; }
        if (cartData?.storeId !== dishDetail.storeId) {
            setIsModalOpen(true);
            return;
        }

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
            <ConfirmClearCartModal
                isOpen={isModalOpen}
                onCancel={handleCancel}
                onConfirm={handleConfirm}
            />
        </div>
    );
};
AddToCart.propTypes = {
    dishId: PropTypes.string.isRequired,
    onRequiredMissing: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default AddToCart;

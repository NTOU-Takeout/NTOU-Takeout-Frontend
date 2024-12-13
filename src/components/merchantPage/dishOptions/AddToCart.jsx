import { useEffect, useState } from "react";
import useDishDetailStore from "../../../stores/dishDetailStore";
import { useCartAddMutation } from "../../../hooks/cart/useCartAddMutation";
import { useSystemContext } from "../../../context/SystemContext";
import ConfirmClearCartModal from "./ConfirmClearCartModal";
import { deleteCart } from "../../../api/cart/deleteCart";
import PropTypes from "prop-types";
const AddToCart = ({ dishId, onRequiredMissing, onClose }) => {
    const { cartData } = useSystemContext();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const dishes = useDishDetailStore((state) => state.dishes);
    const allDishAttributes = useDishDetailStore((state) => state.allDishAttributes);
    const { postCartAsync } = useCartAddMutation();
    const [isClearCart, setIsClearCart] = useState(false);
    useEffect(() => {
        if (isClearCart && cartData?.orderedDishes.length === 0) {
            const dishDetail = dishes[dishId];
            console.debug("Add to Cart:", dishDetail);
            postCartAsync(dishDetail);
            onClose();
            setIsClearCart(false);
        }
    }, [isClearCart, cartData, dishId, dishes, onClose, postCartAsync]);
    const handleConfirm = async () => {
        console.debug("Clear Cart and Add Item");
        setIsClearCart(true);
        await deleteCart();
        setIsModalOpen(false);

    };

    const handleCancel = () => {
        console.debug("Cancel Clear Cart");
        setIsModalOpen(false);
    };

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

        if (cartData?.storeId && cartData?.storeId !== dishDetail.storeId) {
            setIsModalOpen(true);
            return;
        }
        console.debug("Add to Cart:", dishDetail);
        postCartAsync(dishDetail);
        onClose();
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

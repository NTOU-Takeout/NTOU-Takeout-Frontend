import PropTypes from "prop-types";
import CartItemCard from "./CartItemCard";
import { useCartQuery } from "../../hooks/cart/useCartQuery";
import { useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useMerchantDataQuery } from "../../hooks/merchant/useMerchantDataQuery";
import { useCategoryListQuery } from "../../hooks/menu/useCategoryListQuery";
import { useCategoryQueries } from "../../hooks/menu/useCategoryQueries";

const CartItemCardList = ({ setTotalSpend }) => {
    // Fetch cart data
    const { cartData, isLoading, isError } = useCartQuery();
    const { merchantData, isLoading: isMerchantLoading } = useMerchantDataQuery(
        cartData?.storeId ?? null
    );
    const menuCategoryList = useCategoryListQuery(merchantData?.menuId ?? null);
    const { categoryData, isQueriesSuccess } = useCategoryQueries(
        menuCategoryList,
        cartData?.storeId
    );

    // Create a map of dishes for easy access
    const dishesMap = useMemo(() => {
        if (!categoryData) return {};

        return categoryData.reduce((acc, category) => {
            category.dishes.forEach(dish => {
                acc[dish.id] = dish;
            });
            return acc;
        }, {});
    }, [categoryData]);

    // Calculate total spend
    useEffect(() => {
        if (cartData?.orderedDishes) {
            const totalSpend = cartData.orderedDishes.reduce((sum, dish) => {
                return sum + (dish.price * dish.quantity);
            }, 0);
            let costs = 0;
            const totalExtraCost = cartData.orderedDishes.reduce((sum, dish) => {
                costs = dish.chosenAttributes.reduce((acc, attr) => acc + attr.extraCost, 0);
                return sum + (costs * dish.quantity);
            }, 0);
            setTotalSpend(totalSpend + totalExtraCost);
        }
    }, [cartData?.orderedDishes, setTotalSpend]);


    if (isLoading || cartData == undefined || isMerchantLoading || !isQueriesSuccess || Object.keys(dishesMap).length === 0) {
        return (
            <div className="flex justify-center items-center mt-4 fa-2x">
                <FontAwesomeIcon icon={faSpinner} spinPulse />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center mt-4 fa-2x">
                購物車資料讀取失敗:(
            </div>
        );
    }

    if (!cartData.orderedDishes || cartData.orderedDishes.length === 0) {
        return (
            <div className="flex justify-center items-center mt-4 fa-2x">
                目前購物車是空的:)
            </div>
        );
    }

    return (
        <div>
            {cartData.orderedDishes.map((dish, _) => (
                <CartItemCard
                    key={_}
                    dishData={dish}
                    imageUrl={dishesMap[dish.dishId]?.picture || {}}
                />
            ))}
        </div>
    );
};

CartItemCardList.propTypes = {
    setTotalSpend: PropTypes.func.isRequired,
};

export default CartItemCardList;

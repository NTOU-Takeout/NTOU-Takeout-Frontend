import { useState, useEffect, useMemo } from "react";
import CartOrderSection from "../components/cartPage/CartOrderSection";
import CartPageHeader from "../components/cartPage/CartPageHeader";
import CartTotalSpend from "../components/cartPage/CartTotalSpend";
import CartItemCardList from "../components/cartPage/CartItemCardList";
import { useCartQuery } from "../hooks/cart/useCartQuery";
import { useMerchantDataQuery } from "../hooks/merchant/useMerchantDataQuery";
import { useCategoryListQuery } from "../hooks/menu/useCategoryListQuery";
import { useCategoryQueries } from "../hooks/menu/useCategoryQueries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
function Cart() {
    // Fetch cart data
    const { cartData, isLoading, isError } = useCartQuery();
    const { merchantData, isLoading: isMerchantLoading } = useMerchantDataQuery(
        cartData?.storeId ?? null
    );
    console.debug("merchantData", merchantData);
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
    const [totalSpend, setTotalSpend] = useState(0);
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
            <div className="flex justify-center items-center mt-28 fa-2x">
                <CartPageHeader />
                <FontAwesomeIcon icon={faSpinner} spinPulse />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex justify-center items-center mt-28 fa-2x">
                <CartPageHeader />
                購物車資料讀取失敗:(
            </div>
        );
    }

    return (
        <div className="mt-3">
            <CartPageHeader></CartPageHeader>
            <CartTotalSpend orderDetail={{
                merchantName: merchantData?.name,
                totalSpend: totalSpend,
            }} />
            <CartItemCardList
                cartData={cartData}
                dishesMap={dishesMap}
            />
            {/* <CartOrderSection orderDetail={{
                totalSpend: order.totalSpend,
                estimateTime: order.estimateTime
            }} /> */}
        </div>
    );
}

export default Cart;

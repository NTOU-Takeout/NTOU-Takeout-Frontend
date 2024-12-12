import { useMemo } from "react";
import CartOrderSection from "../components/cartPage/CartOrderSection";
import CartPageHeader from "../components/cartPage/CartPageHeader";
import CartTotalSpend from "../components/cartPage/CartTotalSpend";
import CartItemCardList from "../components/cartPage/CartItemCardList";
import { useCategoryQueries } from "../hooks/menu/useCategoryQueries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useSystemContext } from "../context/SystemContext";
const Cart = () => {
    const {
        cartData,
        isCartError: isError,
        merchantData,
        isMerchantLoading,
        menuCategoryList,
        totalSpend,
        totalQuantity,
    } = useSystemContext();

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

    if (cartData == undefined || isMerchantLoading || !isQueriesSuccess || Object.keys(dishesMap).length === 0) {
        return (
            <div className="flex justify-center items-center mt-28 fa-2x">
                <CartPageHeader />
                <FontAwesomeIcon icon={faSpinner} spinPulse />
            </div>
        );
    }
    let predictedTime = 10 * totalQuantity;
    if (predictedTime > 150 && predictedTime < 300) {
        predictedTime = Math.floor(predictedTime * 0.7);
    } else if (predictedTime >= 300) {
        predictedTime = Math.floor(predictedTime * 0.5);
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
        <div className="mt-3 h-dvh">
            <div className="flex-none">
                <CartPageHeader></CartPageHeader>
                <CartTotalSpend orderDetail={{
                    merchantName: merchantData?.name,
                    totalSpend: totalSpend,
                }} />
            </div>
            <div className="flex-1 overflow-auto">
                <CartItemCardList
                    cartData={cartData}
                    dishesMap={dishesMap}
                />
            </div>
            <div className="flex-none">
                <CartOrderSection orderDetail={{
                    totalSpend: totalSpend,
                    estimateTime: (predictedTime - (totalQuantity > 2 ? 30 : 0)),
                }} />
            </div>
        </div>
    );
}

export default Cart;

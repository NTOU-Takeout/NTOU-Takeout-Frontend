import { createContext, useContext, useEffect, useState } from "react";
import { useCartQuery } from "../hooks/cart/useCartQuery";
import { useMerchantDataQuery } from "../hooks/merchant/useMerchantDataQuery";
import { useCategoryListQuery } from "../hooks/menu/useCategoryListQuery";
import { useUserInfoQuery } from "../hooks/user/useUserInfoQuery.jsx";
import PropTypes from "prop-types";
import userInfoStore from "../stores/user/userInfoStore.js";

const SystemContext = createContext();
// eslint-disable-next-line react-refresh/only-export-components
export const useSystemContext = () => useContext(SystemContext);

export const SystemContextProvider = ({ children }) => {
    console.log("SystemContextProvider mounted");
    const { userInfo, isUserInfoLoading, isUserInfoError } = useUserInfoQuery();
    console.debug("userInfo : ", userInfo);
    const setUser = userInfoStore((state) => state.setUser);
    useEffect(() => {
        if (userInfo) {
            setUser(userInfo);
        }
    }, [userInfo, setUser]);
    const {
        cartData,
        isLoading: isCartLoading,
        isError: isCartError,
        refetchCart,
    } = useCartQuery(isUserInfoError === false);

    const { merchantData, isMerchantLoading, refetchMerchantData } =
        useMerchantDataQuery(
            cartData?.storeId ?? null,
            isUserInfoError === false,
        );

    const menuCategoryList = useCategoryListQuery(
        merchantData?.menuId ?? null,
        isUserInfoError === false,
    );

    // // Calculate total spend
    const [totalSpend, setTotalSpend] = useState(0);
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        if (cartData?.orderedDishes) {
            let tmpQuantity = 0;
            const totalSpend = cartData.orderedDishes.reduce((sum, dish) => {
                tmpQuantity += dish.quantity;
                return sum + dish.price * dish.quantity;
            }, 0);

            setTotalQuantity(tmpQuantity);

            const totalExtraCost = cartData.orderedDishes.reduce(
                (sum, dish) => {
                    const costs = dish.chosenAttributes.reduce(
                        (acc, attr) => acc + attr.extraCost,
                        0,
                    );
                    return sum + costs * dish.quantity;
                },
                0,
            );

            setTotalSpend(totalSpend + totalExtraCost);
        }
    }, [cartData?.orderedDishes]);
    const cartCount = cartData?.orderedDishes?.length;
    // console.debug("cartCount:", cartCount);
    // console.debug("cartError:", cartError);
    // console.debug('cartData:', cartData);
    // console.debug('merchantData:', merchantData);
    // console.debug('totalSpend:', totalSpend);
    // console.debug('totalQuantity:', totalQuantity);
    return (
        <SystemContext.Provider
            value={{
                userInfo,
                isUserInfoLoading,
                cartData,
                cartCount,
                isCartLoading,
                isCartError,
                merchantData,
                menuCategoryList,
                isMerchantLoading,
                totalSpend,
                totalQuantity,
                refetchCart,
                refetchMerchantData,
            }}
        >
            {children}
        </SystemContext.Provider>
    );
};
SystemContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

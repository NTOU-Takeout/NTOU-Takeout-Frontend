
import { createContext, useContext, useEffect, useState } from 'react';
import { useCartQuery } from '../hooks/cart/useCartQuery';
import { useMerchantDataQuery } from '../hooks/merchant/useMerchantDataQuery';
import { useCategoryListQuery } from '../hooks/menu/useCategoryListQuery';
import PropTypes from 'prop-types';

const SystemContext = createContext();
export const useSystemContext = () => useContext(SystemContext);

export const SystemContextProvider = ({ children }) => {
    console.log("SystemContextProvider mounted");
    const {
        cartData,
        isLoading: isCartLoading,
        isError: isCartError,
        refetchCart,
    } = useCartQuery();

    const {
        merchantData,
        isMerchantLoading,
        refetchMerchantData
    } = useMerchantDataQuery(cartData?.storeId ?? null);

    const menuCategoryList = useCategoryListQuery(merchantData?.menuId ?? null);

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

            const totalExtraCost = cartData.orderedDishes.reduce((sum, dish) => {
                const costs = dish.chosenAttributes.reduce(
                    (acc, attr) => acc + attr.extraCost,
                    0
                );
                return sum + costs * dish.quantity;
            }, 0);

            setTotalSpend(totalSpend + totalExtraCost);
        }
    }, [cartData?.orderedDishes]);
    const cartCount = cartData?.orderedDishes.length;
    // console.debug("cartCount:", cartCount);
    // console.debug("cartError:", cartError);
    // console.debug('cartData:', cartData);
    // console.debug('merchantData:', merchantData);
    // console.debug('totalSpend:', totalSpend);
    // console.debug('totalQuantity:', totalQuantity);
    return (
        <SystemContext.Provider
            value={{
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





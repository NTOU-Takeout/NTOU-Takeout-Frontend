import CartOrderSection from "../components/cartPage/CartOrderSection";
import CartPageHeader from "../components/cartPage/CartPageHeader";
import CartTotalSpend from "../components/cartPage/CartTotalSpend";
import CartItemCardList from "../components/cartPage/CartItemCardList";

function Cart() {
    const order = {
        merchantName: "海洋大學店",
        totalSpend: 110,
        estimateTime: 20,
    };
    return (
        <div className="mt-3">
            <CartPageHeader></CartPageHeader>
            <CartTotalSpend orderDetail={{
                merchantName: order.merchantName,
                totalSpend: order.totalSpend
            }} />
            <CartItemCardList></CartItemCardList>
            <CartOrderSection orderDetail={{
                totalSpend: order.totalSpend,
                estimateTime: order.estimateTime
            }} />
        </div>
    );
}

export default Cart;

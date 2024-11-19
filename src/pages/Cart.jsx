import CartOrderSection from "../components/cartPage/cartOrderSection";
import CartPageHeader from "../components/cartPage/CartPageHeader";
import CartTotalSpend from "../components/cartPage/CartTotalSpend";
function Cart() {
    const order = {
        merchantName: "海洋大學店",
        totalSpend: 110,
        estimateTime: 20,
    };
    return (
        <div className="mt-3">
            <CartPageHeader></CartPageHeader>
            <CartTotalSpend orderInfo={order}></CartTotalSpend>
            <CartOrderSection orderDetail={order} />
        </div>
    );
}

export default Cart;

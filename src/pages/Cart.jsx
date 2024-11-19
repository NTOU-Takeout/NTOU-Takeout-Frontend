import CartOrderSection from "../components/cartPage/cartOrderSection";
import CartPageHeader from "../components/cartPage/CartPageHeader";
import CartTotalSpend from "../components/cartPage/CartTotalSpend";
function Cart() {
    const order = {
        totalSpend: 110,
        estimateTime: 20,
    };
    const orderIInfo = {
        totalSpend: 1100,
        merchantName: "海洋大學店",
    };
    return (
        <div className="mt-3">
            <CartPageHeader></CartPageHeader>
            <CartOrderSection orderDetail={order} />
            {/*<CartTotalSpend orderInfo={orderIInfo}></CartTotalSpend>*/}
            {/* <CartOrderSection orderDetail={order} /> */}
        </div>
    );
}

export default Cart;

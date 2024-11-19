import CartOrderSection from "../components/cartPage/cartOrderSection";
import CartPageHeader from "../components/cartPage/CartPageHeader";

function Cart() {
    const order = {
        totalSpend: 110,
        estimateTime: 20,
    };
    return (
        <div className="mt-3">
            <CartPageHeader></CartPageHeader>
            <CartOrderSection orderDetail={order} />
        </div>
    );
}

export default Cart;

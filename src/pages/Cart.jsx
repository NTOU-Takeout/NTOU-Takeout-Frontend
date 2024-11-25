import CartOrderSection from "../components/cartPage/cartOrderSection";
import CartPageHeader from "../components/cartPage/CartPageHeader";
import CartRemark from "../components/cartPage/CartRemark";

function Cart() {
    const order = {
        totalSpend: 110,
        estimateTime: 20,
    };

    return (
        <div className="mt-3">
            <CartPageHeader></CartPageHeader>
            <CartRemark></CartRemark>
            {/*<CartOrderSection orderDetail={order} />*/}
        </div>
    );
}

export default Cart;

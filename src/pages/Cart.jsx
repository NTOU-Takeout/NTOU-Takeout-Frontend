import CartOrderSection from "../components/cartPage/cartOrderSection";

function Cart() {
    const order = {
        totalSpend: 110,
        estimateTime: 20,
    };
    return (
        <div className="mt-3">
            <CartOrderSection
                orderDetail={order}
            />
        </div>
    );
}

export default Cart;
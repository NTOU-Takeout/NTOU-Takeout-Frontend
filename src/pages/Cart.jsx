import CartPageHeader from "../components/cartPage/CartPageHeader";

function Cart() {
    const dish = {
        name: "好好吃水餃",
        price: 114.514,
        picture: "https://i.imgur.com/UxAj87v.jpeg", // Replace this with the actual image path
        dishAttributes: ["豬肉", "韭仁"],
    };
    return (
        <div>
            <CartPageHeader></CartPageHeader>
        </div>
    );
}

export default Cart;

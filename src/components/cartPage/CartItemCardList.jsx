import useDishStore from "../../stores/dishDetailStore";
import CartItemCard from "./CartItemCard";

const CartItemCardList = () => {
    const addDish = useDishStore((state) => state.addDish);

    const dishes = [
        {
            id: "1",
            name: "好好吃水餃",
            price: 114.514,
            picture: "https://i.imgur.com/UxAj87v.jpeg",
            dishAttributes: ["豬肉", "韭仁"],
        },
        {
            id: "2",
            name: "好好吃水餃",
            price: 114.514,
            picture: "https://i.imgur.com/UxAj87v.jpeg",
            dishAttributes: ["豬肉", "韭仁"],
        },
        {
            id: "3",
            name: "好好吃水餃",
            price: 114.514,
            picture: "https://i.imgur.com/UxAj87v.jpeg",
            dishAttributes: ["豬肉", "韭仁"],
        },
    ];

    // 初始化每個菜品的狀態
    dishes.forEach((dish) => addDish(dish.id, { quantity: 1 }));

    return (
        <div>
            {dishes.map((dish) => (
                <CartItemCard key={dish.id} dishId={dish.id} dishItem={dish} />
            ))}
        </div>
    );
};

export default CartItemCardList;

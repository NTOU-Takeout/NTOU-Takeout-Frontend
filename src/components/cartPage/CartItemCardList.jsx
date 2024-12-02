import useDishStore from "../../stores/dishDetailStore";
import CartItemCard from "./CartItemCard";

const CartItemCardList = () => {
    const dishes = useDishStore((state) => state.dishes); // 訂閱 dishes 狀態

    // 檢查 dishes 是否為空物件
    if (Object.keys(dishes).length === 0) {
        return <p>目前購物車是空的。</p>;
    }

    return (
        <div>
            {Object.entries(dishes).map(([id, dish]) => (
                <CartItemCard key={id} dishId={id} dishItem={dish} />
            ))}
        </div>
    );
};

export default CartItemCardList;

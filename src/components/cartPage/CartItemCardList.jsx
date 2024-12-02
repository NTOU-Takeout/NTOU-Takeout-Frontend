import PropTypes from "prop-types";
import useDishStore from "../../stores/dishDetailStore";
import useAllDishStore from "../../stores/allDishesStore";
import CartItemCard from "./CartItemCard";

const CartItemCardList = ({ setTotalSpend }) => {
    const dishes = useDishStore((state) => state.dishes);
    const dishData = useAllDishStore((state) => state.dishes);

    if (Object.keys(dishes).length === 0) {
        return <p>目前購物車是空的。</p>;
    }

    // calculate total spend
    const totalSpend = Object.entries(dishes).reduce((sum, [id, dish]) => {
        const basePrice = dishData[id]?.price || 0;
        const extraCost = dish.extraCost || 0;
        const quantity = dish.quantity || 1;
        return sum + (basePrice + extraCost) * quantity;
    }, 0);
    setTotalSpend(totalSpend);

    return (
        <div>
            {Object.entries(dishes).map(([id, dish]) => (
                <CartItemCard
                    key={id}
                    dishId={id}
                    dishItem={{
                        name: dishData[id].name,
                        price: dishData[id].price,
                        picture: dishData[id].picture,
                        dishAttributes: dish.selectedOptions,
                        ...dish,
                    }}
                />
            ))}
        </div>
    );
};

CartItemCardList.propTypes = {
    setTotalSpend: PropTypes.func.isRequired, // 確保 setTotalSpend 是一個函數
};

export default CartItemCardList;

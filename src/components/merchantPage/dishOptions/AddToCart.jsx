import useDishStore from "../../../stores/dishDetailStore";

const AddToCart = () => {
    const dishes = useDishStore((state) => state.dishes);

    const handleAddToCart = async () => {
        console.log("Current Store Data:", dishes);
    };

    return (
        <div className="flex items-center justify-center">
            <button
                className="shadow-md bg-orange-500 text-white text-md px-6 py-2 rounded-full border border-orange-700 font-notoTC"
                onClick={handleAddToCart}
            >
                加入
            </button>
        </div>
    );
};

export default AddToCart;

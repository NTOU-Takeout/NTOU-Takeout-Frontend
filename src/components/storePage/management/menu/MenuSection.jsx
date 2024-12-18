import { lazy, Suspense, useState } from "react";
import PropTypes from "prop-types";
import { faEdit } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useEditDishStore from "../../../../stores/dishEditStore";

const CartItemCardSkeleton = lazy(
    () => import("../../../../skeleton/menu/CartItemCardSkeleton"),
);

const MenuItemCard = lazy(() => import("./MenuItemCard"));

function MenuSection({
    sectionRefs,
    categoryData,
    selectedDish,
    setSelectedDish,
}) {
    const [localCategoryData, setLocalCategoryData] = useState(categoryData);

    const setDish = useEditDishStore((state) => state.setDish);
    const handleMenuItemClick = (item) => {
        setDish(item);
        setSelectedDish(item);
    };
    const handleCardDelete = (categoryIndex, dishIndex) => {
        setLocalCategoryData((prevCategories) =>
            prevCategories.map((category, index) => {
                if (index === categoryIndex) {
                    return {
                        ...category,
                        dishes: category.dishes.filter(
                            (_, i) => i !== dishIndex,
                        ),
                    };
                }
                return category;
            }),
        );
    };
    const handleCardUp = (categoryIndex, dishIndex) => {
        if (dishIndex === 0) return;
        setLocalCategoryData((prevCategories) =>
            prevCategories.map((category, index) => {
                if (index === categoryIndex) {
                    const newDishes = [...category.dishes];
                    [newDishes[dishIndex], newDishes[dishIndex - 1]] = [
                        newDishes[dishIndex - 1],
                        newDishes[dishIndex],
                    ];
                    return { ...category, dishes: newDishes };
                }
                return category;
            }),
        );
    };
    const handleCardDown = (categoryIndex, dishIndex) => {
        if (dishIndex === localCategoryData[categoryIndex].dishes.length - 1)
            return;
        setLocalCategoryData((prevCategories) =>
            prevCategories.map((category, index) => {
                if (index === categoryIndex) {
                    const newDishes = [...category.dishes];
                    [newDishes[dishIndex], newDishes[dishIndex + 1]] = [
                        newDishes[dishIndex + 1],
                        newDishes[dishIndex],
                    ];
                    return { ...category, dishes: newDishes };
                }
                return category;
            }),
        );
    };
    console.log(selectedDish);

    return (
        <div className="font-notoTC relative min-h-screen flex flex-col justify-center container mx-auto p-4">
            {localCategoryData.map((category, categoryIndex) => (
                <div
                    key={category?.categoryName || `section-${categoryIndex}`}
                    ref={(el) => (sectionRefs.current[categoryIndex] = el)}
                    className="w-full mb-8"
                >
                    <p className="text-2xl font-notoTC mt-3 mb-5 font-bold">
                        {category.categoryName}
                        <FontAwesomeIcon className="ml-2" icon={faEdit} />
                    </p>
                    <div className="grid gap-4">
                        {category.dishes.map((food, dishIndex) => (
                            <Suspense
                                fallback={<CartItemCardSkeleton />}
                                key={dishIndex}
                            >
                                <MenuItemCard
                                    food={food}
                                    onDown={() =>
                                        handleCardDown(categoryIndex, dishIndex)
                                    }
                                    onUp={() =>
                                        handleCardUp(categoryIndex, dishIndex)
                                    }
                                    onDelete={() =>
                                        handleCardDelete(
                                            categoryIndex,
                                            dishIndex,
                                        )
                                    }
                                    onClick={handleMenuItemClick}
                                />
                            </Suspense>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

MenuSection.propTypes = {
    sectionRefs: PropTypes.object.isRequired,
    categoryData: PropTypes.array.isRequired,
    selectedDish: PropTypes.object,
    setSelectedDish: PropTypes.func.isRequired,
};

export default MenuSection;

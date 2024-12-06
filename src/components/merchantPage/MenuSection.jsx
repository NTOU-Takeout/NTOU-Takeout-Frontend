import { useState } from "react";
import MenuItemCard from "./MenuItemCard";
import MenuDishDetail from "./MenuDishDetail";
import PropTypes from "prop-types";
function MenuSection({ sectionRefs, categoryData }) {
    const [selectedDish, setSelectedDish] = useState(null);
    console.log(categoryData);
    const handleMenuItemClick = (item) => {
        // if the dish has no attributes, do not show the detail
        if (item.dishAttributes.length === 0) {
            return;
        }
        setSelectedDish(item);
    };
    return (
        <div className="font-notoTC -top-12 relative min-h-screen flex flex-col items-center justify-center container mx-auto p-4">
            {categoryData.map((category, index) => (
                <div
                    key={category?.categoryName || `section-${index}`}
                    ref={(el) => (sectionRefs.current[index] = el)}
                    className="w-full mb-8"
                >
                    {
                        <>
                            <p className="text-2xl font-notoTC my-2 font-bold">
                                {category.categoryName}
                            </p>
                            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {category.dishes.map((food, index) => (
                                    <MenuItemCard
                                        key={index}
                                        food={food}
                                        onClick={handleMenuItemClick}
                                    />
                                ))}
                            </div>
                        </>
                    }
                </div>
            ))}

            {selectedDish && (
                <MenuDishDetail
                    dishData={selectedDish}
                    onClose={() => setSelectedDish(null)}
                />
            )}
        </div>
    );
}

MenuSection.propTypes = {
    sectionRefs: PropTypes.object.isRequired,
    categoryData: PropTypes.array.isRequired,
};
export default MenuSection;

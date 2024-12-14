import CartItemCardSkeleton from "../../skeleton/menu/CartItemCardSkeleton";
import { lazy, Suspense } from "react";
import MenuDishDetail from "./MenuDishDetail";
import PropTypes from "prop-types";
const MenuItemCard = lazy(() => import("./MenuItemCard"));
function MenuSection({ sectionRefs, categoryData, selectedDish, setSelectedDish }) {

    const handleMenuItemClick = (item) => {
        setSelectedDish(item);
    };

    return (
        <div className="font-notoTC -top-12 relative min-h-screen flex flex-col items-center justify-center container mx-auto p-4 ">
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
                                    <Suspense
                                        fallback={<CartItemCardSkeleton />}
                                        key={index}
                                    >
                                        <MenuItemCard
                                            food={food}
                                            onClick={handleMenuItemClick}
                                        />
                                    </Suspense>
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
    selectedDish: PropTypes.object,
    setSelectedDish: PropTypes.func.isRequired,
};
export default MenuSection;

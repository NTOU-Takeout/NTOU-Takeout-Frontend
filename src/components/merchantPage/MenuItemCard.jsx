import MenuItemButton from "./MenuItemButton";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { useEffect, useRef } from "react";
import { useSystemContext } from "../../context/SystemContext";
import { useParams } from "react-router-dom";

const MenuItemCard = ({ food, onClick }) => {
    const { merchantId } = useParams();
    const { id, name, picture, price, description } = food;
    // console.debug("MenuItemCard food:", food);
    const { cartData } = useSystemContext();
    const authToken = Cookies.get("authToken");
    const displayTextRef = useRef("+");
    useEffect(() => {
        if (
            cartData &&
            cartData.storeId &&
            cartData.storeId === merchantId &&
            cartData.orderedDishes &&
            cartData.orderedDishes.length > 0
        ) {

            const totalQuantity = cartData.orderedDishes
                .filter(d => d.dishId == id)
                .reduce((sum, d) => sum + d.quantity, 0);
            if (totalQuantity > 0) displayTextRef.current = totalQuantity;

        }
    }, [cartData, id, merchantId]);

    const handleButtonClick = (e) => {
        e.stopPropagation();
        console.log("Add to cart clicked");
    };
    return (
        <div
            className="w-full cursor-pointer bg-white rounded-lg shadow-lg overflow-hidden"
            onClick={() => onClick(food)}
        >

            <div className=" h-[17rem] flex max-w-xl bg-white text-white">
                {/* Image */}
                <div className="w-64 overflow-hidden aspect-[5/3]">
                    {" "}
                    <img
                        src={picture}
                        alt="Dish Image"
                        className="object-cover w-full h-full"
                    />
                </div>

                {/* Content */}
                <div className="relative w-2/3 p-4">
                    {/* Title */}
                    <h2 className="text-2xl font-bold mb-2 text-black">
                        {name}
                    </h2>

                    {/* Price */}
                    <p className="text-xl text-gray-800">${price}</p>

                    {/* Description */}
                    <p className="text-sm text-gray-600 mt-2 line-clamp-3 text-ellipsis">{description}</p>

                    {/* Add button */}
                    {authToken && (
                        <div className="flex justify-end mt-4 absolute bottom-[15px] right-[15px]">
                            <MenuItemButton
                                displayText={displayTextRef.current}
                                onClick={handleButtonClick}
                            />
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
};

MenuItemCard.propTypes = {
    onClick: PropTypes.func.isRequired,
    food: PropTypes.object.isRequired,
};

export default MenuItemCard;

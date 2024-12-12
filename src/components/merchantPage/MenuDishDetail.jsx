import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import OptionCard from "./dishOptions/OptionCard";
import CartOption from "./dishOptions/CartOption";
import Cookies from "js-cookie";

const DishDetail = ({ dishData, onClose }) => {
    const {
        id: dishId,
        name,
        price,
        picture: imageUrl,
        description,
        dishAttributes: options,
    } = dishData;
    console.debug("DishDetail dishData:", dishId, name, price, imageUrl, description, options);
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [isShowError, setIsShowError] = useState(true);
    useEffect(() => {
        setIsVisible(true);
        document.body.style.overflow = "hidden"; // forbid background scroll

        return () => {
            document.body.style.overflow = ""; // restore background scroll
        };
    }, []);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false); // hide the modal
            document.body.style.overflow = ""; // restore background scroll
            if (onClose) onClose();
        }, 500);
    };

    const authToken = Cookies.get("authToken");

    return (
        <div
            className={`font-notoTC fixed z-10 top-0 left-0 right-0`}
        >
            <div
                className={`bg-white shadow-md overflow-hidden max-h-[100vh] flex flex-col transition-transform duration-500 ${isExiting ? "translate-y-full none" : "translate-y-0"}
                                                                                                                            ${isVisible ? "translate-y-0" : "translate-y-full none"}`}
            >
                <div className="flex-1 overflow-y-auto">
                    {/* Top image */}
                    <div className="relative h-48 overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src={imageUrl}
                            alt="Dish Image"
                        />
                        <button
                            onClick={handleClose}
                            className="absolute top-4 right-4 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md"
                        >
                            <FontAwesomeIcon icon={faX} className="text-sm" />
                        </button>
                    </div>

                    {/* Dish info */}
                    <div className="p-4">
                        <h2 className="text-xl font-bold">{name}</h2>
                        <p className="text-lg text-gray-700">${price}</p>
                        <p className="text-sm text-gray-500">{description}</p>

                        {/* Customize options */}
                        {options.map((detail, index) => (
                            <OptionCard
                                key={index}
                                title={detail.name}
                                description={detail.description}
                                options={detail.attributeOptions}
                                type={detail.type}
                                dishId={dishId}
                                isRequired={detail.isRequired}
                                isShowError={isShowError}
                                setIsShowError={(e) => setIsShowError(e)}
                            />
                        ))}
                    </div>
                    <div className="py-5"></div>
                </div>
                {/* Add to cart button */}
                {authToken && (
                    <CartOption dishId={dishId} />
                )}
            </div>
        </div>
    );
};

DishDetail.propTypes = {
    dishData: PropTypes.object.isRequired,
    onClose: PropTypes.func,
    dishId: PropTypes.string
};

export default DishDetail;

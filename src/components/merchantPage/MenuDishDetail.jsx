import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import useDishDetailStore from "../../stores/dishDetailStore";
import CartOption from "./dishOptions/CartOption";
import OptionCard from "./dishOptions/OptionCard";
import PropTypes from "prop-types";
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

    const { merchantId } = useParams();
    const [isVisible, setIsVisible] = useState(false);
    const [isExiting, setIsExiting] = useState(false);
    const [isShowError, setIsShowError] = useState(true);
    const setDishDetail = useDishDetailStore((state) => state.setDishDetail);
    const setAllDishAttributes = useDishDetailStore((state) => state.setAllDishAttributes);
    const authToken = Cookies.get("authToken");
    const optionCardRefs = useRef([]);

    useEffect(() => {
        setAllDishAttributes(dishId, options);
        setDishDetail(dishId, {
            storeId: merchantId,
            dishId: dishId,
            quantity: 1,
            note: "",
            chosenAttributes: []
        });

        setIsVisible(true);
        document.body.style.overflow = "hidden"; // forbid background scroll

        return () => {
            document.body.style.overflow = ""; // restore background scroll
        };
    }, [setDishDetail, dishId, merchantId, options, setAllDishAttributes]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            setIsVisible(false); // hide the modal
            document.body.style.overflow = ""; // restore background scroll
            if (onClose) onClose();
        }, 500);
    };

    // handle scroll to the OptionCard that has required missing
    const handleRequiredMissing = (missingAttributeName) => {
        // find the index of the missing attribute
        const index = options.findIndex(opt => opt.name === missingAttributeName);
        if (index !== -1 && optionCardRefs.current[index]) {
            optionCardRefs.current[index].scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    // handle scroll to the next OptionCard for better user experience
    const handleSelectNext = (currentIndex) => {
        const nextIndex = currentIndex + 1;
        if (optionCardRefs.current[nextIndex]) {
            optionCardRefs.current[nextIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    return (
        <div
            className={`font-notoTC fixed z-10 top-0 left-0 right-0 `}
        >
            <div
                className={`bg-white shadow-md overflow-hidden max-h-[100vh] flex flex-col  transition-transform duration-500 ${isExiting ? "translate-y-full none" : "translate-y-0"}
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
                            <div key={index} ref={el => optionCardRefs.current[index] = el}>
                                <OptionCard
                                    title={detail.name}
                                    description={detail.description}
                                    options={detail.attributeOptions}
                                    type={detail.type}
                                    dishId={dishId}
                                    isRequired={detail.isRequired}
                                    isShowError={isShowError}
                                    setIsShowError={setIsShowError}
                                    onSelectNext={() => handleSelectNext(index)}
                                />
                            </div>
                        ))}
                    </div>
                    <div className="py-5"></div>
                </div>
                {/* Add to cart button */}
                {authToken && (
                    <CartOption
                        dishId={dishId}
                        dishAttributes={options}
                        onRequiredMissing={handleRequiredMissing}
                        onClose={handleClose}
                    />
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

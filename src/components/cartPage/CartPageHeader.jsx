import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

// Header Component
const CartPageHeader = () => {
    const navigate = useNavigate();
    const handleClose = () => {
        navigate(-1);
    };
    return (
        <header className="fixed z-30 top-0 left-0 w-full flex justify-between items-center bg-white shadow-md transition-shadow duration-300 ease-in-out p-2 font-notoTC">
            <div className="flex items-center text-xl ">
                <FontAwesomeIcon
                    icon={faTimes}
                    className="mr-2 cursor-pointer text-2xl"
                    onClick={handleClose}
                />
                <h1 className="font-noto font-bold text-2xl">購物車</h1>
            </div>
        </header>
    );
};

export default CartPageHeader;

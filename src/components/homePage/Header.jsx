import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import CartIcon from "./CartIcon";

// Header Component
const Header = ({
    title,
    leftIcon = faUser,
    rightIcon = faShoppingCart,
    onLeftClick = () => { },
    onRightClick = () => { },
}) => {
    return (
        <header className="fixed z-30  top-0 left-0 w-full flex justify-between items-center bg-white shadow-md transition-shadow duration-300 ease-in-out p-2 font-notoTC">
            <div className="text-xl cursor-pointer" onClick={onLeftClick}>
                <FontAwesomeIcon icon={leftIcon} />
            </div>
            <h1 className="font-noto font-bold text-2xl m-0">
                <a href="/">{title}</a>
            </h1>
            <div className="text-xl cursor-pointer " onClick={onRightClick}>
                <CartIcon />
            </div>
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string,
    leftIcon: PropTypes.object,
    rightIcon: PropTypes.object,
    onLeftClick: PropTypes.func,
    onRightClick: PropTypes.func,
};

export default Header;

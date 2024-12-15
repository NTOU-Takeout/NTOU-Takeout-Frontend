import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList } from "@fortawesome/free-solid-svg-icons";

const Header = ({
    title,
    leftIcon = faList,
    onLeftClick = () => { },
}) => {
    return (
        <header className="fixed z-30 top-0 left-0 w-full flex justify-center items-center bg-white  transition-shadow duration-300 ease-in-out p-2 font-notoTC shadow-md
        ">
            <div
                className="absolute left-4 text-xl cursor-pointer"
                onClick={onLeftClick}
            >
                <FontAwesomeIcon icon={leftIcon} />
            </div>
            <h1 className="font-noto font-bold text-2xl m-0 text-center">
                <a href="/merchantPage">{title}</a>
            </h1>
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string,
    leftIcon: PropTypes.object,
    onLeftClick: PropTypes.func,
};

export default Header;

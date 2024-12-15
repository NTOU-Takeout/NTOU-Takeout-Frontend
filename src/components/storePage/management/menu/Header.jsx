import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faPlus } from "@fortawesome/free-solid-svg-icons";

const Header = ({
    title = "菜單管理",
    leftIcon = faList,
    onLeftClick = () => { },
    onAddClick = () => { },
    onPreviewClick = () => { },
}) => {
    return (
        <header className="fixed z-30 top-0 left-0 w-full flex justify-between items-center bg-orange-400 text-white shadow-md p-3">
            <div className="text-xl  flex items-center">
                <div className=" cursor-pointer" onClick={onLeftClick}>
                    <FontAwesomeIcon icon={leftIcon} />
                </div>
                <span className="ml-2 text-lg font-bold">{title}</span>
            </div>
            <div className="flex items-center gap-2">
                <button
                    onClick={onAddClick}
                    className="bg-white text-black rounded-full p-2 flex items-center justify-center shadow-md"
                >
                    <FontAwesomeIcon icon={faPlus} />
                </button>
                <button
                    onClick={onPreviewClick}
                    className="bg-white  text-black rounded px-3 py-1 font-semibold shadow-md"
                >
                    預覽
                </button>
            </div>
        </header>
    );
};

Header.propTypes = {
    title: PropTypes.string,
    leftIcon: PropTypes.object,
    onLeftClick: PropTypes.func,
    onAddClick: PropTypes.func,
    onPreviewClick: PropTypes.func,
};

export default Header;

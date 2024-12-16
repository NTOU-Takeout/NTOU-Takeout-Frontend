import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import useSidebarStore from "../../stores/sidebarStore";
import PropTypes from "prop-types";

const SidebarButton = ({
    icon,
    text,
    textStyle,
    iconSize,
    iconColor,
    style,
    path,
    onClick,
}) => {
    const navigate = useNavigate();
    const setTitle = useSidebarStore((state) => state.setTitle);
    const closeSidebar = useSidebarStore((state) => state.closeSidebar);
    const handleClick = (e) => {
        e.stopPropagation();
        closeSidebar();
        setTitle(text);
        if (onClick) {
            onClick();
        } else {
            navigate(path);
        }
    };
    return (
        <button
            className={`flex items-center text-left  ${style}`}
            onClick={handleClick}
        >
            {icon && (
                <FontAwesomeIcon
                    icon={icon}
                    size={iconSize}
                    style={{ color: iconColor }}
                    className={`px-2 w-10`}
                />
            )}
            {text && (
                <span className={`font-notoTC font-bold  ${textStyle}`}>
                    {text}
                </span>
            )}
        </button>
    );
};

SidebarButton.propTypes = {
    icon: PropTypes.object,
    text: PropTypes.string,
    textStyle: PropTypes.string,
    iconSize: PropTypes.string,
    iconColor: PropTypes.string,
    style: PropTypes.string,
    path: PropTypes.string,
    onClick: PropTypes.func,
};

export default SidebarButton;

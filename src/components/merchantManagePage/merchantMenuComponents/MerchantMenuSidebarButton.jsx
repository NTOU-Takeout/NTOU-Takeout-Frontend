import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useThemeStore from "../../../stores/themeStore";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const MerchantMenuSidebarButton = ({
    icon,
    text,
    textStyle,
    iconSize,
    iconColor,
    onClick,
    style,
    path,
}) => {
    const navigate = useNavigate();
    const handleClick = (e) => {
        console.log({ text }, "!!!!");
        console.log(e);
        e.stopPropagation();
        if (onClick) {
            onClick();
        }
        console.log(path);
        navigate(path);

        console.log(useThemeStore.getState().themeMode);
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

MerchantMenuSidebarButton.propTypes = {
    icon: PropTypes.object,
    text: PropTypes.string,
    textStyle: PropTypes.string,
    iconSize: PropTypes.string,
    iconColor: PropTypes.string,
    onClick: PropTypes.func,
    style: PropTypes.string,
    path: PropTypes.string,
};

export default MerchantMenuSidebarButton;

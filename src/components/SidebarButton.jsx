import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useThemeStore from "../stores/themeStore";

const SidebarButton = ({
    icon,
    text,
    textStyle,
    iconSize,
    iconColor,
    onClick,
    style,
}) => {
    const handleClick = (e) => {
        console.log({ text });
        e.stopPropagation();
        if (onClick) {
            onClick();
        }
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

export default SidebarButton;

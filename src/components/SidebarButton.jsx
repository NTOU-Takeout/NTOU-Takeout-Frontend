import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useThemeStore from '../stores/themeStore';

const SidebarButton = ({icon, text,textStyle, iconSize, iconColor, onClick, style }) => {
    const handleClick = (e) => {
        console.log({text});
        e.stopPropagation();
        onClick();
        console.log(useThemeStore.getState().themeMode);
      };
  return (
    <button
      className={`flex items-center text-left transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:duration-300 ${style}`}
      onClick={handleClick}
    >
    {icon && (
        <FontAwesomeIcon icon={icon} size={iconSize} style={{color:iconColor}} className={`px-2 w-10`} />
    )}
    {text && (
        <span className={`font-notoTC font-bold  ${textStyle}`}>{text}</span>
    )}
    
    </button>
  );
};

export default SidebarButton;

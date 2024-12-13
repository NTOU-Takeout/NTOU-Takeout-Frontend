import PropTypes from 'prop-types';

const MenuItemButton = ({ displayText, onClick }) => {
    const isPlus = displayText === '+';
    const btnClasses = isPlus
        ? 'bg-orange-500 text-white'
        : ' bg-slate-400 text-white ';
    const textClasses = isPlus ? 'text-3xl' : 'text-xl';
    return (
        <button
            className={`${btnClasses} rounded-full w-10 h-10 flex items-center justify-center`}
            onClick={onClick}
        >
            <span className={`${textClasses} text-center font-bold mb-1`}>{displayText}</span>
        </button>
    );
};

MenuItemButton.propTypes = {
    displayText: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default MenuItemButton;

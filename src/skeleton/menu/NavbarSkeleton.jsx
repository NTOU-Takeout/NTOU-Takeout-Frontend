import PropTypes from "prop-types";
const NavbarSkeleton = ({ isNavbarFixed }) => {
    // Create an array of 5 items to simulate nav items
    const mockItems = Array(5).fill(null);

    return (
        <nav
            className={`font-notoTC bg-white/30 backdrop-blur-sm p-3 flex transition-all w-full duration-300 ${isNavbarFixed
                    ? "fixed top-0 left-0 w-full z-10 shadow-lg"
                    : "relative"
                }`}
        >
            <ul
                className={`pb-2 mt-2 flex w-full space-x-4 overflow-x-auto whitespace-nowrap scrollbar-transparent ${isNavbarFixed ? "" : "relative -top-12"
                    }`}
            >
                {mockItems.map((_, index) => (
                    <li
                        key={index}
                        className="animate-pulse"
                    >
                        <div className={`h-6 bg-gray-200/50 rounded ${index === 0
                                ? "w-24 bg-gray-300/50"
                                : "w-16"
                            }`} />
                    </li>
                ))}
            </ul>
        </nav>
    );
};

NavbarSkeleton.propTypes = {
    isNavbarFixed: PropTypes.bool.isRequired,
};

export default NavbarSkeleton;
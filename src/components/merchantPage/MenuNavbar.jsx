import React from 'react';
import PropTypes from 'prop-types';
import useNavStore from '../../stores/merchantMenuNav';

const Navbar = ({ onNavClick, isNavbarFixed }) => {
    const { navbarItems, nowPage, setNowPage } = useNavStore();

    const handleNavClick = (index) => {
        setNowPage(index);  // 更新當前頁面狀態
        if (onNavClick) {
            onNavClick(index);  // 調用傳入的滾動函數
        }
    };

    return (
        <nav
            className={`bg-white p-4 flex transition-all duration-300 ${
                isNavbarFixed ? 'fixed top-0 left-0 w-full z-50 shadow-lg' : 'relative'
            }`}
        >
            <ul className={`mt-2 flex space-x-4 text-gray-400 text-lg font-notoTC  ${ isNavbarFixed ? '' : 'relative -top-12'}`}>
            {navbarItems.map((item, index) => (
              <li
                key={index}
                className={`${
                  index === nowPage ? 'text-black font-bold border-b-2 border-black hover:border-black' : ''
                } hover:text-gray-800 cursor-pointer`}
                onClick={() => handleNavClick(index)}
              >
                {item}
              </li>
            ))}
          </ul>
        </nav>
    );
};

Navbar.propTypes = {
    onNavClick: PropTypes.func.isRequired,  // 滾動函數
    isNavbarFixed: PropTypes.bool.isRequired,  // 控制是否固定的狀態
};

export default Navbar;

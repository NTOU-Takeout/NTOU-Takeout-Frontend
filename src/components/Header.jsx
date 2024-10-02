import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import useLoadingStore from '../stores/loadingStore';
import CartIcon from './headerItem/CartIcon';

// Header Component
<<<<<<< HEAD
const Header = ({ title, leftIcon, rightIcon, onLeftClick, onRightClick }) => {
=======
const Header = ({
  title = 'NTOU Takeout', // 預設標題
  leftIcon = faUser, // 預設左側圖標
  rightIcon = faShoppingCart, // 預設右側圖標
  onLeftClick = () => {}, // 預設左側按鈕事件
  onRightClick = () => {}, // 預設右側按鈕事件
}) => {
>>>>>>> 1c7cc47 (Fix Header component bugs)
  
  // get state from store
  const { isLoading, setIsLoading } = useLoadingStore();

  // loading screen test, test 2000ms loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
<<<<<<< HEAD
    }, 2000);
=======
    }, 500);
>>>>>>> 1c7cc47 (Fix Header component bugs)

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <p className="text-[1.5rem] text-gray-800">Loading...</p>
      </div>
    );
  }

  return (
    <header className="fixed top-0 left-0 w-full width-100 flex justify-between items-center bg-white shadow-md transition-shadow duration-300 ease-in-out p-2">
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

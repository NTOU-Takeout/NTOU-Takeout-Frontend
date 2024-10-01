import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import useLoadingStore from '../stores/useLoadingStore'; // 導入狀態 store
import CartIcon from './headerItem/CartIcon';
import '../styles/Header.css';

// Header Component
const Header = ({ title, leftIcon, rightIcon, onLeftClick, onRightClick }) => {
  const { isLoading, setIsLoading } = useLoadingStore(); // get state from store

  // loading screen test
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); // update loading state to false when loading completed
    }, 2000); // Test 2000ms loading time

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <header className="header">
      <div className="icon" onClick={onLeftClick}>
        <FontAwesomeIcon icon={leftIcon} />
      </div>
      <h1 className="title">
        <a href="/"> {title} </a>
      </h1>
      <div className="icon" onClick={onRightClick}>
        <CartIcon></CartIcon>
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

// Default Props
Header.defaultProps = {
  title: 'NTOU Takeout',
  leftIcon: faUser,
  rightIcon: faShoppingCart,
  onLeftClick: () => {},
  onRightClick: () => {},
};

export default Header;

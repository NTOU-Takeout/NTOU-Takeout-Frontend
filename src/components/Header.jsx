import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import useLoadingStore from '../stores/loadingStore';
import CartIcon from './headerItem/CartIcon';
import '../styles/Header.css';

// Header Component
const Header = ({ title, leftIcon, rightIcon, onLeftClick, onRightClick }) => {
  
  // get state from store
  const { isLoading, setIsLoading } = useLoadingStore();

  // loading screen test, test 2000ms loading time
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

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

import React from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import CartIcon from './Header-Item/CartIcon';
import './Header.css';

// Header Component
const Header = ({ title, leftIcon, rightIcon, onLeftClick, onRightClick }) => {
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
// Can change props if you want
Header.defaultProps = {
  title: 'NTOU Takeout',
  leftIcon: faUser,
  rightIcon: faShoppingCart,
  onLeftClick: () => {},
  onRightClick: () => {},
};

export default Header;

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../../styles/CartIcon.css';

const CartIcon = () => {
  const [cartCount, setCartCount] = useState(0);
  

  const fetchCartCount = async () => {
    try {
      const response = await fetch('/api/cart'); // Change to our API
      const data = await response.json();
      setCartCount(data.count); // assume there's a count in API data
    } catch (error) {
      console.error('Failed to fetch cart count:', error);
    }
  };

  useEffect(() => {
    fetchCartCount(); // fetch while loading
  }, []);

  return (
    <div className="cart-icon-container">
      <FontAwesomeIcon icon={faShoppingCart} />
      {cartCount > 0 && (
        <span className="cart-count">
          {cartCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;

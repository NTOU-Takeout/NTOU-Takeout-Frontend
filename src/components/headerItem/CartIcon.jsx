import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../../styles/CartIcon.css';
import useCartStore from '../../stores/cartStore'; // Import the store

const CartIcon = () => {
  const { cartCount, fetchCartCount } = useCartStore(); // Zustand store hook

  useEffect(() => {
    fetchCartCount(); // Fetch cart count on component mount
  }, [fetchCartCount]);

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

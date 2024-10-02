import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
<<<<<<< HEAD
import '../../styles/CartIcon.css';
=======
>>>>>>> 1c7cc47 (Fix Header component bugs)
import useCartStore from '../../stores/cartStore';

const CartIcon = () => {
  // Zustand store hook
  const { cartCount, fetchCartCount } = useCartStore();

  // Fetch cart count on component mount
  useEffect(() => {
    fetchCartCount();
  }, [fetchCartCount]);

  return (
    <div className="cart-icon-container inline-block relative">
      <FontAwesomeIcon icon={faShoppingCart} />
      {cartCount > 0 && (
        <span className="cart-count absolute bottom-0 left-0 bg-red-500 text-white rounded-full px-2 py-0.5 text-xs scale-50">
          {cartCount}
        </span>
      )}
    </div>
  );
};

export default CartIcon;
